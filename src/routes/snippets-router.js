import express from 'express'
import { SnippetController } from '../controllers/snippets-controller.js'
export const router = express.Router()
const snippetController = new SnippetController()

router.get('/', (req, res, next) => {
  snippetController.viewSnippets(req, res, next)
})
