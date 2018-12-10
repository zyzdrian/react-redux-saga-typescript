export type ApiResponse = Record<string, any>;

export interface IPost extends ApiResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IPostsState {
    readonly loading: boolean;
    readonly data: IPost[];
    readonly error?: string;
}

export const PostsActionTypes = {
    CREATE_FULFILLED: '@@post/CREATE_FULFILLED',
    CREATE_PENDING: '@@posts/CREATE_PENDING',
    CREATE_REJECTED: '@@post/CREATE_REJECTED',
    FETCH_FULFILLED: '@@post/FETCH_FULFILLED',
    FETCH_PENDING: '@@posts/FETCH_PENDING',
    FETCH_REJECTED: '@@post/FETCH_REJECTED'
};
