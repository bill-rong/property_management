import {getLocalData, removeLocalData, setLocalData} from "./cache";

const TOKEN_KEY = 'property-jwt-token'
const USER_INFO_KEY = 'property-user-info'

export function getToken() {
    return getLocalData(TOKEN_KEY)
}

export function setToken(token) {
    setLocalData(TOKEN_KEY, token)
}

export function removeToken() {
    removeLocalData(TOKEN_KEY)
}

export function getUserInfo() {
    let userInfoStr = getLocalData(USER_INFO_KEY)
    if (userInfoStr) {
        return JSON.parse(userInfoStr)
    }
    return null
}

export function setUserInfo(userInfo) {
    setLocalData(USER_INFO_KEY, JSON.stringify(userInfo))
}

export function removeUserInfo() {
    removeLocalData(USER_INFO_KEY)
}
