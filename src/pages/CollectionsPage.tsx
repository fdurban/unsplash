import  { useState, useEffect } from "react";
import photoHandler from "../services/unsplash.services";
import UnsplashLogin from "../components/UnsplashLogin/UnsplashLogin";


const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await photoHandler.getUserCollections();
        setCollections(response);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <UnsplashLogin/>
      <h2>Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <h3>{collection.title}</h3>
            <p>{collection.description}</p>
            {/* Add more details or styling as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionsPage;
