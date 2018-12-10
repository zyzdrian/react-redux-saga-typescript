import { action } from 'typesafe-actions';
import { IPost, PostsActionTypes } from './types';

export const fetchPending = () => action(PostsActionTypes.FETCH_PENDING);

export const fetchFulfilled = (data: IPost[]) => action(PostsActionTypes.FETCH_FULFILLED, data);

export const fetchRejected = (message: string) => action(PostsActionTypes.FETCH_REJECTED, message);

export const createPending = () => action(PostsActionTypes.CREATE_PENDING);

export const createFulfilled = (data: IPost[]) => action(PostsActionTypes.CREATE_FULFILLED, data);

export const createRejected = (message: string) => action(PostsActionTypes.CREATE_REJECTED, message);
