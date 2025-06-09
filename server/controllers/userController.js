import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import axios from "axios";


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Login user route
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user._id); // or generateToken

//       res.status(200).json({
//         success: true,
//         message: "Login successful",
//         name: user.name,       // ✅ Fixed
//         email: user.email,     // ✅ Fixed
//         phone: user.phone,
//         token                  // ✅ Send token
//       });

//     } else {
//       res.json({ success: false, message: "Invalid password" });
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    const token = createToken(user._id);

    user.isActive = true;
    user.lastLogin = new Date();
    user.lastLogout = null; // clear logout timestamp
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      name: user.name,
      email: user.email,
      phone: user.phone,
      token,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const normalizedEmail = email.toLowerCase();

    // check if email or phone already exists
    const exists = await userModel.findOne({
      $or: [{ email: normalizedEmail }, { phone }],
    });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validate phone number
    if (!validator.isMobilePhone(phone, "any")) {
      return res.json({ success: false, message: "Invalid phone number" });
    }

    // validate email format and password strength
    if (!validator.isEmail(normalizedEmail)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      isActive: true,            // ✅ user is active on registration
      lastLogin: new Date(),     // ✅ set login time
      lastLogout: null           // ✅ not yet logged out
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully",
      name: user.name,
      email: user.email,
      phone: user.phone,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error: " + error.message });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    const user = await userModel.findOne({ phone });
    if (!user) {
      return res.json({ success: false, message: "Phone number not registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error updating password: " + error.message });
  }
};



//Route for admin login
// const adminLogin = async (req, res) => {

//   try {

//     const { email, password } = req.body;

//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET)

//       res.json({ success: true, token })
//     } else {
//       res.json({ success: false, message: "Invalid email or password" })
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message })
//   }
// }


const adminLogin = async (req, res) => {
  const { email, password, captcha } = req.body;

  try {
    // CAPTCHA verification with Google reCAPTCHA API
    const captchaVerifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
    const captchaResponse = await axios.post(captchaVerifyURL);

    // If CAPTCHA verification fails
    if (!captchaResponse.data.success) {
      return res.status(400).json({ success: false, message: "CAPTCHA verification failed" });
    }

    // Check the email and password from .env against user input
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate a JWT token if credentials match
      const token = jwt.sign({ email }, process.env.JWT_SECRET);

      // Respond with success and the token
      return res.status(200).json({ success: true, token });
    } else {
      // If email or password do not match
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    // Handle server error
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const updateUserStatus = async (req, res) => {
  try {
    const { userId, newStatus } = req.body;

    const updated = await userModel.findByIdAndUpdate(
      userId,
      { status: newStatus },
      { new: true }
    );

    res.json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, password } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      }
    });
    

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export { loginUser, updateUserStatus, registerUser, adminLogin, forgotPassword, updateProfile };