const File = require("../models/imageupload");
const cloudinary = require("cloudinary").v2

exports.localFileUploader = async (req, res) => {
    try {
        // fetch file 
        const file = req.files.file;
        console.log(file)

        // kaha par file upload karna 
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("path", path)

        file.mv(path, (err) => {
            console.log(err)
        });

        res.status(200).json({
            success: true,
            message: "Local File upload successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

function isFileTypeSupported(types, supportedTypes) {
    return supportedTypes.includes(types)
};

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    // if (height) {
    //     options.height = height
    // };
    // if (width) {
    //     options.width = width
    // };
    if (quality) {
        options.quality = quality
    };

    options.resource_type = 'auto';

    return await cloudinary.uploader.upload(file.tempFilePath, options)
};

exports.imageUploade = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
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

        // file formated supported 
        const response = await uploadFileToCloudinary(file, "abhitech");
        console.log("cloudinary", response);

        const dbEntry = await File.create({
            name, tags, email,
            imageUrl: response.secure_url
        })

        res.status(201).json({
            success: true,
            message: "Image upload successfully",
            data: dbEntry
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

exports.vidoeUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.videoFile;

        // validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("filetype", fileType)

        // file formated not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "This file format not supported."
            })
        };

        // file formated supported 
        const response = await uploadFileToCloudinary(file, "abhitech");
        console.log("cloudinary", response);

        await File.create({
            name, tags, email,
            imageUrl: response.secure_url
        })

        res.status(201).json({
            success: true,
            message: "Video upload successfully",
            // videoUrl: response.secure_url
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went to wrong"
        })
    }
};

exports.imageUploadReducer = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files.imageFile;

        // validation
        const supportedTypes = ["jpeg", "png", "jpg"];
        const fileType = file.name.split(".")[1].toLowerCase();
        console.log("filetype", fileType)

        // file formated not supported
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "This file format not supported."
            })
        };

        // file formated supported 
        const response = await uploadFileToCloudinary(file, "abhitech", 80);
        console.log("cloudinary", response);

        await File.create({
            name, tags, email,
            imageUrl: response.secure_url
        })

        res.status(201).json({
            success: true,
            message: "Image upload successfully",
            imageUrl: response.secure_url
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went to wrong"
        })
    }
}