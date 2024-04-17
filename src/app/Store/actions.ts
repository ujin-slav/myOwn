import { createAction, props } from '@ngrx/store';
import { IPost } from '../models/IPost';

export const getPosts = createAction('');
export const getPostsSuccess = createAction(
  '[Posts] Get Posts success',
  props<{ posts: IPost[] }>()
);
export const getPostsFailure = createAction(
  '[Posts] Get Posts failure',
  props<{ error: string }>()
);
export const PostsActions = {
  getPosts, getPostsSuccess, getPostsFailure
}