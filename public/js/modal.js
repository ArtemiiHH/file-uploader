const fileModal = document
  .getElementById("fileModal")
  .closest(".modal-container");
const folderModal = document
  .getElementById("folderModal")
  .closest(".modal-container");

document.getElementById("newFolderBtn").addEventListener("click", () => {
  folderModal.classList.add("modal-container-active");
});

document.getElementById("newFileBtn").addEventListener("click", () => {
  fileModal.classList.add("modal-container-active");
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    folderModal.classList.remove("modal-container-active");
    fileModal.classList.remove("modal-container-active");
  });
});

// Close when clicking outside the modal
document.querySelectorAll(".modal-container").forEach((container) => {
  container.addEventListener("click", (e) => {
    if (e.target === container) {
      container.classList.remove("modal-container-active");
    }
  });
});
