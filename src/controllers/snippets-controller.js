import { Snippet } from '../models/snippets-model.js'
/**
 * Controls the snippets; creates, updates and deletes.
 *
 */
export class SnippetController {
/**
 * Fetches the Snippets from the database.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

  async viewSnippets (req, res, next) {
    try {
      const data = { login: req.session.username }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        id: obj._id,
        body: obj.body
      }))
      res.render('../views/snippets/snippets', { snippet, data }) // render to snippets
    } catch (error) {
      next(error)
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async createSnippet (req, res, next) {
    try {
      const snippet = new Snippet({
        title: req.body.name,
        body: req.body.usersnippet
      })
      await snippet.save()
      req.session.flash = {
        type: 'success', text: 'The snippet was created successfully!'
      }
      await res.redirect('/snippets')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }
}
