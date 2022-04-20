import React from 'react'
import Navbar from '../Components/Navbar/Navbar'

interface ILayout {
    children?: React.ReactChild
}

const NavbarLayout: React.FC<ILayout> = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default NavbarLayout