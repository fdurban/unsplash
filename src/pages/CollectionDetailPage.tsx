import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import photoHandler from '../services/unsplash.services'

interface Photos {
	id: string
	urls: {
		raw: string
	}
}

const CollectionDetailPage: React.FC = () => {
	const [photos, setPhotos] = useState<Photos[]>([])
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await photoHandler.getCollectionsPhotos(id!)
				setPhotos(result)
			} catch (error) {
				console.error('Error fetching photos:', error)
			}
		}

		fetchData()
	}, [id])
	console.log(photos)

	return (
		<>
			{photos.map(photo => (
				<>
					<img src={photo.urls.raw} alt='' />
				</>
			))}
			<h1>This is the Collections Photos</h1>
		</>
	)
}

export default CollectionDetailPage
