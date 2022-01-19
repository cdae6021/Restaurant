const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverrride = require('method-override')

const routes = require('./routes/index')
require('./config/mongoose')

const app = express()
const port = 3000



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverrride('_method'))

app.use(routes)




app.listen(port, () => {
    console.log(`success , http:/localhost:${port}`)
})