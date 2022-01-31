import express from 'express'
import { AccountController } from '../controllers/account-controller.js'
import { Snippet } from '../models/snippets-model.js'
export const router = express.Router()
const accountController = new AccountController()

router.get('/', accountController.authorize, accountController.userIndex)
router.post('/', accountController.authorize, accountController.createSnippet)
router.post('/update', accountController.authorize, accountController.updateSnippet)
router.post('/delete', (req, res, next) => {
    console.log('delete me delete my body')
  console.log(req.body)
  accountController.deleteSnippet(req, res, next)
})
// router.post('/delete', accountController.authorize, accountController.deleteSnippets)

router.get('/update/:id', accountController.authorize, accountController.renderUpdate)


/* router.get('/update/:id', async (req, res, next) => {
  accountController.authorize()
  const id = req.params.id
  const result = await Snippet.findById(id)
  const data = { name: result, title: 'Update Snippet' }
  res.render('./users/update', { data })
}) */
