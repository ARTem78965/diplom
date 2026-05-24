import axios from 'axios'

const constFlaskURL = axios.create(
    {
        baseURL: 'http://localhost:5000',
        withCredentials: true,
    }
);

export default constFlaskURL