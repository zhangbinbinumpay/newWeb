/* 自定义一些全局Vux UI */
import Vue from 'vue'
import { AlertPlugin, LoadingPlugin, ToastPlugin, ConfirmPlugin, DatetimePlugin, XButton } from 'vux'

Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.component('x-button', XButton)

Vue.prototype.$g_alert = function (text, cb) {
    // 显示
    this.$vux.alert.show({
        title: '提示',
        content: text,
        hideOnBlur: true,
        onShow() { },
        onHide() { }
    })
};

Vue.prototype.$g_toast = function (text) {
    // 显示文字
    this.$vux.toast.text(text, 'middle')
};

Vue.prototype.$g_loadingShow = function (text) {
    this.$vux.loading.show({
        text: text ? text : '加载中...',
    })
};

Vue.prototype.$g_loadingHide = function () {
    // 隐藏
    this.$vux.loading.hide()
};

Vue.prototype.$g_confrimShow = function (text, okCb, cancelCb) {
    this.$vux.confirm.show({
        'hideOnBlur': true,
        'title': '提示',
        'content': text,
        onCancel() {
            cancelCb && cancelCb()
        },
        onConfirm() {
            okCb()
        }
    })
};

Vue.prototype.$g_confrimShowNoCancel = function (text, okCb) {
    this.$vux.confirm.show({
        'hideOnBlur': true,
        'showCancelButton': false,
        'title': '提示',
        'content': text,
        onConfirm() {
            okCb()
        }
    })
};

// 检查对象中的属性是否有为空的
Vue.prototype.$g_paramsValidate = function(params) {
    let flag = true;
    for (var key in params) {
        if (params[key] != '0' && !params[key]) {
            // this.$vux.toast.text('数据不全，请完善数据!', 'middle');
            return false; // 终止程序
        }
    }
    return flag;
}
