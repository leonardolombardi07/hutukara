export interface OMBDBResponse {
  Title: string;
  Plot: string;
  Poster: string;
  Year: string;
  imdbID: string;
  Type: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export type Type = "movie" | "series" | "episode";
export type Plot = "short" | "full";
export type Year = `${number}${number}${number}${number}`;
