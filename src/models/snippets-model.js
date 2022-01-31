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
  }
}, { timestamps: true })

snippetSchema.statics.authorizeUser = async function (id, username) {
  console.log('hähäh')
  const snippet = await Snippet.findById(id)
  console.log(snippet)
  if (snippet.author !== username) {
    throw new Error('You cant access this content')
  }
  return snippet
}

export const Snippet = mongoose.model('Snippet', snippetSchema)
