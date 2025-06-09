import express from 'express';
import multer from 'multer';
import adminAuth from '../middleware/adminAuth.js';
import { addHome, editHome, listHome, removeHome, singleHome, toggleHomeEnable } from '../controllers/homeController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const cpUpload = upload.fields([{ name: 'homeBanner', maxCount: 1 }]);

router.post('/addHome', adminAuth, cpUpload, addHome);
router.get('/listHome', listHome);
router.post('/removeHome', adminAuth, removeHome);
router.post('/singleHome', singleHome);
router.put('/editHome', adminAuth, cpUpload, editHome);
router.put('/toggleHome', adminAuth, toggleHomeEnable);


export default router;
