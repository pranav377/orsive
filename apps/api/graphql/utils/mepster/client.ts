import axios from "axios";

const recommenderClient = axios.create({
  baseURL: process.env.GORSE_URL,
});

export default recommenderClient;
