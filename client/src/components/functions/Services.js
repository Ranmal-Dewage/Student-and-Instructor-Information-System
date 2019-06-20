import config from './config.json'

const baseUrl = config.baseUrl

export function login(body, token) {
    return callPost(baseUrl + '/login', body, token);
}

export function register(body, token) {
    return callPost(baseUrl + '/register', body, token);
}

const callGet = (url, token) => {
    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': token
        })
    }).then(handleres);
}

const callPost = (url, body, token) => {
    console.log(token)
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': token
        })
    }).then(handleres);
}

const callPut = (url, body, token) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': token
        })
    }).then(handleres);
}

const callDelete = (url, token) => {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': token
        })
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        if (res.status === 404) {
            return Promise.reject();
        } else {
            throw res.json();
        }
    }
}