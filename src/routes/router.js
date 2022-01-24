import express from 'express'
// import { router as productsRouter } from './products-router.js'
import { router as homeRouter } from './home-router.js'
export const router = express.Router()

router.use('/', homeRouter)

router.use((req, res) => {
  res.status(404).render('./errors/404', { title: '404' })
})
