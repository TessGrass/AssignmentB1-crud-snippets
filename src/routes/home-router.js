import express from 'express'
export const router = express.Router()

router.get('/', (req, res, next) => {
  console.log(req.session.username)
  const data = { login: req.session.username, title: 'Startpage' }
  res.render('./home/index', { data })
})
