module.exports = {
    authenticator: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('warning_msg', '請先登入才能使用！')
        res.redirect('/users/login')
    }
}

//匯出一個authenticator函式
//函示會利用Passport.js提供的函示req.isAuthenticated()判斷 T OR F
//若T則往下一步