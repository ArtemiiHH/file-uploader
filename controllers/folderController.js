import prisma from "../lib/prisma.js";

// Create Folder
async function createFolder(req, res) {
  try {
    const { folder } = req.body;

    await prisma.folder.create({
      data: {
        foldername: folder,
        userId: req.user.id,
        parentId: req.params.parentId ? parseInt(req.params.parentId) : null,
      },
    });

    req.flash("success", "Folder created successfully");

    const redirectTo = req.params.parentId
      ? `/folders/${req.params.parentId}`
      : "dashboard";

    res.redirect(redirectTo);
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
    currentFolderId: folderId,
    success: req.flash("success"),
    error: req.flash("error"),
  });
}

// Update folder
async function renameFolder(req, res) {}

// Delete folder
async function deleteFolder(req, res) {}

export default { createFolder, renderFolder };
