import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import photoHandler from '../services/unsplash.services'

interface UnsplashResult {
	id: string
	urls: {
		regular: string
	}
}

interface UnsplashResponse {
	results: UnsplashResult[]
}

const PhotoPage: React.FC = () => {
	const { query: urlQuery } = useParams<{ query: string }>()
	const navigate = useNavigate()

	const [searchQuery, setSearchQuery] = useState<string>('')
	const [foundData, setFoundData] = useState<UnsplashResponse>({ results: [] })

	const handleSearch = async (query: string): Promise<void> => {
		try {
			const data = await photoHandler.searchOnUnsplash(query)
			setFoundData(data)
			navigate(`/query/${query}`)
		} catch (error) {
			console.error('Error fetching data:', error)
			setFoundData({ results: [] })
		}
	}

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault()
		await handleSearch(searchQuery)
	}

	const handleRedirect = async (photoId: string): Promise<void> => {
		try {
			navigate(`/photoid/${photoId}`)
		} catch (error) {
			console.error('Error redirecting:', error)
		}
	}

	useEffect(() => {
		if (urlQuery) {
			handleSearch(urlQuery)
		}
	}, [urlQuery])

	return (
		<div className=''>
			<img
				src='../../public/assets/gradiend-bg.svg'
				alt='bg-different-colors'
				className='w-screen'
			/>
			<div className='left-0 right-0 mt-[-30px] flex justify-center'>
				<form
					onSubmit={handleSubmit}
					className='flex items-center rounded-lg bg-white shadow-lg'
				>
					<input
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Search beautiful images'
						className=' ml-4 border-none focus:outline-none'
					/>
					<button className='pt-4'>
						<img src='../../public/assets/Search.svg' alt='' className='pb-4' />
					</button>
				</form>
			</div>
			<div className='my-12 flex flex-wrap justify-center px-36'>
				{foundData.results.map((result, index) => (
					<img
						key={index}
						src={result.urls.regular}
						alt={`Image ${index}`}
						className='m-2 max-w-xs rounded object-fill'
						onClick={() => handleRedirect(result.id)}
					/>
				))}
			</div>
		</div>
	)
}

export default PhotoPage
