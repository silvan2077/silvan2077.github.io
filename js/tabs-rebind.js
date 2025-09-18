function bindButterflyTabs() {
  try {
    var container = document.querySelector('#article-container');
    if (!container) return;
    var buttons = container.querySelectorAll('.tab > button');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      // 防重复绑定
      btn.__tabsBound && btn.removeEventListener('click', btn.__tabsHandler);
      var handler = function (e) {
        var nav = btn.closest('.tabs').querySelector('.nav-tabs');
        var contents = btn.closest('.tabs').querySelector('.tab-contents');
        if (!nav || !contents) return;
        // 切换激活按钮
        nav.querySelectorAll('.tab').forEach(function (li) { li.classList.remove('active'); });
        btn.parentElement.classList.add('active');
        // 切换内容
        var target = btn.getAttribute('data-href');
        contents.querySelectorAll('.tab-item-content').forEach(function (pane) {
          if ('#' + pane.id === target) pane.classList.add('active');
          else pane.classList.remove('active');
        });
      };
      btn.__tabsHandler = handler;
      btn.__tabsBound = true;
      btn.addEventListener('click', handler);
    });
  } catch (err) {
    console && console.warn && console.warn('tabs-rebind error:', err);
  }
}

// 首次进入
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindButterflyTabs);
} else {
  bindButterflyTabs();
}

// 兼容 pjax 切换
document.addEventListener('pjax:complete', bindButterflyTabs);


