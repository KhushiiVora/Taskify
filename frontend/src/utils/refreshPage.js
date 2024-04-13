function refreshPage(statusCode) {
  if (statusCode === 403) {
    setTimeout(() => window.location.reload(), 5000);
  } else {
    window.location.reload();
  }
}

export { refreshPage };
