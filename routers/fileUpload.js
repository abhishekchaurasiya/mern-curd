const express = require("express");
const { localFileUploader, imageUploade, vidoeUpload, imageUploadReducer } = require("../controller/FileUpload");
const router = express.Router();

router.post("/localfileupload", localFileUploader)
router.post("/imageupload", imageUploade)
router.post("/videoupload", vidoeUpload)
router.post("/imagereducer", imageUploadReducer)

module.exports = router;