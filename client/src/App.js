import React, {Component} from 'react'
import Routes from '../src/components/Routes'
import {BrowserRouter as Router} from 'react-router-dom'

import TopNavigation from './components/TopNavigation'
import SideNavigation from './components/SideNavigation'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './index.css'

class App extends Component {

    componentDidMount() {
        document.title = "SLIIT | Student & Instructor management"
    }

    render() {
        return (
            <>
                <Router>
                    <div className="flexible-content">
                        <TopNavigation/>
                        <SideNavigation/>
                        <main id="content" className="p-5">
                            <Routes/>
                        </main>
                        <Footer/>
                    </div>
                </Router>
                <ToastContainer
                    autoClose={3000}
                    position="bottom-right"
                />
            </>
        );
    }
}

export default App
