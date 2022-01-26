import express from 'express'
import { SnippetController } from '../controllers/snippets-controller.js'
export const router = express.Router()
const snippetController = new SnippetController()

router.get('/', (req, res, next) => {
  // res.render('../views/snippets/snippets', { title: 'View Snippets' })
  snippetController.viewSnippets(req, res, next)
})

/* router.get('/', (req, res, next) => {
    console.log('test')
  console.log(req.body)
  snippetController.viewSnippets(req, res, next)
}) */
// res.render('./snippets/snippets', { title: 'View Snippets' }
