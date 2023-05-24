const express = require('express')
const dbConnect = require("./config/database")
require("dotenv").config();
const cors = require('cors')
const cookieParser = require("cookie-parser")
const userRouter = require("./routers/userRoutes");
const productRouter = require("./routers/productRoutes.js")
const imageUploadRouter = require("./routers/fileUpload")
const port = process.env.PORT;
const fileupload = require("express-fileupload")
const cloudinary = require("./config/cloudinary")

const app = express();

dbConnect()
cloudinary.cloudinaryConnect();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}))

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/upload", imageUploadRouter)


app.listen(port, () => {
    console.log(`Server is running at port on ${port}`)
})


// Lakshay Kalra12:02 PM
// For (let i = 0 ; i <= 10 ; i++){
// console.log(i);
// }
// For (let i = 10 ; i >= 0 ; I- -){
// console.log(i);
// }
// For (let i = 0 ; i <= 10 ; i++){
//   For (let j = 10 ; j >= 0 ; j- -){
//     console.log(i,j);
//   }
// }
// Lakshay Kalra12:05 PM
// For (let i = 0 ; i <= 10 ; i++){
//   For (let j = 10 ; j >= 0 ; j- -){
//     break;
//     console.log(i,j);
//   }
// }
// 
// -------------------------------------
//   
//  For (let i = 0 ; i <= 10 ; i++){
//   For (let j = 10 ; j >= 0 ; j- -){
//     continue;
//      console.log(i,j);
//   }
// }
// Lakshay Kalra12:07 PM
// Function abc(){
//     For (let i = 0 ; i <= 10 ; i++){
//       For (let j = 10 ; j >= 0 ; j - -){
//        Return i-j;
//       console.log(i,j);
//       }
//     }
// }
// console.log(abc());
// Lakshay Kalra12:09 PM
// let abc= {"abc" :!23}
// [{"abc":133}]
// Lakshay Kalra12:10 PM
// let a = 3;
// let b = {
//   ? : "def"
// }
// what will replace ‘?’  ?  
// output - { 3 : "def" }
// Lakshay Kalra12:14 PM
// {
// [a]:"def"
// }
// b[a]
// b.a
// ""
// Stringfy