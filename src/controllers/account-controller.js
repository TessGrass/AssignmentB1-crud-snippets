import { Snippet } from '../models/snippets-model.js'
/**
 * Controls the authorize and authenticate process after login.
 */
export class AccountController {
  /**
   * Checks if the user exists and the password matches.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  authenticateUser (req, res, next) {
    if (req.session.username) {
      next()
    } else if (!req.session.username) {
      const error = new Error('PageNotFound')
      error.status = 404
      next(error)
      /* req.session.flash = {
        type: 'danger',
        text: 'Please login before trying to access this content.'
      }
      res.redirect('./') */
    }
  }

  /**
   * Checks if user has permission to access a certain content.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async authorizeUser (req, res, next) {
    try {
      await Snippet.authorizeUser(req.params.id, req.body.id, req.session.username)

      next()
    } catch (error) {
      error.status = 403
      next(error)
    }
  }

  /**
   * Checks if user has permission to access a certain content.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async userAccount (req, res, next) {
    try {
      const csrfToken = { token: req.csrfToken() }
      const data = { login: req.session.username, title: 'Account' }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        body: obj.body,
        id: obj._id,
        author: obj.author
      }))
      res.render('../views/users/account', { snippet, data, csrfToken })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render the authorized user snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async viewUserSnippets (req, res, next) {
    try {
      const data = { login: req.session.username }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        body: obj.body,
        author: obj.author
      }))
      res.render('../views/users/account', { snippet, data }) // render to snippets
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async createSnippet (req, res, next) {
    try {
      const createSnippet = new Snippet({
        title: req.body.name,
        body: req.body.usersnippet,
        author: req.body.authorname,
        language: req.body.language
      })
      await createSnippet.save()
      req.session.flash = {
        type: 'success', text: 'The snippet was created successfully!'
      }
      res.render('../views/users/account', { createSnippet })
      res.redirect('./account')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }

  /**
   * Update a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async updateSnippet (req, res, next) {
    try {
      const snippet = await Snippet.findById(req.body.id)
      if (snippet) {
        snippet.title = req.body.title
        snippet.body = req.body.body
        snippet.author = req.body.author
        await snippet.save()
      }
      req.session.flash = {
        type: 'success', text: 'The snippet was updated successfully.'
      }
      await res.render('./users/account')
      await res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }

  /**
   * Render a view for the snippet that want's to be updated.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   */
  async renderUpdate (req, res, next) {
    const id = req.params.id
    const result = await Snippet.findById(id)
    const data = { name: result }
    const csrfToken = { token: req.csrfToken() }
    res.render('./users/update', { data, csrfToken })
  }

  /**
   * Deletes the chosen snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {object} next - Express next middleware function.
   */
  async deleteSnippet (req, res, next) {
    try {
      await Snippet.findByIdAndDelete(req.body.id)
      req.session.flash = {
        type: 'success', text: 'The snippet was deleted successfully.'
      }
      await res.redirect('./')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }
}
