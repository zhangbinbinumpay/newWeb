/**
 * Created by admin on 2017/9/24.
 */
// export default function() {
//     var designWidth = 375,maxWidth = 1920;
//     var doc = document,
//         win = window;
//     var docEl = doc.documentElement;
//     var tid;
//     var rootItem,rootStyle;
//
//     function refreshRem() {
//         var width = docEl.getBoundingClientRect().width;
//         if (!maxWidth) {
//             maxWidth = 540;
//         };
//         if (width > maxWidth) {
//             width = maxWidth;
//         }
//         //与淘宝做法不同，直接采用简单的rem换算方法1rem=100px
//         var rem = width * 100 / designWidth;
//         //兼容UC开始
//         rootStyle="html{font-size:"+rem+'px !important}';
//         rootItem = document.getElementById('rootsize') || document.createElement("style");
//         if(!document.getElementById('rootsize')){
//             document.getElementsByTagName("head")[0].appendChild(rootItem);
//             rootItem.id='rootsize';
//         }
//         if(rootItem.styleSheet){
//             rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle)
//         }else{
//             try{rootItem.innerHTML=rootStyle}catch(f){rootItem.innerText=rootStyle}
//         }
//         //兼容UC结束
//         docEl.style.fontSize = rem + "px";
//         console.log('  docEl.style.fontSize:'+  docEl.style.fontSize);
//     };
//     refreshRem();
//
//     win.addEventListener("resize", function() {
//         clearTimeout(tid); //防止执行两次
//         tid = setTimeout(refreshRem, 300);
//     }, false);
//
//     win.addEventListener("pageshow", function(e) {
//         if (e.persisted) { // 浏览器后退的时候重新计算
//             clearTimeout(tid);
//             tid = setTimeout(refreshRem, 300);
//         }
//     }, false);
//
//     if (doc.readyState === "complete") {
//         doc.body.style.fontSize = "16px";
//     } else {
//         doc.addEventListener("DOMContentLoaded", function(e) {
//             doc.body.style.fontSize = "16px";
//         }, false);
/*     }
 };
 */

/* 
// 基准大小
const baseSize = 16
// 设置 rem 函数
function setRem () {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750
    // 设置页面根节点字体大小
    // document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
    document.documentElement.style.fontSize = (baseSize * scale) + 'px'
	
	
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}
 */