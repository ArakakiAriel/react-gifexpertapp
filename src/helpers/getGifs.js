export const getGifs = async (category) => {
  console.log(category)
  const apiKey = "wKeZ3oG4mz7cXDaH1EGAfcUtGygT5F68";
  let apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURI(category)}&limit=10`; //El encodeURI cambia los espacios por +

  const resp = await fetch(apiUrl);
  const { data } = await resp.json();
  const gifs = data.map((gif) => {
    return {
      id: gif.id,
      title: gif.title,
      url: gif.images?.downsized_medium.url,
    };
  });
  return gifs;
};
