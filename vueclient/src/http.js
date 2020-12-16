import axios from 'axios'

const http = axios.create({
    baseURL: 'http://192.168.61.31:3000/admin/api',

})

export default http