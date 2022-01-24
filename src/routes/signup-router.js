import express from 'express'
export const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('./users/signup', { title: 'Sign-up' })
})
