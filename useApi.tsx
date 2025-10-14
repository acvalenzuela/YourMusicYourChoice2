
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
  ): Promise<SearchResult[]> => {
    const result = await fetch(
      `${url}?method=artist.search&artist=${encodeURIComponent(title)}&api_key=${apiKey}&format=json`
    );

    return result.json();
  };

 const getAlbum = async (id: string): Promise<DetailsResult> => {
    const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
    return result.json();
  };

  return {
    searchData,
    getAlbum,
  };
};

export default useApi;