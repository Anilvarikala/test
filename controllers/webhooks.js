// manage the clerk webhook

const webhook = require('svix')
const User = require('../models/user')


exports.clerkWebhook = async (req, res) => {
  try{
      const whook = new webhook(process.env.CLERK_WEBHOKK_SECRET)
      await whook.verify(JSON.stringify(req.body), {
        "svix-id" : req.headers["svix-id"],
        "svix-timestamp" : req.headers["svix-timestamp"],
        "svix-signature" : req.headers["svix-signature"]
      })

      const {data, type} = req.body;
      switch(type){
        case 'user.created' : {
           const userData = {
            _id : data.id,
            name : data.first_name + " " + data.last_name,
            email : data.email_addresses[0].email_address,
            image: data.image_url
           }
           await User.create(userData)  
           res.json({})
           break;
        }
        case 'user.updated' : {
           const userData = {
            name : data.first_name + " " + data.last_name,
            email : data.email_addresses[0].email_address,
            image: data.image_url
           }
           await User.findByIdAndUpdate(data.id, userData)
           res.json({})
           break;
        }
         case 'user.deleted' : {
            await User.findByIdAndDelete(data.id)
            res.json({})
            break;
        }
        default : break;
      }


  }
  catch(err){
    console.log(err.message)
    res.json({
      success:false
    })
  }
}
