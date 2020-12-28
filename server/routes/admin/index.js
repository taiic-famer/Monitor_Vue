module.exports = app => {
  const express = require('express')

  const router = express.Router({
    mergeParams: true
  }) // 子路由

  router.post('/', async (req, res) => {

    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({ success: true })
  })

  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find()
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require("inflection").classify(req.params.resource)//转类名，首字母大写，复数变单数，找到model对应的文件
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // const multer = require('multer')
  // // const fs = require('fs');
  // // const path = require('path');
  // const upload = multer({
  //   dest: __dirname + '/../../uploads',
  //   limits: {
  //     fieldSize: 10 * 1000 * 1000 * 1000
  //   }
  // })

  // // 允许接口接收上传文件
  // app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
  //   const file = req.file

  //   file.url = `http://192.168.61.31:3000/upload/${file.filename}`
  //   res.send(file)

  // })

}
