import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { all, fork } from 'redux-saga/effects';
import { postsReducer } from './posts/reducer';
import postsSaga from './posts/sagas';
import { IPostsState } from './posts/types';

export interface IApplicationState {
    form: any;
    posts: IPostsState;
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}

export const rootReducer = combineReducers<IApplicationState>({
    form: formReducer,
    posts: postsReducer
});

export function* rootSaga() {
    yield all([fork(postsSaga)]);
}
