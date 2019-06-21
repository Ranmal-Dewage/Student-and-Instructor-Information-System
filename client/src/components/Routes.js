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
        var user = localStorage.getItem('sis-user')
        if (user) {
            user = JSON.parse(user)
        }
        return (
            <Switch>
                {/*any user*/}
                <Route exact path='/' component={Home}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/contact' component={Contact}/>
                <Route exact path='/register' component={Register}/>

                {/*admin*/}
                {user && user.permissionLevel === 3 &&
                <Route exact path='/admin/facultyManagement' component={FacultyManagement}/>}
                {user && user.permissionLevel === 3 &&
                <Route exact path='/admin/lecturerManagement' component={LecturerManagement}/>}


                {/*instructor, admin*/}
                {user && (user.permissionLevel === 1 || user.permissionLevel === 3) &&
                <Route exact path='/courses/:id/edit' component={CourseEdit}/>}

                {/*instructor , student, admin*/}
                {user && 1 <= user.permissionLevel <= 3 &&
                <Route exact path='/profile' component={Profile}/>}
                {user && 1 <= user.permissionLevel <= 3 &&
                <Route exact path='/degree/:id/courses' component={CourseList}/>}
                {user && 1 <= user.permissionLevel <= 3 &&
                <Route exact path='/courses/search' component={SearchCourse}/>}
                {user && 1 <= user.permissionLevel <= 3 &&
                <Route exact path='/courses/:id/view' component={CourseView}/>}
                {user && 1 <= user.permissionLevel <= 3 &&
                <Route exact path='/faculties/:id/degrees' component={DegreeList}/>}

                <Route component={NotFoundPage}/>
            </Switch>
        );
    }
}

export default Routes;
