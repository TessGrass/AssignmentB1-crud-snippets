import express from 'express'
import { AccountController } from '../controllers/account-controller.js'
export const router = express.Router()
const accountController = new AccountController()

router.get('/', accountController.authorize, accountController.userIndex)
// accountController.userIndex(req, res, next)
// res.render('users/account')
// accountController.userIndex(req, res, next)
/* router.get('/:id', (req, res, next) => {
  console.log('härhärhär')
  res.render('..views/users/account')
  console.log(req.body)
}) */

/* import express from 'express'
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
}) */
