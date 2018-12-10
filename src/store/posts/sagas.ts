import axios from 'axios';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { selectAddPostData } from '../form/selectors';
import { createFulfilled, createRejected, fetchFulfilled, fetchRejected } from './actions';
import { IPost, PostsActionTypes } from './types';

function* handleFetch() {
    try {
        const res = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts');

        if (res.error) {
            yield put(fetchRejected(res.error));
        } else {
            yield put(fetchFulfilled(res.data));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(fetchRejected(error.stack!));
        } else {
            yield put(fetchRejected('Unknown Error'));
        }
    }
}

function* handleCreate() {
    try {
        const data = yield select(selectAddPostData);
        const res = yield call(axios.post, 'https://jsonplaceholder.typicode.com/posts', data);

        if (res.error) {
            yield put(createRejected(res.error));
        } else {
            yield put(createFulfilled(res.data));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(createRejected(error.stack!));
        } else {
            yield put(createRejected('Unknown Error'));
        }
    }
}

function* watchFetchPending() {
    yield takeEvery(PostsActionTypes.FETCH_PENDING, handleFetch);
}

function* watchCreatePending() {
    yield takeEvery(PostsActionTypes.CREATE_PENDING, handleCreate);
}

function* postsSaga() {
    yield all([fork(watchFetchPending), fork(watchCreatePending)]);
}

export default postsSaga;
