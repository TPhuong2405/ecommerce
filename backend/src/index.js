const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); // Thêm dòng này
const routes = require('./routes'); // Đảm bảo rằng bạn đã tạo file routes.js
const cors = require('cors'); // Thêm dòng này
const bodyParser = require('body-parser'); // Thêm dòng này
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
const port = process.env.PORT || 3001

app.use(cors({
    origin: 'http://localhost:3000', // Đúng origin frontend bạn đang dùng (React, v.v.)
    credentials: true // 👈 Quan trọng để gửi cookie
})); 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('connect DB success!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running on port: ', + port);
})