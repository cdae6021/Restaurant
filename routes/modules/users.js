const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
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
    failureRedirect: '/users/login',
    failureMessage: true,
    failureFlash: true
}))

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!email || !password || !confirmPassword) {
        errors.push({ message: '信箱與密碼為必填。' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符!' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    User.findOne({ email }).then(user => {
        if (user) {
            errors.push({ message: '這個 Email 已經註冊過了。' })
            res.render('register', { errors, name, email, password, confirmPassword }) //使用者已存在，重新回到註冊頁面，且保有使用者輸入資料
        }
        return bcrypt
            .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
            .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
            .then(hash => User.create({
                name,
                email,
                password: hash // 用雜湊值取代原本的使用者密碼
            }))
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
    })
})

router.get('/logout', (req, res) => {
    req.logout() // Passport.js 提供的函式，會幫你清除 session
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

module.exports = router