import config from './config.json'

const nodeBaseUrl = config.nodeBaseUrl
const springBaseUrl = config.springBaseUrl

function getToken() {
    var user = localStorage.getItem('sis-user')
    if (user) {
        user = JSON.parse(user)
        return user.token
    }
    return null
}

export function getFaculties() {
    return callGet(nodeBaseUrl + '/faculties/');
}

export function searchCourse(name) {
    return callGet(nodeBaseUrl + '/courses/' + name);
}

export function getDegrees(id) {
    return callGet(nodeBaseUrl + '/faculties/' + id + '/degrees');
}

export function courseByDegree(query) {
    return callGet(nodeBaseUrl + '/courses?' + query);
}

export function login(body) {
    return fetch(springBaseUrl + '/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(handleres);
}

export function register(body) {
    return fetch(springBaseUrl + '/users', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(handleres);
}

const callGet = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const callPut = (url, body) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const callDelete = (url) => {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject();
    }
}