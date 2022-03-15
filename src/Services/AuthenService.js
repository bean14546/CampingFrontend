import axios from "axios";

const authenService = axios.create({
  baseURL: "http://project-camping.local/api/",
  // baseURL: "https://camping.ajkit.com/api/",
  
  withCredentials: true,
  // headers คือ ข้อมูลเพิ่มเติมที่เราต้องการส่งไปพร้อมกับ Request Header
  headers: {
    "Content-type": "application/json", // Content-type เป็นการกำหนดชนิดของข้อมูลที่จะส่งไปให้ server
    "Accept": "application/json", // accept คือ การระบุรูปแบบของข้อมูล
  },
});

export default authenService;
