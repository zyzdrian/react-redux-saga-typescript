import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../../containers/Home';
import AddPost from '../AddPost';
import Menu from '../Menu';
import styles from './App.scss';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Menu />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/add-post' component={AddPost} />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
