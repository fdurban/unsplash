
const UnsplashLogin = () => {
  const authorizationEndpoint = 'https://unsplash.com/oauth/authorize';

  const queryParams = new URLSearchParams({
    client_id:'yBqSXnlnFm-ygmSjxFP9FXwU-XUIldRmmfPhTOcBbhE',
    redirect_uri:"http://localhost:5173/handle",
    response_type:"code",
    scope: 'public read_collections write_collections'
  })

  const unsplashAuthURI = `${authorizationEndpoint}?${queryParams.toString()}`;
  return (
    <div>
      <h1>Unsplash Login</h1>
      <a href={unsplashAuthURI}>Heeeeyyyy</a>
    </div>
  );
};

export default UnsplashLogin;






