import { Snippet } from '../models/snippets-model.js'
/**
 * Controls the snippet view.
 *
 */
export class SnippetController {
/**
 * Fetches the snippets from the database.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express respons object.
 * @param {Function} next - Express next middleware function.
 */
  async viewSnippets (req, res, next) {
    try {
      const data = { login: req.session.username }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        id: obj._id,
        body: obj.body,
        author: obj.author,
        language: obj.language
      }))
      res.render('../views/snippets/snippets', { snippet, data }) // render to snippets
    } catch (error) {
      next(error)
    }
  }
}
