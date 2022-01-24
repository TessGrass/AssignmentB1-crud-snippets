import express from 'express'
export const router = express.Router()

router.get('/', (req, res, next) => {
  console.log('snippet')
  res.render('./snippets/snippets', { title: 'View Snippets' })
})
