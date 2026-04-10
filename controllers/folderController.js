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

// Render nested folder
async function renderFolder(req, res) {
  const folderId = parseInt(req.params.id);

  const files = await prisma.file.findMany({
    where: {
      userId: req.user.id,
      folderId: folderId,
    },
  });

  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
      parentId: folderId,
    },
  });

  res.render("dashboard", {
    user: req.user,
    files,
    folders,
    success: req.flash("success"),
    error: req.flash("error"),
  });
}

export default { createFolder, renderFolder };
