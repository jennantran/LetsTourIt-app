import config from '../config';

const TokenService = {
    makeBasicAuthToken(user, password) {
        return window.btoa(`${user}:${password}`)
    },
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
    }

export default TokenService;