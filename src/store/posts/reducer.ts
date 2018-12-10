import { Reducer } from 'redux';
import { IPostsState, PostsActionTypes } from './types';

const initialState: IPostsState = {
    data: [],
    loading: false
};

export const postsReducer: Reducer<IPostsState> = (state = initialState, action) => {
    switch (action.type) {
        case PostsActionTypes.FETCH_PENDING: {
            return { ...state, loading: true };
        }
        case PostsActionTypes.FETCH_FULFILLED: {
            return { ...state, loading: false, data: action.payload };
        }
        case PostsActionTypes.FETCH_REJECTED: {
            return { ...state, loading: false, error: action.error };
        }
        case PostsActionTypes.CREATE_PENDING: {
            return { ...state, loading: true };
        }
        case PostsActionTypes.CREATE_FULFILLED: {
            return { ...state, loading: false, data: [action.payload, ...state.data] };
        }
        case PostsActionTypes.CREATE_REJECTED: {
            return { ...state, loading: false, error: action.error };
        }
        default: {
            return state;
        }
    }
};
