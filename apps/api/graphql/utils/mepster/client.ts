import axios from 'axios';
import { GORSE_URL } from '../../config';

const recommenderClient = axios.create({
    baseURL: GORSE_URL,
});

export default recommenderClient;
