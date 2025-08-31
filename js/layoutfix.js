// 修复 index_layout 6和7的JavaScript相关问题
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前布局设置
  const currentLayout = window.GLOBAL_CONFIG_SITE && window.GLOBAL_CONFIG_SITE.index_layout;
  
  // 如果是布局6或7，添加masonry类
  if (currentLayout === 6 || currentLayout === 7) {
    const recentPosts = document.getElementById('recent-posts');
    if (recentPosts) {
      recentPosts.classList.add('masonry');
      
      // 为每个文章项添加data-layout属性
      const postItems = recentPosts.querySelectorAll('.recent-post-item');
      postItems.forEach(item => {
        item.setAttribute('data-layout', currentLayout);
      });
    }
  }
  
  // 修复布局5的问题
  if (currentLayout === 5) {
    const postItems = document.querySelectorAll('.recent-post-item');
    postItems.forEach(item => {
      item.setAttribute('data-layout', '5');
    });
  }
  
  // 防止文章信息闪烁消失的修复
  function preventInfoFlicker() {
    const postInfos = document.querySelectorAll('.recent-post-info');
    postInfos.forEach(info => {
      // 确保信息始终可见
      info.style.opacity = '1';
      info.style.visibility = 'visible';
      
      // 监听可能的隐藏事件
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'attributes' && 
              (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
            // 如果检测到隐藏，立即恢复显示
            if (info.style.opacity === '0' || info.style.visibility === 'hidden') {
              info.style.opacity = '1';
              info.style.visibility = 'visible';
            }
          }
        });
      });
      
      observer.observe(info, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    });
  }
  
  // 延迟执行，确保DOM完全加载
  setTimeout(preventInfoFlicker, 100);
  
  // 监听页面变化（PJAX）
  if (window.btf && window.btf.addGlobalFn) {
    window.btf.addGlobalFn('pjaxComplete', function() {
      setTimeout(preventInfoFlicker, 100);
    }, 'layoutFixPjax');
  }
});

// 修复InfiniteGrid可能的问题
window.addEventListener('load', function() {
  // 如果InfiniteGrid存在但有问题，尝试重新初始化
  if (window.InfiniteGrid && window.InfiniteGrid.MasonryInfiniteGrid) {
    const recentPosts = document.getElementById('recent-posts');
    if (recentPosts && recentPosts.classList.contains('masonry')) {
      // 延迟初始化，确保所有资源加载完成
      setTimeout(function() {
        try {
          const masonryItem = new InfiniteGrid.MasonryInfiniteGrid('.recent-post-items', {
            gap: { horizontal: 10, vertical: 20 },
            useTransform: true,
            useResizeObserver: true
          });
          masonryItem.renderItems();
        } catch (error) {
          console.log('Masonry layout initialization failed, using fallback:', error);
          // 如果初始化失败，使用备用布局
          recentPosts.classList.remove('masonry');
        }
      }, 500);
    }
  }
});
