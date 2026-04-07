const fileModal = document.getElementById("fileModal");
const folderModal = document.getElementById("folderModal");

const newFileBtn = document.getElementById("newFileBtn");
const newFolderBtn = document.getElementById("newFolderBtn");

newFileBtn.addEventListener("click", () => {
  fileModal.classList.add("modal-container-active");
});

newFolderBtn.addEventListener("click", () => {
  folderModal.classList.add("modal-container-active");
});
