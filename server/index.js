const express = require("express")
const bodyParser = require('body-parser')

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('cors')())
app.use(express.json())
// /upload下文件都是静态托管
app.use('/upload', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)

app.listen(3000, () => {
  console.log('http://192.168.61.31:3000')
})