import { create } from "zustand";
import { PaginationPosts } from "../interface/pagination";

interface PostsFilterState {
  pagination: PaginationPosts;
  setPage: (value: { page: number }) => void;
  init: (value: PaginationPosts) => void;
}

export const usePostsFilterState = create<PostsFilterState>((set) => ({
  pagination: {
    limit: 10,
    page: 1,
    totalPage: 0,
    totalAll: 0,
  },
  setPage: (page) =>
    set((state) => ({
      ...state,
      pagination: {
        ...state.pagination,
        page: page.page, // update the page property
      },
    })),
  init(value) {
    set(() => ({ pagination: value }));
  },
}));
