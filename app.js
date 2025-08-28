
const express = require('express');
const app = express()
const mongoose=require('mongoose')
const clerkWebhooks = require('./controllers/webhooks')


app.post("/webhooks", clerkWebhooks)
mongoose.connect(process.env.mongoUrl).then(() => {
app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`)
})
})
.catch(err=> {
  console.log(err)
})
