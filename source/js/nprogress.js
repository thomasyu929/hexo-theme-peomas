listenToSetNProgress();

function listenToSetNProgress() {
  NProgress.configure({
    showSpinner: false,
    minimum: 0,
  });

  loadPageProgress(() => $(window).scroll(() => {
    const percent = getScrollPercentage();

    NProgress.set(percent);
  }));

  
}

function loadPageProgress(callback) {
  NProgress.start()

  $(window).on('load', () => {
    // TODO Lazy loading
    NProgress.set(100);

    Promise.resolve().then(() => callback());
  });
}

function getScrollPercentage() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  return scrollHeight ? scrollTop / (scrollHeight - clientHeight) - 0.0001 : 0;
}