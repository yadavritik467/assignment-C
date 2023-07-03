import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRouter from "./routes/router.js"
import orderRouter from "./routes/orderRoute.js"




const port = 4500;
const app = express();
app.use(express.json());

const mongoDB = async () =>{
    try {
      await  mongoose.connect("mongodb+srv://yadavritik467:ritik23121999@cluster0.99i1t67.mongodb.net/assignment",
      {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
console.log("db is connected ")
    } catch (error) {
        console.log("db is not connected ")
    }
}
mongoDB()


app.use("/auth",authRouter)
app.use("/order",orderRouter)

app.get(("/", (req,res)=>{
    res.send("working")
}))

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})



