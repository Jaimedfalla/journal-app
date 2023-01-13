import axios from "axios";

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params:{
        key:'AIzaSyB8v20COl0P0hZRgZ2Leys9b563Y_57aCw'
    }
})

export default authApi;