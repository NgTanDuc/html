import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import productRouter from './routes/productRouter.js'

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/product", productRouter)
app.use("/images", express.static("uploads"))

app.get("/", (req, res)=>{
    res.send("API Working")
})

app.listen(port, ()=> {
    console.log(`Server Started on http://localhost:${port}`)
}) 