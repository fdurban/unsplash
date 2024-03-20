import axios from 'axios'

class AuthService {
	private baseURL = 'https://unsplash.com/'
	private unsplashClientId = import.meta.env.VITE_ACCESS_KEY
	private unsplashClientSecret = import.meta.env.VITE_CLIENT_SECRET
	public token: string | null = null
	private username: string | null = null

	constructor() {
		this.token = localStorage.getItem('accessToken') || null
		this.username = localStorage.getItem('username') || null
	}

	public async exchangeCodeForToken(code: string): Promise<string> {
		const redirectUri = import.meta.env.VITE_REDIRECT_URI

		try {
			const tokenResponse = await axios.post(`${this.baseURL}oauth/token`, {
				client_id: this.unsplashClientId,
				client_secret: this.unsplashClientSecret,
				redirect_uri: redirectUri,
				code,
				grant_type: 'authorization_code',
			})

			localStorage.setItem('authToken', tokenResponse.data.access_token)
			localStorage.setItem('username', tokenResponse.data.username)
			this.setToken(tokenResponse.data.access_token)
			this.setUsername(tokenResponse.data.username)
			const accessData = tokenResponse.data
			return accessData
		} catch (error) {
			console.error('Error exchanging code for token:', error)
			throw new Error('Unable to exchange code for token')
		}
	}

	private setToken(token: string): void {
		this.token = token
	}
	private setUsername(username: string): void {
		this.username = username
	}

	public getUsername(): string | null {
		return this.username
	}

	public getAuthorizationHeader(): { [key: string]: string } {
		const localStorageToken = localStorage.getItem('authToken')

		if (localStorageToken) {
			this.setToken(localStorageToken)
			const token = localStorageToken
			const headers: HeadersInit = {
				Authorization: `Bearer ${token}`,
			}
			return headers
		}

		return {}
	}
	public logout(): void {
		this.token = null
		this.username = null

		localStorage.removeItem('authToken')
		localStorage.removeItem('username')
		window.location.href = '/'
	}
}

const authHandler = new AuthService()
export default authHandler
