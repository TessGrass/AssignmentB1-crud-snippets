import express from 'express'
import { AccountController } from '../controllers/account-controller.js'
import csurf from 'csurf'
export const router = express.Router()
const accountController = new AccountController()

router.get('/', csurf(), accountController.CheckForSessionUserName, accountController.userAccount)
router.post('/', accountController.CheckForSessionUserName, accountController.createSnippet)
router.post('/update', accountController.CheckForSessionUserName, accountController.updateSnippet)
router.post('/delete', accountController.CheckForSessionUserName, accountController.authorizeUser, accountController.deleteSnippet)
router.get('/update/:id', csurf(), accountController.CheckForSessionUserName, accountController.authorizeUser, accountController.renderUpdate)
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
