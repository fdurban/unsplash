import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import searchIcon from '../../public/assets/Search.svg'

const HomePage = () => {
	const navigate = useNavigate()
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = () => {
		if (searchQuery.trim() !== '') {
			navigate(`/query/${searchQuery}`)
		}
	}

	return (
		<div className='flex h-screen py-8'>
			<div className='max-h-full'>
				<img
					className='h-screen w-auto object-none'
					src='/assets/hero-left.png'
					alt=''
				/>
			</div>
			<div className='relative flex flex-col items-center justify-center px-8 py-16 sm:w-1/2'>
				<h1 className='font-regular text-4xl'>Search</h1>
				<p className='font-thin'>Search high resolution images from Unsplash</p>
				<div className='relative flex w-full items-center rounded-md border-2 px-4'>
					<input
						className='h-auto flex-grow py-4 pl-4 pr-12 focus:outline-none'
						type='text'
						placeholder='Enter your keywords...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>
					<button
						onClick={handleSearch}
						className='absolute right-0 h-full p-2'
					>
						<img src={searchIcon} alt='Search' className='h-6 w-6' />
					</button>
				</div>
			</div>
			<div className='max-h-full'>
				<img
					className='h-screen w-auto object-none'
					src='/assets/hero-right.png'
					alt=''
				/>
			</div>
		</div>
	)
}

export default HomePage
