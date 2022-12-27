import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {storage} from '../../storage/storage';
import {API_KEY} from '@env';


export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_KEY,
    prepareHeaders: headers => {
      const accessToken = storage.getString('accessToken');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },
  }),
  endpoints: builder => ({
    fetchArticles: builder.query({
      query: page => {
        return {
          url: `/articles?page=${page}`,
          method: 'get',
        };
      },
    }),
  }),
});

export const {useFetchArticlesQuery} = articlesApi;
