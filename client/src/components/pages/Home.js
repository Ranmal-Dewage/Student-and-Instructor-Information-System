import React from 'react';
import BreadcrumSection from './sections/BreadcrumSection';
import ChartSection1 from './sections/ChartSection1';

export default class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BreadcrumSection/>
                <ChartSection1/>
            </React.Fragment>
        )
    }
}