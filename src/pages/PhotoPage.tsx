import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import photoHandler from '../services/unsplash.services';

interface UnsplashResult {
  id: string;
  urls: {
    regular: string;
  };
}

interface UnsplashResponse {
  results: UnsplashResult[];
}

const PhotoPage: React.FC = () => {
  const { query: urlQuery } = useParams<{ query: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foundData, setFoundData] = useState<UnsplashResponse>({ results: [] });

  const handleSearch = async (query: string): Promise<void> => {
    try {
      const data = await photoHandler.searchOnUnsplash(query);
      setFoundData(data);
      navigate(`/query/${query}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFoundData({ results: [] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleSearch(searchQuery);
  };

  const handleRedirect = async (photoId: string): Promise<void> => {
    try {
      navigate(`/photoid/${photoId}`);
    } catch (error) {
      console.error('Error redirecting:', error);
    }
  };

  useEffect(() => {
    if (urlQuery) {
      handleSearch(urlQuery);
    }
  }, [ urlQuery]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setSearchQuery(e.target.value)} placeholder='Enter a value' />
        <button>Search</button>
      </form>

      <div className='flex flex-wrap my-12 mx-36'>
        {foundData.results.map((result, index) => (
          <img
            key={index}
            src={result.urls.regular}
            alt={`Image ${index}`}
            className="w-full max-w-xs m-2 object-fill"
            onClick={() => handleRedirect(result.id)}
          />
        ))}
      </div>
    </>
  );
};

export default PhotoPage;

