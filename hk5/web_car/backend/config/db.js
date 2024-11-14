import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://trikhong2004:khongminhtri2004@endtermproject.8nk6y.mongodb.net/final_app').then(()=>console.log("Database Connected"));
}