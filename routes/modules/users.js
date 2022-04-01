const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (res, req) => {
    req.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    User.findOne({ email }).then(user => {
        if (user) {
            console.log('User email is already exist')
            res.render('register', { name, email, password, confirmPassword }) //使用者已存在，重新回到註冊頁面，且保有使用者輸入資料
        } else {
            return User.create({
                    name,
                    email,
                    password
                })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        }
    })
})


module.exports = router