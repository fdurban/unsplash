import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PhotoPage from "../pages/PhotoPage"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:query' element={<PhotoPage/>}/>
        <Route path='/'/>
        <Route path='/'/>
        <Route path='/'/>
        <Route path='/'/>
        <Route path='/'/>
        <Route path='*' element={'404'}/>
    </Routes>
  )
}

export default AppRoutes