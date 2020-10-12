export const getRandomGif = async () => {
    const apiKey = "wKeZ3oG4mz7cXDaH1EGAfcUtGygT5F68";
    let apiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`; //El encodeURI cambia los espacios por +
  
    const resp = await fetch(apiUrl);
    const { data } = await resp.json();
    const randomGif = {
        id: data.id,
        title: data.title,
        url: data.images?.downsized_medium.url,
      };
    return [randomGif];
}
  