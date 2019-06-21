import config from './config.json'

const nodeBaseUrl = config.nodeBaseUrl
const springBaseUrl = config.springBaseUrl

function getToken() {
    const token = "Bearer tojanscasvmsakdnauishdkjsbd" //TODO get from localStorage
    return token
}

export function login(body) {
    return callPost(springBaseUrl + '/login', body);
}

export function register(body) {
    return callPost(springBaseUrl + '/users', body);
}

const callGet = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const callPut = (url, body) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'text/plain',
            'Authorization': getToken()
        })
    }).then(handleres);
}

const callDelete = (url) => {
    return fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'text/plain',
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