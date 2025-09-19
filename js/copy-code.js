;(function () {
  function addCopyButtons(root) {
    var blocks = (root || document).querySelectorAll('figure.highlight, pre code');
    blocks.forEach(function (block) {
      var host = block.closest('figure.highlight') || block.closest('pre');
      if (!host || host.classList.contains('has-copy-btn')) return;
      host.classList.add('has-copy-btn');
      host.style.position = host.style.position || 'relative';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code-btn';
      btn.setAttribute('aria-label', '复制代码');
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v12h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';

      btn.addEventListener('click', function () {
        var text = extractCodeText(host);
        if (!text) return;
        navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard.writeText(text).then(showOK, showFallback)
          : showFallback();

        function showOK() { flash(btn, '已复制'); }
        function showFallback() {
          try {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.top = '-1000px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            flash(btn, '已复制');
          } catch (e) {
            flash(btn, '复制失败');
          }
        }
      });

      host.appendChild(btn);

      // 按下/松开视觉反馈（鼠标与触屏）
      btn.addEventListener('mousedown', function () { btn.classList.add('pressed'); });
      btn.addEventListener('mouseup', function () { btn.classList.remove('pressed'); });
      btn.addEventListener('mouseleave', function () { btn.classList.remove('pressed'); });
      btn.addEventListener('touchstart', function () { btn.classList.add('pressed'); }, { passive: true });
      btn.addEventListener('touchend', function () { btn.classList.remove('pressed'); });
      btn.addEventListener('touchcancel', function () { btn.classList.remove('pressed'); });
    });
  }

  // 提取纯代码文本，排除行号等装饰
  function extractCodeText(host) {
    // 优先取代码容器，排除行号列（gutter）
    var el = host.querySelector('td.code')
      || host.querySelector('.code')
      || host.querySelector('pre code')
      || host.querySelector('code')
      || host;

    // 克隆后移除常见的行号容器
    var clone = el.cloneNode(true);
    var removeSelectors = ['.gutter', '.line-numbers-rows', '.hljs-ln-numbers', '.lineno'];
    removeSelectors.forEach(function (sel) {
      clone.querySelectorAll(sel).forEach(function (n) { n.remove(); });
    });

    // 若存在逐行元素，按行拼接，确保换行
    var lineNodes = clone.querySelectorAll('.line');
    if (lineNodes && lineNodes.length > 1) {
      var lines = [];
      lineNodes.forEach(function (ln) { lines.push(ln.textContent || ''); });
      return lines.join('\n');
    }

    // 深度遍历，显式把 <br> 识别为换行
    function textWithBreaks(node, out) {
      if (!node) return out;
      var type = node.nodeType;
      if (type === 3) { // TEXT_NODE
        out.push(node.nodeValue);
        return out;
      }
      if (type === 1) { // ELEMENT_NODE
        var name = node.nodeName;
        if (name === 'BR') { out.push('\n'); return out; }
        var child = node.firstChild;
        while (child) { textWithBreaks(child, out); child = child.nextSibling; }
        return out;
      }
      return out;
    }
    var parts = [];
    textWithBreaks(clone, parts);
    var raw = parts.join('');
    // 统一换行符并去除不可见零宽字符；将不间断空格替换为普通空格
    raw = raw.replace(/\r\n?/g, '\n')
             .replace(/[\u200B-\u200D\uFEFF]/g, '')
             .replace(/\u00A0/g, ' ');
    return raw;
  }

  function flash(btn, text) {
    var old = btn.getAttribute('data-tip');
    btn.setAttribute('data-tip', text);
    btn.classList.add('copied');
    setTimeout(function () {
      if (old) btn.setAttribute('data-tip', old); else btn.removeAttribute('data-tip');
      btn.classList.remove('copied');
    }, 1500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { addCopyButtons(document); });
  } else {
    addCopyButtons(document);
  }

  // Support pjax if enabled
  document.addEventListener('pjax:complete', function () { addCopyButtons(document); });
})();


