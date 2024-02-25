import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/'/>
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