import React from 'react'
import UserViewAllBookings from '../Components/UserViewAllBookings/UserViewAllBookings'
import NavBar from '../Components/Shared/NavBar/NavBar'

const UserViewAllBookingsPage = () => {
  return (
    <div>
      <NavBar username="Sethu"></NavBar>
      <UserViewAllBookings></UserViewAllBookings>
    </div>
  )
}

export default UserViewAllBookingsPage
