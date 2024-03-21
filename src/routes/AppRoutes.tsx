import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PhotoPage from '../pages/PhotoPage'
import { PhotoDetailPage } from '../pages/PhotoDetailPage'
import CollectionsPage from '../pages/CollectionsPage'
import CollectionDetailPage from '../pages/CollectionDetailPage'

const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/query/:query' element={<PhotoPage />} />
			<Route path='/photoid/:id' element={<PhotoDetailPage />} />
			<Route path='/collections' element={<CollectionsPage />} />
			<Route path='/collection/:id' element={<CollectionDetailPage />} />
			<Route path='*' element={'404'} />
		</Routes>
	)
}

export default AppRoutes
