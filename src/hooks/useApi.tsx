
export enum SearchType {
  all = "",
  album = "album",
  artist = "artist",
  track = "track",
}
// Interface for search result items
export interface SearchResult {
  name: string;
  url: string;
  image: { ["#text"]: string; size: string }[];
  artist?: { name: string; url: string };
  mbid?: string;
}

export interface SearchError {
  Response: string;
  Error: string;
}

export interface DetailsResult {
  name: string;
  url: string;
  image: { ["#text"]: string; size: string }[];
  bio?: { summary: string; content: string }; 
  tracks?: { track: SearchResult[] }; 
  artist?: { name: string };
  listeners?: string;
  playcount?: string;
}


export const useApi = () => {
  const url =  "https://ws.audioscrobbler.com/2.0/";
  const apiKey = "bba1cf217b49b41c717adeabcab96bc3"; 

  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<any> => {
    try {
      let method = 'artist.search';
      let param = 'artist';
      
      if (type === SearchType.album) {
        method = 'album.search';
        param = 'album';
      } else if (type === SearchType.track) {
        method = 'track.search';
        param = 'track';
      }

      const apiUrl = `${url}?method=${method}&${param}=${encodeURIComponent(title)}&api_key=${apiKey}&format=json`;
      
      const result = await fetch(apiUrl);

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      return data;
    } catch (error) {
      console.error('API search error:', error);
      throw error;
    }
  };

 const getAlbum = async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
    return result.json();
  };

  const getArtistTopTracks = async (artistName: string): Promise<any> => {
    try {
      const apiUrl = `${url}?method=artist.gettoptracks&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;
      const result = await fetch(apiUrl);
      
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      return data;
    } catch (error) {
      console.error('API getArtistTopTracks error:', error);
      throw error;
    }
  };

  const getAlbumTracks = async (artistName: string, albumName: string): Promise<any> => {
    try {
      const apiUrl = `${url}?method=album.getinfo&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&api_key=${apiKey}&format=json`;
      const result = await fetch(apiUrl);
      
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      const data = await result.json();
      return data;
    } catch (error) {
      console.error('API getAlbumTracks error:', error);
      throw error;
    }
  };

  return {
    searchData,
    getAlbum,
    getArtistTopTracks,
    getAlbumTracks,
  };
};

export default useApi;