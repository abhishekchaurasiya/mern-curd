const cloudinary = require("cloudinary").v2;

exports.isFileTypeSupported = (types, supportedTypes) => {
    return supportedTypes.includes(types)
};

exports.uploadFileToCloudinary = async (file, folder) => {
    const options = {
        folder,
        width: 1000,
        crop: "scale"
    };
    // if (height) {
    //     options.height = height
    // };
    // if (width) {
    //     options.width = width
    // };
    // if (quality) {
    //     options.quality = quality
    // };
    options.resource_type = 'auto';

    return await cloudinary.uploader.upload(file.tempFilePath, options)
};