export function notification(status, message) {
  const toastBody = document.querySelector(".toast-body");
  if (status === "error") {
    toastBody.innerHTML = `${message}`;
    toastBody.style.color = "#EB5757";
  }
  if (status === "success") {
    toastBody.innerHTML = `${message}`;
    toastBody.style.color = "#27AE60";
  }
  new bootstrap.Toast(document.querySelector(".toast")).show();
}
