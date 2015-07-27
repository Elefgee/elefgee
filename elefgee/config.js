module.exports = {
  MONGO_URI: process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/test'
}
