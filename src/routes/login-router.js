import express from 'express'
import { LoginController } from '../controllers/login-controller.js'
import csurf from 'csurf'
export const router = express.Router()
const loginController = new LoginController()

router.get('/', csurf(), loginController.renderLoginPage)
/* router.get('/', csurf(), (req, res, next) => {
  loginController.renderLoginPage(req, res, next) */
/* const csrfToken = { token: req.csrfToken() }
  console.log(csrfToken)
  const data = { login: req.session.username }
  console.log(req.session)
  res.render('./users/login', { data, csrfToken }) */
/* }) */
router.post('/', (req, res, next) => {
  loginController.authenticateAUser(req, res, next)
})
