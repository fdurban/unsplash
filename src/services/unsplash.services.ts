import authHandler from './auth.services'
import axios from 'axios'

class UnsplashHandler {
	private baseURL = 'https://api.unsplash.com/'
	private unsplashClientId = import.meta.env.VITE_ACCESS_KEY

	public async searchOnUnsplash(searchItem: string) {
		const response = await fetch(
			`${this.baseURL}search/photos?page=1&query=${searchItem}&client_id=${this.unsplashClientId}`,
		)
		return response.json()
	}

	public async searchPhotoId(id: string) {
		const headers = authHandler.getAuthorizationHeader()
		console.log(headers)
		const response = await fetch(
			`${this.baseURL}photos/${id}?client_id=${this.unsplashClientId}`,
		)
		return response.json()
	}

	public async getUserCollections() {
		const username = authHandler.getUsername()
		const response = await fetch(
			`${this.baseURL}users/${username}/collections`,
			{
				headers: authHandler.getAuthorizationHeader(),
			},
		)
		return response.json()
	}

	public async getCollectionsPhotos(id: string) {
		const response = await fetch(`${this.baseURL}collections/${id}/photos`, {
			headers: authHandler.getAuthorizationHeader(),
		})
		return response.json()
	}

	public async addPhotoToCollection(photoId: string, collectionId: string) {
		try {
			const headers = authHandler.getAuthorizationHeader()

			const url = `${this.baseURL}collections/${collectionId}/add`

			const data = {
				photo_id: photoId,
			}

			const addedPhoto = await axios.post(url, data, { headers })

			return addedPhoto.data
		} catch (error) {
			console.error('Error adding photo to collection:', error)
			throw error
		}
	}

	public async trackDwonload(photoId: string) {
		const response = await fetch(`${this.baseURL}photos/${photoId}/download`, {
			headers: authHandler.getAuthorizationHeader(),
		})
		return response.json()
	}
}
const photoHandler = new UnsplashHandler()

export default photoHandler
