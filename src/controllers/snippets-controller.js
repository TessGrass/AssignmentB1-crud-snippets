import { Snippet } from '../models/snippets.js'
/**
 * Controls the snippets; creates, updates and deletes.
 *
 */
export class SnippetController {
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async viewSnippets (req, res, next) {
    try {
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        id: obj._id,
        body: obj.body
      }))
      res.render('../views/snippets/snippets', { snippet }) // render to snippets
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
        type: 'success', text: 'The item was updated successfully.'
      }
      await res.redirect('/snippets')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }
}
