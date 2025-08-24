// 代码块切换功能
document.addEventListener('DOMContentLoaded', function() {
  // 为每个代码块容器添加切换逻辑
  document.querySelectorAll('.code-tabs').forEach(tabs => {
    tabs.querySelectorAll('.code-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // 移除所有激活状态
        tabs.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
        const contentId = tab.getAttribute('data-target');
        document.querySelectorAll('.code-content').forEach(c => c.classList.remove('active'));
        
        // 激活当前标签
        tab.classList.add('active');
        document.getElementById(contentId).classList.add('active');
      });
    });
  });
});