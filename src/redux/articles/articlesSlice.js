import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  articlesData: [],
  filteredData: [],
  isEnd: false
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articlesData = [...state.articlesData, ...action.payload.data];
      state.isEnd = action.payload.page === 2;
    },
    defaultArticles: state => {
      state.articlesData = [];
      state.filteredData = [];
      isEnd = false;
    },
    resetArticles: (state, action) => {
      state.articlesData = [];
    },
    filterArticles: (state, action) => {
      state.filteredData = state.articlesData.filter(
        article =>
          article.headline.main.includes(action.payload) ||
          article.lead_paragraph.includes(action.payload),
      );
    },
    clearFilteredArticles: state => {
      state.filteredData = [];
    },
  },
});

export const {
  setArticles,
  filterArticles,
  clearFilteredArticles,
  defaultArticles,
  resetArticles,
} = articlesSlice.actions;

export default articlesSlice.reducer;
