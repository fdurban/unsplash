import React, { type FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <Link to={'/'}>
            <img src="/assets/Logo.svg" alt="Logo" />
          </Link>
          <div className="flex flex-row justify-between">
            <p className="px-2 py-2 hover:bg-gray-200 rounded-md font-medium">
              <Link to={'/'}>Home</Link>
            </p>
            <p className="px-2 py-2 hover:bg-gray-200 rounded-md font-medium">
              <Link to={'/collections'}>Collections</Link>
            </p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
