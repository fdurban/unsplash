import { useState, useEffect } from 'react'
import photoHandler from '../services/unsplash.services'
import UnsplashLogin from '../components/UnsplashLogin/UnsplashLogin'
import authHandler from '../services/auth.services'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface Collection {
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
}

const CollectionsPage: React.FC = () => {
	const [collections, setCollections] = useState<Collection[]>([])
	const [query] = useSearchParams()
	const code1 = query.get('code')
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (code1) {
					await authHandler.exchangeCodeForToken(code1)
				}
				const response: Collection[] = await photoHandler.getUserCollections()
				if (Array.isArray(response)) {
					setCollections(response)
				} else {
					console.error('Invalid response format for collections')
				}
			} catch (error) {
				console.error('Error fetching collections:', error)
				setCollections([])
			}
		}

		fetchData()
	}, [])

	const handleLogout = () => {
		authHandler.logout()
	}

	return (
		<>
			{localStorage.authToken ? (
				<>
					<div className='mt-5 flex flex-col items-center justify-center'>
						<h1 className='mt-6 inline-block bg-gradient-to-r from-yellow-200 to-pink-900 bg-clip-text text-5xl font-semibold text-transparent'>
							Collections
						</h1>
						<p className='mt-3 w-96 px-2 text-center'>
							Explore the world through collections of beautiful photos free to
							use under the Unsplash License.
						</p>
						<ul className='flex flex-col'>
							{collections.map(collection => (
								<li key={collection.id} className='flex flex-col'>
									<div
										className='mx-6 mt-12 flex space-x-1'
										onClick={() => {
											navigate(`/collection/${collection.id}`)
										}}
									>
										<img
											key={collection.preview_photos[0].id}
											className='h-auto w-44 rounded-l-md'
											src={collection.preview_photos[0].urls.raw}
											alt=''
										/>
										<div className='flex flex-col space-y-1'>
											<img
												key={collection.preview_photos[1].id}
												className='h-auto w-20 rounded-tr-md'
												src={collection.preview_photos[1].urls.raw}
												alt=''
												style={{ height: '50%' }}
											/>
											<img
												key={collection.preview_photos[2].id}
												className='h-auto w-20 rounded-br-lg'
												src={collection.preview_photos[2].urls.raw}
												alt=''
												style={{ height: '50%' }}
											/>
										</div>
									</div>
									<h3 className='ml-6'>{collection.title}</h3>
									<h3 className='ml-6 text-slate-400'>
										{collection.total_photos} Photos
									</h3>
								</li>
							))}
						</ul>
					</div>
					<button onClick={handleLogout}>Logout</button>
				</>
			) : (
				<UnsplashLogin />
			)}
		</>
	)
}

export default CollectionsPage
