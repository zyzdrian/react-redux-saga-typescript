import React from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './configureStore';

// const client = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com/todos/1'
// });

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
