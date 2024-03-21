import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PhotoPage from '../pages/PhotoPage'
import { PhotoDetailPage } from '../pages/PhotoDetailPage'
import CollectionsPage from '../pages/CollectionsPage'
import CollectionDetailPage from '../pages/CollectionDetailPage'
import React from 'react'

const AppRoutes = () => {
	const navigate = useNavigate()

	React.useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const code = params.get('code')

		if (code) {
			navigate(`/collections?code=${code}`)
			console.log('Received code:', code)
		}
	}, [])
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/query/:query' element={<PhotoPage />} />
			<Route path='/photoid/:id' element={<PhotoDetailPage />} />
			<Route path='/collections' element={<CollectionsPage />} />
			<Route path='/collection/:id' element={<CollectionDetailPage />} />
			<Route path='/' />
			<Route path='*' element={'404'} />
		</Routes>
	)
}

export default AppRoutes
