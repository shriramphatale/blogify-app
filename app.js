const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const Blog = require('./models/blog')

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const { checkForAuthenticationCookie } = require('./middlewares/authentication')

const app = express()
const PORT = process.env.PORT || 8000

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve("./public")))

app.get('/',async (req,res)=>{
    // const allBlogs = await Blog.find({}).sort({ createdAt: -1 })
    // res.render('home',{user: req.user, blogs: allBlogs})
    res.send("Heloo world")
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)
console.log("ENV PORT:", process.env.PORT);

app.listen(PORT, '0.0.0.0', () => { 
    console.log(`Server started at ${PORT}`); 
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('MongoDB Connection Error:', err);
    });
