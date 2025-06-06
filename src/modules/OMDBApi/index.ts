import axios from "axios";
import { OMBDBResponse, Plot, Type, Year } from "./types";

const OMBD_API_TOKEN = "5d2d6ee9";

const ApiInstance = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=${OMBD_API_TOKEN}`,
  headers: {
    "content-type": "application/json",
  },
});

interface SharedParams {
  type?: Type;
  year?: Year;
  plot?: Plot;
}

export interface GetByTitleParams extends SharedParams {}

async function getByTitle(
  title: string,
  params?: SharedParams
): Promise<OMBDBResponse> {
  const { type, year, plot } = params || {};

  const { data } = await ApiInstance.get(``, {
    params: {
      t: title,
      r: "json",
      ...(type && { type }),
      ...(year && { y: year }),
      ...(plot && { plot }),
    },
  });

  return data as OMBDBResponse;
}

export interface GetByIdParams extends SharedParams {}

async function getById(
  id: string,
  params?: SharedParams
): Promise<OMBDBResponse> {
  const { type, year, plot } = params || {};

  const { data } = await ApiInstance.get(``, {
    params: {
      i: id,
      r: "json",
      ...(type && { type }),
      ...(year && { y: year }),
      ...(plot && { plot }),
    },
  });

  return data as OMBDBResponse;
}

export interface SearchParams extends SharedParams {
  page?: number;
}

async function search(
  query: string,
  params?: SearchParams
): Promise<{
  data: Pick<OMBDBResponse, "Title" | "Poster" | "Year" | "imdbID" | "Type">[];
  totalResults: number;
}> {
  const { type, year, plot, page } = params || {};

  const { data } = await ApiInstance.get(``, {
    params: {
      s: query,
      r: "json",
      ...(type && { type }),
      ...(year && { y: year }),
      ...(plot && { plot }),
      ...(page && { page }),
    },
  });

  if (data.Response === "False") {
    return {
      data: [],
      totalResults: 0,
    };
  }

  return {
    data: data.Search,
    totalResults: data.totalResults,
  };
}

const functions = {
  search,
  getByTitle,
  getById,
};

const OMBDBApi = Object.assign({ ...functions }, ApiInstance);
export default OMBDBApi;
export * from "./types";
