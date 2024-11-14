import productModel from "../models/productModel.js";
import fs from 'fs';

const addProduct = async(req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Image file is required" });
    }
    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename
    })

    try {
        await product.save();
        res.json({success: true, message: "Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

const removeProduct = async(req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`, () => { })

        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" })
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

const listProduct = async(req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products })
    } catch (error) {
        log(error)
        res.json({ success: false, message: "Errors" })
    }
}

const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;  // Lấy id từ URL params
      const { name, description, price } = req.body;
      let updatedProduct = await productModel.findById(id);
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      // Cập nhật dữ liệu sản phẩm
      updatedProduct.name = name;
      updatedProduct.description = description;
      updatedProduct.price = price;
  
      if (req.file) {  // Nếu có hình ảnh mới
        // Xử lý xóa hình cũ và lưu hình ảnh mới
        fs.unlink(`uploads/${updatedProduct.image}`, () => {});
        updatedProduct.image = req.file.filename;
      }
  
      await updatedProduct.save();
      res.json({ success: true, message: "Product updated successfully" });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error updating product" });
    }
  };
  
export { addProduct, removeProduct, listProduct, updateProduct }
