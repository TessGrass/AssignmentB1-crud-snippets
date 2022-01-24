import express from 'express'
export const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('dfg')
  res.render('./users/login', { title: 'Login' })
})
