const Product = require("../models/products");
const cloudinary = require("cloudinary").v2;
const { isFileTypeSupported, uploadFileToCloudinary } = require("../config/cloudinaryData");
const { productSchema, updateProductSchema } = require("../utils/validater");
const mongoose = require("mongoose")

exports.createProduct = async (req, res) => {
    try {
        //joi validation for input fields
        const { error } = productSchema.validate(req.body)
        if (error) return res.status(401).json({ message: error.message });

        const { name, price, quantity, category } = req.body;
        const file = req.files.imageFile;

        // validation
        const supportedTypes = ["jpeg", "png", "jpg"];
        const fileType = file.name.split(".")[1].toLowerCase();

        // file formated not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "This file format not supported."
            })
        };

        // file formated supported and then upload image in cloudinary
        const response = await uploadFileToCloudinary(file, "abhitech");

        // entry in db
        const dbEntry = await Product.create({
            name,
            price,
            quantity,
            category,
            user: req.user._id,
            imageUrl: {
                public_id: response.public_id,
                url: response.secure_url
            }
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: dbEntry,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
};

exports.updateProduct = async (req, res) => {
    try {
        //joi validation for input fields
        // const { error } = updateProductSchema.validate(req.body)
        // if (error) return res.status(401).json({ message: error.message });

        const productId = req.params.id;
        const { name, price, quantity, category } = req.body;
        let file = req.files.imageFile;

        // product id validation
        if (!mongoose.isValidObjectId(productId)) return res.status(422).json({
            success: false,
            message: "This is not valid id."
        })

        const currentProduct = await Product.findById(productId);
        const data = {
            name,
            price,
            quantity,
            category,
        }

        const supportedTypes = ["jpeg", "png", "jpg"];
        const fileType = file.name.split(".")[1].toLowerCase();

        // file formated not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "This file format not supported."
            })
        };

        //modify image conditionnally
        if (req.files.imageFile !== '') {
            const ImgId = currentProduct.imageUrl.public_id;
            if (ImgId) {
                await cloudinary.uploader.destroy(ImgId)
            }
            // file are supported then store in cloudinary
            const newImage = await uploadFileToCloudinary(file, "abhitech")

            data.imageUrl = {
                public_id: newImage.public_id,
                url: newImage.secure_url
            }
        }

        const updateProduct = await Product.findByIdAndUpdate(
            { _id: productId },
            data,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updateProduct,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
};

// show all products 
exports.showAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) - 1 || 0;
        const limit = Number(req.query.limit) || 5;
        const search = req.query.search || "";
        const count = await Product.find({}).estimatedDocumentCount();
    
        const products = await Product.find(
            { name: { $regex: search, $options: "i" }, }
        )
            .sort({ price: req.query.sortBy == "desc" ? -1 : 1 })
            .skip(page * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            message: "Get all product successfully",
            page: page + 1,
            limit,
            count,
            data: products,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        // product id validation
        if (!mongoose.isValidObjectId(productId)) return res.status(422).json({
            success: false,
            message: "This is not valid id."
        })
        let product = await Product.findById(productId);
        let imageId = product.imageUrl.public_id;

        if (imageId) {
            await cloudinary.uploader.destroy(imageId)
        }

        const deleteProduct = await Product.findByIdAndDelete({ _id: productId }, { new: true });

        res.status(200).json({
            success: true,
            message: " Product deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
