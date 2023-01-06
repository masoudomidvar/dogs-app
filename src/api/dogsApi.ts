import { QueryFunctionContext } from "@tanstack/react-query";
import { api } from "../lib/axios";

export type IBreedsRes = {
  message: {
    [key: string]: string[];
  };
  status: string;
};

export type IDogsImagesRes = {
  message: string[];
};

export const dogsApi = {
  getBreeds: async (): Promise<IBreedsRes> => {
    const { data } = await api.get("/breeds/list/all");
    return data;
  },
  getImages: async ({
    queryKey,
  }: QueryFunctionContext<
    [string, { breed: string; subBreed: string }]
  >): Promise<IDogsImagesRes> => {
    const [_key, { breed, subBreed }] = queryKey;
    const path = subBreed
      ? `/breed/${breed}/${subBreed}/images`
      : `/breed/${breed}/images`;
    const { data } = await api.get(path);
    return data;
  },
};
