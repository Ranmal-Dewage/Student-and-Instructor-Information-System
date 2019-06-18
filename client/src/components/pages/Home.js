import React from 'react';
import BreadcrumSection from './sections/BreadcrumSection';
import HomeBody from './sections/HomeBody';

export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BreadcrumSection/>
                <HomeBody/>
            </React.Fragment>
        )
    }
}