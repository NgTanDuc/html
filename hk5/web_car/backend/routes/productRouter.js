import express from 'express';
import multer from 'multer';
import { addProduct, listProduct, removeProduct, updateProduct } from '../controller/productController.js';

const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage : storage})


productRouter.post("/add", upload.single("image"), addProduct)
productRouter.get("/list", listProduct)
productRouter.post("/remove", removeProduct)
productRouter.put('/update/:id',upload.single("image"), updateProduct)

export default productRouter;
