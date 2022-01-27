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
}, { timestamps: true }) // optional

export const Snippet = mongoose.model('Snippet', snippetSchema)
