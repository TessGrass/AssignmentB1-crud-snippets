import express from 'express'
import { AccountController } from '../controllers/account-controller.js'
import csurf from 'csurf'
// import { Snippet } from '../models/snippets-model.js'
export const router = express.Router()
const accountController = new AccountController()

router.get('/', csurf(), accountController.authenticateUser, accountController.userAccount)
router.post('/', accountController.authenticateUser, accountController.createSnippet)
router.post('/update', accountController.authenticateUser, accountController.updateSnippet)
router.post('/delete', accountController.authenticateUser, accountController.deleteSnippet)
router.get('/update/:id', csurf(), accountController.authenticateUser, accountController.authorizeUser, accountController.renderUpdate)
/* router.post('/delete', (req, res, next) => {
  accountController.deleteSnippet(req, res, next)
}) */

/* router.get('/update/:id', async (req, res, next) => {
  accountController.authorize()
  const id = req.params.id
  const result = await Snippet.findById(id)
  const data = { name: result, title: 'Update Snippet' }
  res.render('./users/update', { data })
}) */
