import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import photoHandler from '../services/unsplash.services'

interface Photos {
	id: string
	urls: {
		raw: string
	}
	current_user_collections: [
		{
			title: string
		},
	]
}

const CollectionDetailPage: React.FC = () => {
	const [collectionTitle, setCollectionTitle] = useState<string>('')
	const [collectionNumber, setCollectionNumber] = useState<string>('')
	const [photos, setPhotos] = useState<Photos[]>([])
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await photoHandler.getCollectionsPhotos(id!)
				setPhotos(result)
				if (result.length > 0) {
					setCollectionTitle(result[0].current_user_collections[0].title)
					setCollectionNumber(
						result[0].current_user_collections[0].total_photos,
					)
				}
			} catch (error) {
				console.error('Error fetching photos:', error)
			}
		}

		fetchData()
	}, [id])

	return (
		<>
			<div className='flex flex-col mt-5 items-center justify-center'>
				<h1 className='bg-gradient-to-r from-yellow-200 to-pink-900 inline-block text-transparent bg-clip-text text-5xl font-semibold'>
					{collectionTitle}
				</h1>
				<h1 className='mt-2 font-semibold'>{collectionNumber} photos</h1>
			</div>
			<div className='flex flex-wrap justify-center my-8 px-36'>
				{photos.map((photo, index) => (
					<img
						key={index}
						src={photo.urls.raw}
						alt=''
						className='max-w-xs m-2 object-fill rounded-md'
					/>
				))}
			</div>
		</>
	)
}

export default CollectionDetailPage
