const fileModal = document.getElementById("fileModal");
const folderModal = document.getElementById("folderModal");

document.getElementById("newFileBtn").addEventListener("click", () => {
  fileModal.classList.add("active");
});

document.getElementById("newFolderBtn").addEventListener("click", () => {
  folderModal.classList.add("active");
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    fileModal.classList.remove("active");
    folderModal.classList.remove("active");
  });
});
