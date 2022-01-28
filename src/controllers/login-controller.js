import { User } from '../models/user-model.js'
import session from 'express-session'

/**
 *
 */
export class LoginController {
/**
 * Handles the user login attempt.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express respons object.
 * @param {object} next - Express next middleware function.
 */
  async loginUser (req, res, next) {
    try {
      const loginUser = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate((error) => {
        if (error) {
          throw new Error('Failed to re-generate session')
        }
      })

      req.session.value = req.session.id
      req.session.username = loginUser.username

     /*  console.log('req.session.name')
      console.log(req.session.value)
      console.log(req.session.username) */

      res.redirect('./account')
    } catch (error) {
      console.log('errrrrrrrrr')
      console.log(error)
      req.session.flash = { type: 'danger', text: 'Login failed. Please try again.' }
      res.redirect('./login')
    }
  }
}
