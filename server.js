const express = require('express');
const path = require('path');

const app = express();

// load staic servring middleware

app.use(express.static(path.join(process.cwd(), 'build')))

app.use(function (req, res, next) {
  res.sendFile(path.join(process.cwd() + '/build/index.html'))
})

app.listen(process.env.PORT || 8080, function (err, done) {
  if (!err) {
    console.log('server listening at port 9999')
  }
})
