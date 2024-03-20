import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import AddToCollectionModal from '../components/AddToCollectionModal/AddToCollectionModal'
import photoHandler from '../services/unsplash.services'
import toast from 'react-hot-toast'

export interface Collection {
	id: string
	title: string
	description: string
	total_photos: number
	preview_photos: {
		id: string
		urls: {
			raw: string
		}
	}[]
	cover_photo: {
		urls: {
			raw: string
		}
	}
}

export const PhotoDetailPage = () => {
	const { id } = useParams<{ id: string }>()

	const [photoUrl, setPhotoUrl] = useState<string | null>(null)
	const [photoUser, setPhotoUser] = useState<string | null>(null)
	const [userName, setUserName] = useState<string | null>(null)
	const [userLastName, setUserLastName] = useState<string | null>(null)
	const [publishedDate, setPublishedDate] = useState<string | null>(null)
	const [collections, setCollections] = useState<Collection[]>([])
	const [open, setOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState<string>('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [photoData, userCollections] = await Promise.all([
					photoHandler.searchPhotoId(id!),

					photoHandler.getUserCollections(),
				])

				if (photoData.urls && photoData.urls.regular) {
					setPhotoUrl(photoData.urls.regular)
					setPhotoUser(photoData.user.profile_image.medium)
					setUserName(photoData.user.first_name)
					setUserLastName(photoData.user.last_name)
					setPublishedDate(photoData.created_at)
				} else {
					console.error('Invalid data structure:', photoData)
				}

				if (Array.isArray(userCollections)) {
					setCollections(userCollections)
				} else {
					console.error('Invalid response format for user collections')
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
	}, [id])

	const formatPublishedDate = (dateString: string): string => {
		const date = new Date(dateString)
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}
		return date.toLocaleDateString(undefined, options)
	}

	const filteredCollections = collections.filter(collection =>
		collection.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const addPhotoToCollection = async (collectionId: string) => {
		try {
			await photoHandler.addPhotoToCollection(id!, collectionId)
			setOpen(false)
			toast.success('Photo added to the collection successfully!')
		} catch (error) {
			toast.error('Error adding the image to the collection, please try later')
			console.error('Error adding photo to collection:', error)
		}
	}
	const handleDownload = async (id: string) => {
		try {
			const downloadData = await photoHandler.searchPhotoId(id)
			console.log(id)
			console.log(downloadData)
			if (downloadData.links) {
				await photoHandler.trackDwonload(id!)
				const anchor = document.createElement('a')
				anchor.href = downloadData.links.download_location
				anchor.download = `photo_${id}.jpg`
				anchor.click()
				toast.success('Image downloaded successfully!')
			} else {
				console.error('Invalid response format for download URL:', downloadData)
			}
		} catch (error) {
			console.error('Error downloading photo:', error)
			toast.error('Error downloading image')
		}
	}
	return (
		<>
			<div className='mt-6 flex flex-wrap'>
				{photoUrl ? (
					<div className=' flex items-center justify-center px-8 lg:w-1/2 lg:px-8'>
						<img
							src={photoUrl}
							alt={`Image ${id}`}
							className='mx-8 my-8 h-auto rounded '
						/>
					</div>
				) : (
					<p>Loading...</p>
				)}
				<div className='mt-6 pl-8 lg:w-1/2 lg:pl-0'>
					{photoUrl && (
						<>
							<div className='flex items-center'>
								<img
									src={photoUser!}
									alt={`Image ${id}`}
									className='h-12 w-12 rounded-full'
								/>
								<p className='pl-4'>
									{userName} {userLastName}
								</p>
							</div>
							<span></span>
							{publishedDate && (
								<p className='pt-4'>{`Published on: ${formatPublishedDate(publishedDate)}`}</p>
							)}
							<button
								onClick={() => setOpen(true)}
								className='mt-4 rounded p-1 hover:bg-gray-300'
							>
								+ Add to Collection
							</button>
							<button
								onClick={() => handleDownload(id!)}
								className='ml-4 rounded p-1 hover:bg-gray-300'
							>
								Download
							</button>
						</>
					)}

					<h1 className='text-2xl font-medium'>Collections</h1>
					<ul>
						{collections.map(collection => (
							<li
								key={collection.id}
								className='my-4 flex items-center hover:bg-slate-100'
							>
								<img
									src={collection.cover_photo.urls.raw}
									alt=''
									className='h-16 w-16 rounded-md'
								/>
								<div className='pl-4'>
									<h1>{collection.title}</h1>
									<p>{collection.total_photos} photos</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Here is the MODAL */}
			<AddToCollectionModal open={open} onClose={() => setOpen(false)}>
				<h1>Add to collections</h1>
				<input
					type='text'
					placeholder='Search collections...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				<ul>
					{filteredCollections.map(collection => (
						<li key={collection.id}>
							<div className='align-center flex items-center justify-between rounded-md p-2 hover:bg-slate-100'>
								<div className='flex items-center'>
									<img
										src={collection.cover_photo.urls.raw}
										alt=''
										className='ml-2 h-12 w-12 rounded-md'
									/>
									<div className='ml-4'>
										<p className='font-bold'>{collection.title}</p>
										<p>{collection.total_photos} photos</p>
									</div>
								</div>
								<button
									onClick={() => addPhotoToCollection(collection.id)}
									className='ml-4  rounded-md px-2 py-1 font-bold text-black opacity-0 hover:opacity-100'
								>
									+ Add to Collection
								</button>
							</div>
						</li>
					))}
				</ul>
			</AddToCollectionModal>
		</>
	)
}
