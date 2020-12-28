const express = require("express")
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const fse = require('fs-extra')
const path = require('path')
const fs = require('fs')
const app = express()




app.use(require('cors')())
app.use(express.json())
// /upload下文件都是静态托管
app.use('/upload', express.static(__dirname + '/uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const UPLOAD_DIR = path.resolve(__dirname, 'uploads/temp')
app.post('/upload', function (req, res) {
  const form = new multiparty.Form({ uploadDir: __dirname+'/uploads' })
  form.parse(req);
  form.on('file', async(name, chunk) => { 
    // 存放切片目录
    let chunkDir = `${UPLOAD_DIR}/${chunk.originalFilename.split('.')[0]}`
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }

    var dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1])

    await fse.move(chunk.path, dPath, { overwrite: true })
    res.send('文件上传成功')
   })
  
})

app.post('/merge', async function (req, res) {
  let name = req.body.name;
  let fname = name.split('.')[0];

  let chunkDir = path.join(UPLOAD_DIR, fname);
  let chunks = await fse.readdir(chunkDir);

  chunks.sort((a, b) => a - b).map(chunkPath => {
    // 合并文件
    fs.appendFileSync(
      path.join(UPLOAD_DIR, name),
      fs.readFileSync(`${chunkDir}/${chunkPath}`)
    )
  })
  fse.removeSync(chunkDir)
  res.send({msg: '合并成功', url:`http://192.168.61.31:3000/upload/temp/${name}`})
})

require('./plugins/db')(app)
require('./routes/admin/index')(app)


app.listen(3000, () => {
  console.log('http://192.168.61.31:3000')
})