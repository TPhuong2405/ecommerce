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

// app.use(cors({
//     origin: 'http://localhost:3000', process.env.CLIENT_URL
//     credentials: true // 👈 Quan trọng để gửi cookie
// })); 

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

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