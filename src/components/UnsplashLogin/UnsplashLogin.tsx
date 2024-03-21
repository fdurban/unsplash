const UnsplashLogin = () => {
	const authorizationEndpoint = 'https://unsplash.com/oauth/authorize'

	const queryParams = new URLSearchParams({
		client_id: import.meta.env.VITE_ACCESS_KEY,
		redirect_uri: import.meta.env.VITE_REDIRECT_URI,
		response_type: import.meta.env.VITE_RESPONSE_TYPE,
		scope: 'public read_collections write_collections',
	})

	const unsplashAuthURI = `${authorizationEndpoint}?${queryParams.toString()}`
	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='mb-4 mt-10 text-center'>
				To see your collections you must login with your Unsplash account.
			</h1>
			<a
				href={unsplashAuthURI}
				className='inline-block bg-gradient-to-r from-yellow-200 to-pink-900 bg-clip-text text-transparent'
			>
				Login with Unsplash
			</a>
		</div>
	)
}

export default UnsplashLogin
