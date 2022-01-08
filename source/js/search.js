listenSearchInput('/search.xml', '#search', '#result');

function listenSearchInput(url, searchId, resultId) {
  const searchEl = $(searchId);
  const resultEl = $(resultId);

  $('#searchModal').on('shown.bs.modal', function () {
    searchEl.focus();
  })

  $('#searchModal').on('hidden.bs.modal', function () {
    searchEl.val('');
    resultEl.html('');
  })

  $.ajax({
    url,
    dataType: "xml",
    success: function (response) {
      let data = $('entry', response).map(function() {
        return {
          title: $('title', this).text(),
          categories: $('category', this).map(function() {
            return this.innerHTML.trim();
          }).get(),
          tags: $('tag', this).map(function() {
            return this.innerHTML.trim();
          }).get(),
          content: $('content', this).text().replace(/<[^>]+>/g, ''),
          url: $('url', this).text().trim()
        };
      }).get()

      searchEl.on('input', function() {
        resultEl.html('');

        let keyword = searchEl.val().trim().toLowerCase();
        let resultHTML = '';

        if (keyword.length > 1) {
          data.forEach(function(post) {
            const _title = post.title.toLowerCase(),
                  _categories = post.categories.map(c => c.toLowerCase()),
                  _tags = post.tags.map(t => t.toLowerCase()),
                  _content = post.content.toLowerCase();
            let isMatch = false;
            let start = 0, end = post.content.length;
            let idx = _content.indexOf(keyword);

            if (_title.indexOf(keyword) >= 0
              || _content.indexOf(keyword) >= 0
              || _categories.filter(c => c.indexOf(keyword) >= 0).length
              || _tags.filter(t => t.indexOf(keyword) >= 0).length) {
              isMatch = true;
            }

            start = idx >= 20 ? idx - 20 : 0;
            end = idx + 80 <= _content.length ? idx + 80 : _content.length;
            matchContent = post.content.slice(start, end) + (end < _content.length ? '...' : '');
            const reg = new RegExp(keyword, 'gi');
            const m_content = matchContent.replace(reg, `<span class="keyword">${ keyword }</span>`)

            if (isMatch) {
              tagHTML = post.tags.reduce((html, tag) => html + `<div class="search-tag">${ tag }</div>`, '');
              categoryHTML = post.categories.reduce((html, category) => html + `<div class="search-tag">${ category }</div>`, '');

              resultHTML += `
                <li class="list-group-item py-2">
                  <a href="${ post.url }">
                    <span class="title">${ post.title }</span>
                  </a>
                  <div class="content">${ m_content }</div>
                  <div class="d-flex py-2">${ categoryHTML }${ tagHTML }</div>
                </li>
              `
            }
          })
        }

        resultEl.html(resultHTML);
      })
    }
  });
}