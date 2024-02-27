import { useState } from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <>
      <div className="flex justify-between my-6 space-x-0 mx-5 md:max-h-full">
        <img  src="/assets/hero-left.png" alt="" />
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="font-regular text-4xl">Search</h1>
          <p className="font-thin">
            Search high resolution images from Unsplash
          </p>
          <input
            className="border-2 h-auto py-4 border-gray-500 px-2 focus:outline-none rounded-md"
            type="text"
            placeholder="Enter your keywords..."
            onChange={(e) => {setSearchQuery(e.target.value)}}
          />
          <button onClick={() => navigate(`${searchQuery}`)}>search</button>
        </div>
        <img src="/assets/hero-right.png" alt="" />
      </div>
    </>
  );
};

export default HomePage;
