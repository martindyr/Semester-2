export function notification(status, message) {
  const toastBody = document.querySelector(".toast-body");
  if (status === "error") {
    toastBody.innerHTML = `${message}`;
    toastBody.style.color = "red";
  }
  if (status === "success") {
    toastBody.innerHTML = `${message}`;
    toastBody.style.color = "green";
  }
  new bootstrap.Toast(document.querySelector(".toast")).show();
}
