// 背景初始化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 背景图片配置
    const backgroundConfig = {
        light: 'https://source.fomal.cc/img/dm4.webp',      // 白天模式背景
        dark: 'https://source.fomal.cc/img/movie.webp',     // 夜间模式背景
        mobile_light: 'https://source.fomal.cc/img/default_cover_26.webp',  // 手机端白天背景
        mobile_dark: 'https://source.fomal.cc/img/movie.webp'               // 手机端夜间背景
    };
    
    // 获取当前主题
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
    
    // 检查是否为移动设备
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // 根据主题和设备类型设置背景
    function setBackgroundByTheme() {
        const body = document.body;
        const html = document.documentElement;
        const currentTheme = getCurrentTheme();
        const isMobileDevice = isMobile();
        
        let backgroundUrl;
        
        if (isMobileDevice) {
            backgroundUrl = currentTheme === 'dark' ? backgroundConfig.mobile_dark : backgroundConfig.mobile_light;
        } else {
            backgroundUrl = currentTheme === 'dark' ? backgroundConfig.dark : backgroundConfig.light;
        }
        
        // 设置背景图片
        body.style.backgroundImage = `url(${backgroundUrl})`;
        html.style.backgroundImage = `url(${backgroundUrl})`;
        
        // 确保背景属性正确设置
        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repeat';
        
        html.style.backgroundAttachment = 'fixed';
        html.style.backgroundSize = 'cover';
        html.style.backgroundPosition = 'center';
        html.style.backgroundRepeat = 'no-repeat';
        
        console.log(`背景已更新: ${currentTheme}模式, ${isMobileDevice ? '移动端' : '桌面端'}, 图片: ${backgroundUrl}`);
    }
    
    // 初始化背景
    setBackgroundByTheme();
    
    // 监听主题切换，重新设置背景
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                // 延迟一点时间确保主题切换完成
                setTimeout(setBackgroundByTheme, 200);
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // 监听窗口大小变化，重新设置背景
    window.addEventListener('resize', function() {
        setTimeout(setBackgroundByTheme, 100);
    });
    
    // 确保星空背景正确显示
    if (typeof dark === 'function') {
        setTimeout(dark, 500);
    }
    
    // 确保canvas_nest正确显示
    if (window.canvas_nest) {
        setTimeout(function() {
            if (typeof window.canvas_nest === 'function') {
                window.canvas_nest();
            }
        }, 1000);
    }
});

// 页面加载完成后再次检查背景
window.addEventListener('load', function() {
    setTimeout(function() {
        const body = document.body;
        if (!body.style.backgroundImage || body.style.backgroundImage === 'none') {
            // 重新设置背景
            const event = new Event('DOMContentLoaded');
            document.dispatchEvent(event);
        }
    }, 500);
});
