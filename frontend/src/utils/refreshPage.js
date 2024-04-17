function refreshPage(statusCode) {
  if (statusCode === 403) {
    setTimeout(() => window.location.reload(), 3000);
  }
}

function quickRefresh() {
  window.location.reload();
}

export { refreshPage, quickRefresh };
