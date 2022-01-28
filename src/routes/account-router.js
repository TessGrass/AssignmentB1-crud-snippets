import express from 'express'
import { AccountController } from '../controllers/account-controller.js'
import { Snippet } from '../models/snippets-model.js'
export const router = express.Router()
const accountController = new AccountController()

router.get('/', accountController.authorize, accountController.userIndex)

router.post('/', (req, res, next) => {
    accountController.createSnippet(req, res, next)
})  

router.post('/update', (req, res, next) => {
  /* console.log(req.body) */
  accountController.updateSnippet(req, res, next)
  /* const data = { title: 'Account' }
    res.redirect('/account')
    res.render('./users/account', { data }) */
})
/* router.get('/update/:id', (req, res, next) => {
    const id = req.params.id
    const result = await Item.findById(id)
    // accountController.updateSnippet(req, res, next)
    console.log(req.body)
  }) */

router.get('/update/:id', async (req, res, next) => {
  const id = req.params.id
  const result = await Snippet.findById(id)
  const data = { name: result, title: 'Update Snippet' }
  res.render('./users/update', { data })
})
