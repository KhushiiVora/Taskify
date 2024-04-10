function refreshPage(statusCode) {
  if (statusCode === 403) {
    setTimeout(() => window.location.reload(), 5000);
  }
}

export { refreshPage };
