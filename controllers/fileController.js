import prisma from "../lib/prisma.js";
import cloudinary from "../config/cloudinary.js";

// Upload File
async function uploadFile(req, res) {
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
        folderId: req.params.folderId ? parseInt(req.params.folderId) : null,
      },
    });

    req.flash("success", "File uploaded successfully");

    const redirectTo = req.params.folderId
      ? `/folders/${req.params.folderId}`
      : "/dashboard";

    res.redirect(redirectTo);
  } catch (error) {
    console.error("Upload error: ", error);
    req.flash("error", "Error uploading file");
    res.redirect("/dashboard");
  }
}

// Delete file
async function deleteFile(req, res) {
  try {
    await prisma.file.delete({
      where: { id: req.params.id },
    });

    req.flash("success", "File uploaded successfully");

    const redirectTo = req.params.id ? `/files/${req.params.id}` : "/dashboard";

    res.redirect(redirectTo);
  } catch (error) {
    console.error("Upload error: ", error);
    req.flash("error", "Error deleting file");
    res.redirect("/dashboard");
  }
}

export default { uploadFile, deleteFile };
