import mongoose from 'mongoose'
const Schema = mongoose.Schema

const snippetSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
}, { timestamps: true })

/**
 * Controls the user authorize process.
 *
 * @param {string} id - the snippet Id from req.param.
 * @param {string} bodyid - the snippet Id from req.body.
 * @param {string} username  - the name of the user that is trying to access the content.
 * @returns {object} - the snippet matching the id.
 */
snippetSchema.statics.authorizeUser = async function (id, bodyid, username) {
  if (id !== undefined) {
    const snippet = await Snippet.findById(id)
    if (snippet.author !== username) {
      throw new Error('You cant access this content')
    } else {
      return snippet
    }
  } if (id === undefined) {
    const snippet = await Snippet.findById(bodyid)
    if (snippet.author !== username) {
      throw new Error('You cant access this content')
    } else {
      return snippet
    }
  }
  /* const snippet = await Snippet.findById(id)
  if (snippet.author !== username) {
    throw new Error('You cant access this content') */
}
/* return snippet
} */

export const Snippet = mongoose.model('Snippet', snippetSchema)
