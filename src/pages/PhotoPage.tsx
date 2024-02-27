import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import photoHandler from '../services/unsplashaervices'; // Make sure to correct the import path

const PhotoPage: React.FC = () => {
  // Destructuring the `query` from the `useParams` hook
  const { query } = useParams<{ query: string }>();

  // State to manage the search query and array of image URLs
  const [searchQuery, setSearchQuery] = useState<string>(query)
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  // Function to handle the search and set the array of image URLs
  const handleSearch = async (query: string): Promise<void> => {

    try {
      const foundData = await photoHandler.searchOnUnsplash(query);
      // Map through the results and extract the regular image URLs
      const urls = foundData.results.map(result => result.urls.regular);
      setImageURLs(urls);
    } catch (error) {
      console.error('Error fetching data:', error);
      setImageURLs([]); // Set an empty array in case of an error
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log(e)
    await handleSearch(searchQuery);
  };


  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);
  return (
    <> 
      {/* Input to allow users to change the search query */}
      <form onSubmit={handleSubmit}>
      <input onChange={(e)=> setSearchQuery(e.target.value)}  placeholder='Enter a value'/>
      <button>Search</button>
      </form>
      
      {/* Displaying all images based on the current search query */}
      <div className='flex flex-wrap my-12 mx-36'>
        {imageURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index}`}
            className="w-full max-w-xs m-2 object-fill"
          />
        ))}
        </div>
    </>
  );
};

export default PhotoPage;
