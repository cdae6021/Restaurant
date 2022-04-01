const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverrride = require('method-override')

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
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(methodOverrride('_method'))

app.use(routes)


app.listen(port, () => {
    console.log(`success , http:/localhost:${port}`)
})