import axios from 'axios';
const instance = axios.create({
    baseURL:'https://burgerapp-b4709.firebaseio.com/'
});
export default instance;