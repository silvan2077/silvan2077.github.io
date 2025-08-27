// 引用块颜色轮换增强器
document.addEventListener('DOMContentLoaded', function() {
  // 定义颜色主题
  const colorThemes = [
    {
      border: '#3182ce',
      background: 'linear-gradient(135deg, rgba(49, 130, 206, 0.1) 0%, rgba(49, 130, 206, 0.05) 100%)',
      shadow: '0 2px 8px rgba(49, 130, 206, 0.1)',
      name: 'blue'
    },
    {
      border: '#48bb78',
      background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(72, 187, 120, 0.05) 100%)',
      shadow: '0 2px 8px rgba(72, 187, 120, 0.1)',
      name: 'green'
    },
    {
      border: '#ed8936',
      background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.1) 0%, rgba(237, 137, 54, 0.05) 100%)',
      shadow: '0 2px 8px rgba(237, 137, 54, 0.1)',
      name: 'orange'
    },
    {
      border: '#e53e3e',
      background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.1) 0%, rgba(229, 62, 62, 0.05) 100%)',
      shadow: '0 2px 8px rgba(229, 62, 62, 0.1)',
      name: 'red'
    },
    {
      border: '#805ad5',
      background: 'linear-gradient(135deg, rgba(128, 90, 213, 0.1) 0%, rgba(128, 90, 213, 0.05) 100%)',
      shadow: '0 2px 8px rgba(128, 90, 213, 0.1)',
      name: 'purple'
    },
    {
      border: '#38b2ac',
      background: 'linear-gradient(135deg, rgba(56, 178, 172, 0.1) 0%, rgba(56, 178, 172, 0.05) 100%)',
      shadow: '0 2px 8px rgba(56, 178, 172, 0.1)',
      name: 'teal'
    }
  ];

  // 夜间模式颜色主题
  const darkColorThemes = [
    {
      border: '#3182ce',
      background: 'linear-gradient(135deg, rgba(49, 130, 206, 0.2) 0%, rgba(49, 130, 206, 0.1) 100%)',
      shadow: '0 2px 8px rgba(49, 130, 206, 0.2)',
      name: 'blue'
    },
    {
      border: '#48bb78',
      background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.2) 0%, rgba(72, 187, 120, 0.1) 100%)',
      shadow: '0 2px 8px rgba(72, 187, 120, 0.2)',
      name: 'green'
    },
    {
      border: '#ed8936',
      background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.2) 0%, rgba(237, 137, 54, 0.1) 100%)',
      shadow: '0 2px 8px rgba(237, 137, 54, 0.2)',
      name: 'orange'
    },
    {
      border: '#e53e3e',
      background: 'linear-gradient(135deg, rgba(229, 62, 62, 0.2) 0%, rgba(229, 62, 62, 0.1) 100%)',
      shadow: '0 2px 8px rgba(229, 62, 62, 0.2)',
      name: 'red'
    },
    {
      border: '#805ad5',
      background: 'linear-gradient(135deg, rgba(128, 90, 213, 0.2) 0%, rgba(128, 90, 213, 0.1) 100%)',
      shadow: '0 2px 8px rgba(128, 90, 213, 0.2)',
      name: 'purple'
    },
    {
      border: '#38b2ac',
      background: 'linear-gradient(135deg, rgba(56, 178, 172, 0.2) 0%, rgba(56, 178, 172, 0.1) 100%)',
      shadow: '0 2px 8px rgba(56, 178, 172, 0.2)',
      name: 'teal'
    }
  ];

  // 应用颜色主题到引用块 - 确保不连续相同颜色
  function applyBlockquoteColors() {
    const blockquotes = document.querySelectorAll('blockquote');
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const themes = isDarkMode ? darkColorThemes : colorThemes;

    // 定义12个位置的颜色顺序，确保不连续相同
    const colorSequence = [
      0, // 蓝色
      1, // 绿色
      2, // 橙色
      3, // 红色
      4, // 紫色
      5, // 青色
      1, // 绿色（避免与第1个蓝色连续）
      2, // 橙色
      3, // 红色
      4, // 紫色
      5, // 青色
      0  // 蓝色（完成循环）
    ];

    blockquotes.forEach((blockquote, index) => {
      const sequenceIndex = index % colorSequence.length;
      const themeIndex = colorSequence[sequenceIndex];
      const theme = themes[themeIndex];
      
      // 移除之前的主题类
      blockquote.classList.remove('blockquote-blue', 'blockquote-green', 'blockquote-orange', 'blockquote-red', 'blockquote-purple', 'blockquote-teal');
      
      // 添加新的主题类
      blockquote.classList.add(`blockquote-${theme.name}`);
      
      // 应用样式
      blockquote.style.borderLeftColor = theme.border;
      blockquote.style.background = theme.background;
      blockquote.style.boxShadow = theme.shadow;
      
      // 添加数据属性用于调试
      blockquote.setAttribute('data-theme', theme.name);
      blockquote.setAttribute('data-index', index);
      blockquote.setAttribute('data-sequence', sequenceIndex);
    });
  }

  // 监听主题切换
  function observeThemeChange() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          applyBlockquoteColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  // 初始化
  function init() {
    applyBlockquoteColors();
    observeThemeChange();
    
    // 为引用块添加点击效果
    document.querySelectorAll('blockquote').forEach(blockquote => {
      blockquote.addEventListener('click', function() {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      });
    });
  }

  // 启动增强器
  init();
  
  // 如果使用PJAX，需要在页面切换后重新应用
  if (typeof btf !== 'undefined') {
    btf.addGlobalFn('pjaxComplete', init, 'blockquoteEnhancer');
  }
});
