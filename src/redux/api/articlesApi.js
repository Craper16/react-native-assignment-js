import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_KEY} from '@env';
import { storage } from '../../storage/storage';

const accessToken = storage.getString('accessToken');

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
  }),
  endpoints: builder => ({
    fetchArticles: builder.query({
      query: (page) => {
        console.log('APIIII', page);
        return {
          url: `/articles?page=${page}`,
          method: 'get',
          headers: {Authorization: `Bearer ${accessToken}`},
        };
      },
    }),
  }),
});

export const {useFetchArticlesQuery} = articlesApi;
