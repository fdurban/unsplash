import { Route, Routes } from 'react-router-dom'
import React from 'react'
import HomePage from '../pages/HomePage'
import PhotoPage from '../pages/PhotoPage'
import { PhotoDetailPage } from '../pages/PhotoDetailPage'
// import HandleCallback from "../pages/HandleCallback"
import CollectionsPage from '../pages/CollectionsPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/query/:query' element={<PhotoPage />} />
      <Route path='/photoid/:id' element={<PhotoDetailPage />} />
      {/* <Route path='/handle' element={<HandleCallback/>}/> */}
      <Route path='/collections' element={<CollectionsPage />} />
      <Route path='/' />
      <Route path='/' />
      <Route path='*' element={'404'} />
    </Routes>
  )
}

export default AppRoutes