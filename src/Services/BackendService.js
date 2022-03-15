import axios from "axios";

let token = ''
if(localStorage.getItem('user')){
    let userStorage = localStorage.getItem('user')
    let userStorageJSON = JSON.parse(userStorage)
    token = userStorageJSON['token']
}else{
    token = ''
}

const backendService = axios.create({
  baseURL: "http://project-camping.local/api/",
  // baseURL: "https://camping.ajkit.com/api/",
  withCredentials: true,
  // headers คือ ข้อมูลเพิ่มเติมที่เราต้องการส่งไปพร้อมกับ Request Header
  headers: {
    "Content-type": "application/json", // Content-type เป็นการกำหนดชนิดของข้อมูลที่จะส่งไปให้ server
    "Accept": "application/json", // accept คือ การระบุรูปแบบของข้อมูล
    "Authorization" : `Bearer ${token}`
  },
});

export default backendService;
