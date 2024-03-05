import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
    <div className="flex justify-between py-5 px-16 border-b-2">
      <Link to={`/`}><img src="/assets/Logo.svg" alt="" /></Link>
  
  <div className="flex flex-row justify-between">
    <p className="px-5"><Link to={`/`}>Home</Link></p>
    <p className="mx-5"><Link to={`/collections`}>Collections</Link></p>
  </div>

    </div>
  </>
  )
}

export default Navbar