import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import searchIcon from '../../public/assets/Search.svg'

const HomePage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/query/${searchQuery}`)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-screen">
      <img className='hidden sm:block w-auto' src="/assets/hero-left.png" alt="" />
      <div className="flex flex-col items-center justify-center space-y-4 sm:w-1/2 relative mx-4">
        <h1 className="font-regular text-4xl">Search</h1>
        <p className="font-thin">
          Search high resolution images from Unsplash
        </p>
        <div className="relative flex items-center w-full rounded-md border-2 pl-2">
          <input
            className=" h-auto py-4  focus:outline-none"
            type="text"
            placeholder="Enter your keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="absolute right-0 h-full p-2">
            <img src={searchIcon} alt="Search" className="h-6 w-6" />
          </button>
        </div>
      </div>
      <img className='hidden sm:block w-auto' src="/assets/hero-right.png" alt="" />
    </div>
  )
}

export default HomePage






