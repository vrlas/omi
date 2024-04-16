const express = require('express')
const app = express()

const status = false

app.get('/status', () => {
  return res.json({ status })
})

app.get('/change', (req) => {
  status = req.query.status || false
  return res.send('success')
})

app.listen(2233, () => {
  console.log('2233项目启动')
})