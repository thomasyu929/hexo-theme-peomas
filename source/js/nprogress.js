listenToSetNProgress();

function listenToSetNProgress() {
  NProgress.configure({
    showSpinner: false,
    minimum: 0,
  });

  $(window).scroll(() => {
    const percent = getScrollPercentage();

    NProgress.set(percent);
  });
}

function getScrollPercentage() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  return scrollHeight ? scrollTop / (scrollHeight - clientHeight) - 0.0001 : 0;
}