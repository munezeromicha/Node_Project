const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000
const app = express();
const userRouter = require('./routes/userRouter');


mongoose.connect('mongodb://localhost:27017/auth-app')
.then(res => console.log(`mongodb connected from ${res.connection.host}`))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'welcome to my api'
    })
});

app.use('/', userRouter);

app.listen(PORT, () => console.log(`server started on post ${PORT}`))