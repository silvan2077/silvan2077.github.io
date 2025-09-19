// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
    if (TT !== null) clearTimeout(TT);
    TT = setTimeout(fn, time);
}
// 复制提醒
document.addEventListener("copy", function () {
    debounce(function () {
        new Vue({
            data: function () {
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
        })
    }, 300);
})
function showToast(msg) {
    if (window.Swal && Swal.fire) {
      Swal.fire({title:'已复制', text: msg || '内容已复制到剪贴板', icon:'success', timer:1200, showConfirmButton:false});
    } else if (window.snackbarShow) {
      snackbarShow('内容已复制到剪贴板', false, 1200);
    } else {
      alert('内容已复制到剪贴板');
    }
  }