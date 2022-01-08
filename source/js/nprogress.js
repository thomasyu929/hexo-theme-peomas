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
  const percentage = scrollTop / (scrollHeight - clientHeight);

  return scrollHeight ? (percentage >= 1 ? 0.999 : percentage) : 0;
}