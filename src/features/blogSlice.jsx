import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  comments: [],
  categories: [],
  users: [],
  singleBlog: [],
  likes: [],
  loading: false,
  error: false,
  totalPages: 0,
  currentPage: 1,
  showComments: false
};

const blogSlice = createSlice({
  name: "getBlog",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    getBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload.data;
      state.totalPages = payload.details.pages.total;
      state.currentPage = payload.details.pages.current;
    },
    getMyBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.blogs = payload.data;
    },
    getSingleBlogSuccess: (state, { payload }) => {
      state.loading = false;
      state.singleBlog = payload.data;
    },
    getCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
    },
    getLikeSuccess: (state, { payload }) => {
      state.loading = false;
      state.likes = payload;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setShowComments: (state, { payload }) => {
      state.showComments = payload;
    },
  },
});

export const {
  fetchStart,
  fetchFail,
  getBlogSuccess,
  getMyBlogSuccess,
  getSingleBlogSuccess,
  getCategoriesSuccess,
  getLikeSuccess,
  setCurrentPage,
  setShowComments,
} = blogSlice.actions;

export default blogSlice.reducer;
