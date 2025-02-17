require('dotenv').config();
const express=require('express');
const connectDB = require('./config/db');
const authrouter=require('./routes/auth');
const bodyparser=require('body-parser');
const authenticateToken=require('./middleware/is-Auth');
const multer=require('multer');
const postRoute=require('./routes/posts');
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");


const app=express();
// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();
const fileStorage= multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,'uploads/');
    }
    ,
    filename:(req,file,cb)=>{
        cb(null,Date.now + '-'+file.originalname);
     }

});

const filefilter=(req,file,cb)=>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(null, false);
      }
};


app.use(bodyparser.json());
app.use(multer({ storage: fileStorage, fileFilter:filefilter }).single('image'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/api/posts',postRoute);
app.use('/api/auth',authrouter);
// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const data = error.data;
    const message = error.message;
    res.status(status).json({
      message: message,
      data: data
    });
  });
  app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the protected route, user ' + req.userId });
});


app.listen(3000,()=>{
    console.log('server is starting running now ');
    console.log("Swagger UI available at http://localhost:3000/api-docs");
})