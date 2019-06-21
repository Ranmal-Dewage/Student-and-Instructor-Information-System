import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import SearchCourse from './pages/SearchCourse'
import CourseView from './pages/CourseView'
import CourseEdit from './pages/CourseEdit'
import DegreeList from './pages/DegreeList'
import CourseList from './pages/CourseList'
import NotFoundPage from './pages/NotFoundPage'
import FacultyManagement from './admin/FacultyManagement'
import LecturerManagement from './admin/LecturerManagement'

class Routes extends React.Component {
    render() {
        return (
            <Switch>

                {/*any user*/}
                <Route exact path='/' component={Home}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/contact' component={Contact}/>
                <Route exact path='/register' component={Register}/>

                {/*admin*/}
                <Route exact path='/admin/facultyManagement' component={FacultyManagement}/>
                <Route exact path='/admin/lecturerManagement' component={LecturerManagement}/>

                {/*instructor, admin*/}
                <Route exact path='/courses/:id/edit' component={CourseEdit}/>

                {/*instructor , student, admin*/}
                <Route exact path='/profile' component={Profile}/>
                <Route exact path='/degree/:id/courses' component={CourseList}/>
                <Route exact path='/courses/search' component={SearchCourse}/>
                <Route exact path='/courses/:id/view' component={CourseView}/>
                <Route exact path='/faculties/:id/degrees' component={DegreeList}/>

                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}

export default Routes;
