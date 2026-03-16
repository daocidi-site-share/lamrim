/**
 * downloader-parser.js
 *
 * 从 Hugo 渲染后的 Markdown HTML 解析文件列表，
 * 构建 downloader.js 所需的 #dl-data DOM，调用 window.__dlInit()。
 *
 * Markdown 格式：
 *   - [{文件名}]({URL} "{type} | {描述} | {bytes}")
 */
(function () {

  document.addEventListener('DOMContentLoaded', function () {

    const content = document.getElementById('dl-content');
    const root    = document.getElementById('dl-root');
    if (!content || !root) return;

    const metaTitle   = document.querySelector('meta[name="dl-title"]');
    const metaZipName = document.querySelector('meta[name="dl-zipname"]');
    const metaUnit    = document.querySelector('meta[name="dl-unit"]');
    const metaLang    = document.querySelector('meta[name="dl-lang"]');

    /* 解析文件列表（取第一个 <ul>） */
    const files = [];
    const ul    = content.querySelector('ul');
    if (ul) {
      for (const a of ul.querySelectorAll('li > a')) {
        const parts = (a.title || '').split('|').map(s => s.trim());
        const fname = a.textContent.trim();
        files.push({
          name:  fname,
          url:   a.href,
          type:  parts[0] || fname.split('.').pop() || 'js',
          desc:  parts[1] || '',
          bytes: +(parts[2] || 0),
        });
      }
    }

    /* 构建 #dl-data */
    const dlData = document.createElement('div');
    dlData.id            = 'dl-data';
    dlData.style.display = 'none';

    const sec = document.createElement('section');
    sec.dataset.title   = metaTitle?.content   || document.title;
    sec.dataset.zipName = metaZipName?.content || 'files.zip';
    if (metaUnit) sec.dataset.unit = metaUnit.content;
    if (metaLang) sec.dataset.lang = metaLang.content;
    dlData.appendChild(sec);

    const listEl = document.createElement('ul');
    for (const f of files) {
      const li = document.createElement('li');
      li.dataset.name  = f.name;
      li.dataset.desc  = f.desc;
      li.dataset.type  = f.type;
      li.dataset.bytes = f.bytes;
      li.dataset.url   = f.url;
      listEl.appendChild(li);
    }
    dlData.appendChild(listEl);

    document.body.appendChild(dlData);
    if (window.__dlInit) window.__dlInit();
  });

})();
