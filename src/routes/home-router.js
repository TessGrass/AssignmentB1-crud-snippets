import express from 'express'
import logger from 'morgan'
export const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('hej')
  res.render('./home/index', { title: 'Startpage' })
})
