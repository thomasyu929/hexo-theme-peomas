initToc();

function initToc() {
  if ($('#toc').length === 0) {
    return;
  }

  tocbot.init({
    tocSelector: '#toc',
    contentSelector: '#content',
    headingSelector: 'h1, h2, h3',
  });
}