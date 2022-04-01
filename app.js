const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const methodOverrride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        selected: function(option, value) {
            if (option === value) {
                return "selected";
            } else {
                return "";
            }
        },
    },
}))

app.set('view engine', 'handlebars')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverrride('_method'))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated() //將此兩個req傳到res.local，如此一來便能供前端樣板使用
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

app.use(routes)


app.listen(port, () => {
    console.log(`success , http:/localhost:${port}`)
})