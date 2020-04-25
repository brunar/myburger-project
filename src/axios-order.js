import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-react-ea3fc.firebaseio.com/',
});

export default instance;