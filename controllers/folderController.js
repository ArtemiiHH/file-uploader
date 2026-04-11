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

// Rename folder
async function renameFolder(req, res) {
  try {
    await prisma.folder.update({
      where: { id: parseInt(req.params.id) },
      data: { foldername: req.body.foldername },
    });

    req.flash("success", "Folder renamed successfully");

    const folder = await prisma.folder.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    const redirectTo = folder.parentId
      ? `/folders/${folder.parentId}` 
      : "dashboard";

    res.redirect(redirectTo);
  } catch (error) {
    console.error("Rename error: ", error);
    req.flash("error", "Error renaming folder");
    res.redirect("/dashboard");
  }
}

// Delete folder
async function deleteFolder(req, res) {
  try {
    await prisma.folder.delete({
      where: { id: parseInt(req.params.id) },
    });
    req.flash("success", "Folder deleted successfully");
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Upload error: ", error);
    req.flash("error", "Error deleting folder");
    res.redirect("/dashboard");
  }
}

export default { createFolder, renderFolder, renameFolder, deleteFolder };
