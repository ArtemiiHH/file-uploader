// MODALS
const fileModal = document
  .getElementById("fileModal")
  .closest(".modal-container");
const folderModal = document
  .getElementById("folderModal")
  .closest(".modal-container");
const renameFolderModal = document
  .getElementById("renameFolderModal")
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
    renameFolderModal.classList.remove("modal-container-active");
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

// FOLDER DOUBLE CLICK
document.querySelectorAll(".folder-card").forEach((folder) => {
  folder.addEventListener("dblclick", () => {
    const folderId = folder.dataset.id;
    window.location.href = `/folders/${folderId}`;
  });
});

// THREE DOTS DROP DOWN
document.querySelectorAll(".dot-menu").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const dropdown = btn.nextElementSibling;
    dropdown.classList.toggle("active");
  });
});

// Close when clicking outside
document.addEventListener("click", () => {
  document
    .querySelectorAll(".dropdown")
    .forEach((d) => d.classList.remove("active"));
});

// SET RENAME FOLDER FORM ACTION
document.querySelectorAll(".rename-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const folderId = btn.dataset.id;
    const form = document.getElementById("renameFolderForm");
    form.action = `/folders/${folderId}`;
    renameFolderModal.classList.add("modal-container-active");
  });
});
