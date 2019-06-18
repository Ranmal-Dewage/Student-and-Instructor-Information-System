import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/home' component={Home}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/about' component={About}/>
                <Route path='/contact' component={Contact}/>
            </Switch>
        );
    }
}

export default Routes;
