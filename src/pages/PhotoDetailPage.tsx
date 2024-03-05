import { useParams } from "react-router-dom";
import phothoHandler from "../services/unsplash.services";
import { useState, useEffect } from "react";

export const PhotoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id)

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoUser, setPhotoUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [publishedDate, setPublishedDate] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await phothoHandler.searchPhotoId(id);
        console.log(data)
        if (data.urls && data.urls.regular) {
          setPhotoUrl(data.urls.regular);
          setPhotoUser(data.user.profile_image.medium)
          setUserName(data.user.first_name);
          setUserLastName(data.user.last_name);
          setPublishedDate(data.created_at);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='flex'>
      {photoUrl ? (
        <>
        <img src={photoUrl} alt={`Image ${id}`}  />
        <div>
            <div className="flex">
        <img src={photoUser} alt={`Image ${id}`} className="w-12 h-12 rounded-full"    />
        <p>{userName}  {userLastName}</p>
            </div>
        <span></span>
        <p>{`Published on: ${publishedDate}`}</p>

        </div>
        
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
