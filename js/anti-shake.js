// 防止重复初始化造成的变量重复声明与事件重复绑定
(function () {
    if (window.__antiShakeInited__) return;
    window.__antiShakeInited__ = true;

    // 防抖计时器仅在本作用域内存在，避免与其他脚本冲突
    let timerForDebounce = null;

    // 导出一个全局防抖函数（如有需要复用），避免重复覆盖
    window.debounce = window.debounce || function (fn, time) {
        if (timerForDebounce !== null) clearTimeout(timerForDebounce);
        timerForDebounce = setTimeout(fn, time);
    };

    // 复制提醒（存在依赖时才执行）
    document.addEventListener("copy", function () {
        window.debounce(function () {
            if (window.Vue) {
                new Vue({
                    data: function () {
                        if (this.$notify) {
                            this.$notify({
                                title: "哎嘿！复制成功🍬",
                                message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
                                position: 'top-left',
                                offset: 50,
                                showClose: true,
                                type: "success",
                                duration: 5000
                            });
                        }
                    }
                });
            } else {
                // 无 Vue 时退化为简易提示
                if (window.Swal && Swal.fire) {
                    Swal.fire({title:'已复制', text:'内容已复制到剪贴板', icon:'success', timer:1200, showConfirmButton:false});
                } else if (window.snackbarShow) {
                    snackbarShow('内容已复制到剪贴板', false, 1200);
                }
            }
        }, 300);
    });

    window.showToast = window.showToast || function (msg) {
        if (window.Swal && Swal.fire) {
            Swal.fire({title:'已复制', text: msg || '内容已复制到剪贴板', icon:'success', timer:1200, showConfirmButton:false});
        } else if (window.snackbarShow) {
            snackbarShow('内容已复制到剪贴板', false, 1200);
        } else {
            alert('内容已复制到剪贴板');
        }
    };
})();