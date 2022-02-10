import express from 'express'
export const router = express.Router()

router.get('/', (req, res) => {
  const data = { login: req.session.username }
  res.render('./home/index', { data })
})
