import express from 'express'
import { AccountController } from '../controllers/account-controller.js'
export const router = express.Router()
const accountController = new AccountController()

router.get('/', accountController.authorize, accountController.userIndex)

router.post('/', (req, res, next) => {
  console.log('här')
  console.log(req.body)
  accountController.createSnippet(req, res, next)
  /* const data = { title: 'Account' }
    res.redirect('/account')
    res.render('./users/account', { data }) */
})

/* router.get('/:id/update', (req, res, next) => {
    console.log('tetst')
    const data = { login: req.session.username, title: 'Update' }
    res.render('./', { data })
  }) */
  
 /*  try {
    router.get('/update/:id', async (req, res, next) => {
      const id = req.params.id
      const result = await Item.findById(id)
      res.render('update', { name: result, title: 'Update' })
    })
  } catch (err) {
    next(err)
  } */


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
