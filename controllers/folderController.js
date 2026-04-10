import prisma from "../lib/prisma.js";

// Create Folder
async function createFolder(req, res) {
  try {
    const { folder } = req.body;

    await prisma.folder.create({
      data: {
        foldername: folder,
        userId: req.user.id,
        parentId: null,
      },
    });

    req.flash("success", "Folder created successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Upload error: ", error);
    req.flash("error", "Error creating folder");
    res.redirect("/dashboard");
  }
}

export default { createFolder };
