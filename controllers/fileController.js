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
        storagePath: result.secure_url,
        mimetype: req.file.mimetype,
        size: req.file.size,
        userId: req.user.id,
        folderId: req.body.folderId ? parseInt(req.body.folderId) : null,
      },
    });

    req.flash("error", "File uploaded file");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Full error: ", error);
    res.redirect("/dashboard");
  }
}

export default { uploadFile };
