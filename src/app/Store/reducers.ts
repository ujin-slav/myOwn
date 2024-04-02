import { createReducer, on } from '@ngrx/store';
import { IPost } from '../models/IPost';

import * as PostsActions from './actions';

export interface IState {
    isLoading: boolean,
    posts: IPost[],
    error: string,
}

export const initialState:IState = {
  isLoading: false,
  posts: [],
  error: "",
};

export const reducers = createReducer(
  initialState,
  on(PostsActions.getPosts, (state) => ({ ...state, isLoading: true })),
  on(PostsActions.getPostsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    posts: action.posts,
  })),
  on(PostsActions.getPostsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);