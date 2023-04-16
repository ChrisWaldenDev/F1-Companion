import Navbar from './Navbar.tsx'
import Infobar from './Infobar.tsx'
import React from 'react'

// Default Header
function Header (): JSX.Element {
  return (
    <div>
      <Navbar/>
      <Infobar/>
    </div>
  )
}

export default Header
