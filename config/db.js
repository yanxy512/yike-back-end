var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost:27017', { useUnifiedTopology: true, useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info('链接成功')
});

module.exports = db;