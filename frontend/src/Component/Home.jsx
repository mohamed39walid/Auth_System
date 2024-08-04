import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import background from './Images/background.jpg'

function Home() {
  return (
    <div>
      <Navbar />
      <div className='relative bg-gray-100 min-h-screen'>
        <img src={background} alt="" className='absolute inset-0 w-full h-full object-cover' />
        <div className='relative z-10 text-center pt-48'>
          <h1 className='text-6xl font-bold font-serif antialiased text-red-500'>
            Get an account to see <br /> the products
          </h1>
          <Link to='/products' className='bg-red-500 font-semibold text-white mt-10 p-3 rounded-md hover:bg-red-600 inline-block'>
            Products
          </Link>
        </div>
        <div className='absolute inset-0 bg-black opacity-50'></div> {/* Optional: Add a dark overlay to improve text readability */}
      </div>
    </div>
  )
}

export default Home
