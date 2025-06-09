import React from 'react'
import HomeTable from './hometables/HomeTable'

const ListHome = ({token}) => {
  return (
    <div>
      <HomeTable token={token} />
    </div>
  )
}

export default ListHome
