import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import photoHandler from '../services/unsplash.services'
import toast from 'react-hot-toast'

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
		if (searchQuery.trim() !== '') {
			await handleSearch(searchQuery)
		} else {
			console.error('Input is empty')
			toast.error('Enter characters')
		}
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
		<>
			<img
				src='/assets/gradiend-bg.svg'
				alt='bg-different-colors'
				className='w-screen'
			/>
			<div className='left-0 right-0 mt-[-10px] flex justify-center lg:mt-[-30px]'>
				<form
					onSubmit={handleSubmit}
					className='flex items-center rounded-lg bg-white shadow-lg lg:w-7/12 lg:justify-between'
				>
					<input
						onChange={e => setSearchQuery(e.target.value)}
						placeholder='Search beautiful images'
						className=' ml-4 border-none focus:outline-none'
					/>
					<button className='pt-4'>
						<img src='/assets/Search.svg' alt='' className='pb-4 lg:pr-4' />
					</button>
				</form>
			</div>
			<div className='mx-12 my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
				{foundData.results.map((result, index) => (
					<img
						key={index}
						src={result.urls.regular}
						alt={`Image ${index}`}
						className='h-auto w-full max-w-none cursor-pointer rounded object-cover'
						onClick={() => handleRedirect(result.id)}
					/>
				))}
			</div>
		</>
	)
}

export default PhotoPage
