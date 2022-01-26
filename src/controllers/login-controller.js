import { User } from '../models/user-model.js'
import session from 'express-session'

/**
 *
 */
export class LoginController {
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
  async loginUser (req, res, next) {
    try {
      const loginUser = await User.authenticate(req.body.username, req.body.password)
      console.log(req.body.username)
      req.session.regenerate((error) => {
        if (error) {
          throw new Error('Failed to re-generate session')
        }
      })

      req.session.value = req.session.id
      req.session.username = loginUser.username

      // res.render('../views/users/account')
      res.redirect('./account')
    } catch (error) {
      console.log(error)
      req.session.flash = { type: 'danger', text: 'Login failed. Please try again.' }
    }
  }
}
