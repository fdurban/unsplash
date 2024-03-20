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
			<div className='mt-5 flex flex-col items-center justify-center'>
				<h1 className='inline-block bg-gradient-to-r from-yellow-200 to-pink-900 bg-clip-text text-5xl font-semibold text-transparent'>
					{collectionTitle}
				</h1>
				<h1 className='mt-2 font-semibold'>{collectionNumber} photos</h1>
			</div>
			<div className='my-8 flex flex-wrap justify-center px-36'>
				{photos.map((photo, index) => (
					<img
						key={index}
						src={photo.urls.raw}
						alt=''
						className='m-2 max-w-xs rounded-md object-cover'
					/>
				))}
			</div>
		</>
	)
}

export default CollectionDetailPage
