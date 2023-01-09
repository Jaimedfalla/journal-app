import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-project-40fb7-default-rtdb.firebaseio.com'
})

export default journalApi;