/**
 * downloader-i18n.js — 多语言支持
 *
 * 语言检测优先级：
 *   1. front matter lang → <meta name="dl-lang"> → section[data-lang]
 *   2. <html lang>（Hugo 站点 languageCode）
 *   3. navigator.languages（浏览器偏好）
 *   4. 默认 zh-CN
 *
 * 新增语言：在 LOCALES 对象里加一个键，ALIASES 按需补充。
 */
window.DLI18n = (function () {

  const LOCALES = {

    'zh-CN': {
      fileCount:     n => `文件 ${n}`,
      selectedCount: n => `已选 ${n}`,
      selectAll:     '全选',
      selectedSize:  s => `已选 ${s}`,
      selectedFiles: n => `${n} 个文件已选`,
      zipAll:        '⬇ 打包 ZIP',
      download:      '↓ 下载',
      downloading:   '下载中…',
      done:          '✓ 完成',
      retry:         '↓ 重试',
      packTitle:     '📦 正在打包下载',
      packInit:      '初始化中...',
      packTotal:     n => `共 ${n} 个文件`,
      packProgress:  (d, t) => `${d} / ${t} 完成`,
      packZipping:   '正在生成 ZIP...',
      packDone:      '✅ 打包完成，已触发下载',
      packClose:     '✓ 完成关闭',
      statusWait:    '等待',
      statusDoing:   '下载中',
      statusOk:      '✓ 完成',
      statusErr:     '✗ 失败',
      packBtnTitle:  '📦 全部文件 — 打包下载',
      wechatTip:     '📌 微信内置浏览器不支持直接下载，请点右上角 → 在浏览器中打开',
      defaultTitle:  '资源文件下载',
    },

    'zh-TW': {
      fileCount:     n => `檔案 ${n}`,
      selectedCount: n => `已選 ${n}`,
      selectAll:     '全選',
      selectedSize:  s => `已選 ${s}`,
      selectedFiles: n => `${n} 個檔案已選`,
      zipAll:        '⬇ 打包 ZIP',
      download:      '↓ 下載',
      downloading:   '下載中…',
      done:          '✓ 完成',
      retry:         '↓ 重試',
      packTitle:     '📦 正在打包下載',
      packInit:      '初始化中...',
      packTotal:     n => `共 ${n} 個檔案`,
      packProgress:  (d, t) => `${d} / ${t} 完成`,
      packZipping:   '正在產生 ZIP...',
      packDone:      '✅ 打包完成，已觸發下載',
      packClose:     '✓ 完成關閉',
      statusWait:    '等待',
      statusDoing:   '下載中',
      statusOk:      '✓ 完成',
      statusErr:     '✗ 失敗',
      packBtnTitle:  '📦 全部檔案 — 打包下載',
      wechatTip:     '📌 微信內建瀏覽器不支援直接下載，請點右上角 → 在瀏覽器中開啟',
      defaultTitle:  '資源檔案下載',
    },

    'en': {
      fileCount:     n => `Files: ${n}`,
      selectedCount: n => `Selected: ${n}`,
      selectAll:     'Select all',
      selectedSize:  s => `Selected: ${s}`,
      selectedFiles: n => `${n} file${n === 1 ? '' : 's'} selected`,
      zipAll:        '⬇ Download as ZIP',
      download:      '↓ Download',
      downloading:   'Downloading…',
      done:          '✓ Done',
      retry:         '↓ Retry',
      packTitle:     '📦 Packaging…',
      packInit:      'Initializing...',
      packTotal:     n => `${n} file${n === 1 ? '' : 's'} total`,
      packProgress:  (d, t) => `${d} / ${t} done`,
      packZipping:   'Generating ZIP...',
      packDone:      '✅ Done! Download triggered.',
      packClose:     '✓ Close',
      statusWait:    'Waiting',
      statusDoing:   'Downloading',
      statusOk:      '✓ Done',
      statusErr:     '✗ Failed',
      packBtnTitle:  '📦 All Files — Pack & Download',
      wechatTip:     '📌 WeChat browser does not support direct downloads. Please open in an external browser.',
      defaultTitle:  'File Downloads',
    },

  };

  const ALIASES = {
    'zh':      'zh-CN', 'zh-cn':   'zh-CN', 'zh-hans': 'zh-CN',
    'zh-tw':   'zh-TW', 'zh-hant': 'zh-TW', 'zh-hk':   'zh-TW', 'zh-mo': 'zh-TW',
  };

  function resolve(tag) {
    if (!tag) return null;
    const lower = tag.toLowerCase();
    if (ALIASES[lower])      return ALIASES[lower];
    const prefix = lower.split('-')[0];
    if (ALIASES[prefix])     return ALIASES[prefix];
    if (LOCALES[tag])        return tag;
    if (LOCALES[prefix])     return prefix;
    return null;
  }

  function detect() {
    const sec = document.querySelector('#dl-data section');
    if (sec?.dataset.lang) { const r = resolve(sec.dataset.lang); if (r) return r; }
    const r2 = resolve(document.documentElement.lang);
    if (r2) return r2;
    for (const lang of (navigator.languages || [navigator.language])) {
      const r3 = resolve(lang); if (r3) return r3;
    }
    return 'zh-CN';
  }

  return { get: () => LOCALES[detect()] || LOCALES['zh-CN'] };

})();
