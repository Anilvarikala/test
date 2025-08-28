
const express = require('express');
const app = express()
const mongoose=require('mongoose')
const clerkWebhooks = require('./controllers/webhooks')
const mongoUrl = "mongodb+srv://Anil:Joymax%40123@anil.l5zcbng.mongodb.net/test"

app.post("/webhooks", clerkWebhooks)
mongoose.connect(mongoUrl).then(() => {
app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`)
})
})
.catch(err=> {
  console.log(err)
})
