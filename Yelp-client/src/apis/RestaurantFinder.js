import axios from "axios";

// NODE_ENV
// neu o production thi url la api/v1/restaurants con khong thi mac dinh url
/* const baseURL = process.env.NODE_ENV === 'production' ? "http://172.28.98.148:32677/api/v1/restaurants/" : "http://172.28.98.148:32677/api/v1/restaurants/" */
const baseURL = ('http://172.25.212.10:32677/api/v1/restaurants/')


export default axios.create({
    baseURL: baseURL,

});
/* export default axios.create({
    baseURL: `http://172.25.212.10:32677/api/v1/restaurants/`

}); */