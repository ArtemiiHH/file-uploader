import prisma from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

// Upload File
async function uploadFile(req, res) {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);
  try {
    // Upload buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "file-uploader" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    // Save Cloudinary URL to DB
    await prisma.file.create({
      data: {
        filename: req.file.originalname,
        url: result.secure_url,
        userId: req.user.id,
        folderId: req.body.folderId ? parseInt(req.body.folderId) : null,
      },
    });

    req.flash("success", "File uploaded successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Upload error: ", error);
    req.flash("error", "Error uploading file");
    res.redirect("/dashboard");
  }
}

// Delete file
async function deleteFile(req, res) {}

// Download file
async function downloadFile(req, res) {}

// Delete file
async function viewFileDetails(req, res) {}

export default { uploadFile };
