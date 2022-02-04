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
