import axios from 'axios';
require('dotenv').config()

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: process.env.REACT_APP_HEROKU_URL,
            withCredentials: true
        });
        this.service = service;
    }

    signup = (username, password)  => {
        return this.service.post('api/signup', { username, password})
            .then((response) => {
                return response.data;
            });
    }

    loggedin = () => {
        return this.service.get('api/loggedin')
            .then((response) => {
                return response.data;
            });
    }

    logout = () => {
        return this.service.post('api/logout')
            .then((response) => {
                return response.data;
            });
    }

    login = (username, password)  => {
        return this.service.post('api/login', { username, password})
            .then(response => response.data);
    }
}

export default AuthService;