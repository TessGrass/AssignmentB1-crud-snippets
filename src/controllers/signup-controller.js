import { User } from '../models/user-model.js'

/**
 * Controls the sing-up process.
 */
export class SignUpController {
/**
 * Render the sign-up page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express respons object.
 */
  renderSignUpPage (req, res) {
    const csrfToken = { token: req.csrfToken() }
    const data = { login: req.session.username }
    res.render('./users/signup', { data, csrfToken })
  }

  /**
   * Creates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {object} next - Express next middleware function.
   */
  async createUser (req, res, next) {
    try {
      const createUser = new User({
        username: req.body.username,
        password: req.body.password
      })

      await createUser.save()
      req.session.flash = {
        type: 'success', text: 'The account was created successfully!'
      }
      res.redirect('/login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'The username is already taken. Please try again.' }
      res.redirect('/signup')
    }
  }
}
