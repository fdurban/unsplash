import { useState, useEffect } from "react";
import { useParams } from "react-router";
import phothoHandler from "../services/unsplash.services";
import AddToCollectionModal from "../components/AddToCollectionModal/AddToCollectionModal";
import photoHandler from "../services/unsplash.services";
import toast from "react-hot-toast";

export interface Collection {
  id: string;
  title: string;
  description: string;
  total_photos: number;
  preview_photos: {
    id: string;
    urls: {
      raw: string;
    };
  }[];
  cover_photo: {
    urls: {
      raw: string;
    };
  };
}

export const PhotoDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoUser, setPhotoUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [publishedDate, setPublishedDate] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photoData, userCollections] = await Promise.all([
          
            phothoHandler.searchPhotoId(id!),
          
          phothoHandler.getUserCollections(),
        ]);

        if (photoData.urls && photoData.urls.regular) {
          setPhotoUrl(photoData.urls.regular);
          setPhotoUser(photoData.user.profile_image.medium);
          setUserName(photoData.user.first_name);
          setUserLastName(photoData.user.last_name);
          setPublishedDate(photoData.created_at);
        } else {
          console.error("Invalid data structure:", photoData);
        }

        if (Array.isArray(userCollections)) {
          setCollections(userCollections);
        } else {
          console.error("Invalid response format for user collections");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const formatPublishedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const filteredCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addPhotoToCollection = async (collectionId: string) => {
    try {
      await photoHandler.addPhotoToCollection(id!, collectionId);
      setOpen(false);
      toast.success('Photo added to the collection successfully!')
    } catch (error) {
      toast.error('Error adding the image to the collection, please try later')
      console.error("Error adding photo to collection:", error);
    }
  };


  return (
    <div className="flex align-center justify-center mt-6">
      {photoUrl ? (
        <>
          <img src={photoUrl} alt={`Image ${id}`} className="w-1/4 h-1/4" />
          <div>
            <div className="flex">
              <img
                src={photoUser!}
                alt={`Image ${id}`}
                className="w-12 h-12 rounded-full"
              />
              <p>
                {userName} {userLastName}
              </p>
            </div>
            <span></span>
            {publishedDate && (
              <p>{`Published on: ${formatPublishedDate(
                publishedDate
              )}`}</p>
            )}
            <button onClick={() => setOpen(true)}>Add to Collection</button>
            {/* Here is the MODAL */}
            <AddToCollectionModal
              open={open}
              onClose={() => setOpen(false)}
            >
              <h1>Add to collections</h1>
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <ul>
                {filteredCollections.map((collection) => (
                  <li key={collection.id}>
                    <div className="flex align-center items-center justify-between p-2 hover:bg-slate-100 rounded-md">
                      <div className="flex items-center">
                        <img
                          src={collection.cover_photo.urls.raw}
                          alt=""
                          className="w-12 h-12 ml-2 rounded-md"
                        />
                        <div className="ml-4">
                          <p className="font-bold">{collection.title}</p>
                          <p>{collection.total_photos} photos</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addPhotoToCollection(collection.id)}
                        className="ml-4  text-black px-2 py-1 rounded-md font-bold opacity-0 hover:opacity-100"
                      >
                        +   Add to Collection
                      </button>
                    </div>
                  </li>
                ))}
              </ul>


            </AddToCollectionModal>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


