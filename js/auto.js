document.addEventListener('DOMContentLoaded', function() {
  // 选择所有blockquote元素
  const blockquotes = document.querySelectorAll('blockquote');
  const colorClasses = [
    'quote-blue',
    'quote-green',
    'quote-orange',
    'quote-red',
    'quote-purple'
  ];
  
  if (blockquotes.length === 0) {
    console.log('未找到blockquote元素');
    return;
  }
  
  blockquotes.forEach((blockquote, index) => {
    // 计算颜色索引（循环分配）
    const colorIndex = index % colorClasses.length;
    
    // 移除所有可能的颜色类
    colorClasses.forEach(cls => {
      blockquote.classList.remove(cls);
    });
    
    // 添加当前颜色类
    blockquote.classList.add(colorClasses[colorIndex]);
    console.log(`为第${index+1}个blockquote添加了${colorClasses[colorIndex]}`);
  });
});
