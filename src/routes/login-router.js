import express from 'express'
import { SnippetController } from '../controllers/snippets-controller.js'
export const router = express.Router()
const snippetController = new SnippetController()

router.get('/', (req, res, next) => {
  res.render('./users/login', { title: 'Login' })
})

router.post('/', (req, res, next) => {
  console.log('login')
  console.log(req.body)
  snippetController.createSnippet(req, res, next)
})
