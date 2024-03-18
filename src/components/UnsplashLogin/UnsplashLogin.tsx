const UnsplashLogin = () => {
  const authorizationEndpoint = 'https://unsplash.com/oauth/authorize';

  const queryParams = new URLSearchParams({
    client_id:'yBqSXnlnFm-ygmSjxFP9FXwU-XUIldRmmfPhTOcBbhE',
    redirect_uri:"http://localhost:5173/collections",
    response_type:"code",
    scope: 'public read_collections write_collections'
  })

  const unsplashAuthURI = `${authorizationEndpoint}?${queryParams.toString()}`;
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 mt-10 text-center">To see your collections you must login with your Unsplash account.</h1>
      <a href={unsplashAuthURI} className="bg-gradient-to-r from-yellow-200 to-pink-900 inline-block text-transparent bg-clip-text">Login with Unsplash</a>
    </div>
  );
};

export default UnsplashLogin;






