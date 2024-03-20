import { type FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
	return (
		<nav className='sticky top-0 bg-white shadow-md'>
			<div className=' px-4 py-5'>
				<div className='flex items-center justify-between'>
					<Link to={'/'}>
						<img src='/assets/Logo.svg' alt='Logo' />
					</Link>
					<div className='flex flex-row justify-between'>
						<p className='rounded-md px-2 py-2 font-medium hover:bg-gray-200'>
							<Link to={'/'}>Home</Link>
						</p>
						<p className='rounded-md px-2 py-2 font-medium hover:bg-gray-200'>
							<Link to={'/collections'}>Collections</Link>
						</p>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
