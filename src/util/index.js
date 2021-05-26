//判断是否为空对象
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

// 校验输入的用户名，数字、字母、汉字，长度范围2-16
function checkUserName(userName) {
    var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{2,16}$/;
    if (reg.test(userName)) {
        return true;
    } else {
        return false;
    }
}

// 校验输入的手机号
function checkPhone(phone) {
    var reg = /^1[3-9]\d{9}$/;
    if (reg.test(phone)) {
        return true;
    } else {
        return false;
    }
}

// 校验登录状态
function checkLogin() {

}

// 校验输入的手机号
// function regMobile(phone) {
//     var reg = /^1[3-9]\d{9}$/;
//     if (reg.test(phone)) {
//         return true;
//     } else {
//         return false;
//     }
// };

//给电话号码和身份证加星星
function jiaxinxin(data) {
    if (data.length == 11) {
        var data1 = data.substr(0, 3);
        var data2 = data.substr(7, 4);
        return data = data1 + "****" + data2;
    } else {
        var length = data.length;
        var data1 = data.substr(0, length - 12);
        var data2 = data.substr(length - 4, 4);
        return data = data1 + "********" + data2;
    }
};

//验证身份证 start
//身份证正则校验
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
function validateIdCard(idCard) {
    idCard = (idCard.replace(/ /g, "")).trim(); //去掉字符串头尾空格
    if (idCard.length == 15) {
        return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
    } else if (idCard.length == 18) {
        var a_idCard = idCard.split(""); // 得到身份证数组
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0; // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和
    }
    var valCodePosition = sum % 11; // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        return false;
    }
};

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
};

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
    } else {
        return true;
    }
};
//验证身份证 end

// 判断当前访问环境是否为微信APP内置浏览器
function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    // console.log(ua);
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false
    }
}

// 判断当前访问设备是否为iOS系统环境
function isIOS() {
    let u = navigator.userAgent, app = navigator.appVersion;
    // console.log(u);
    // console.log(app);
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);  // iOS终端
    return isIOS
}

// 本地存储localStorage
var storage = window.localStorage;
function getStorage(key) {
    return JSON.parse(storage[key])//得到的是处理过的对象
}
function getAllStorage(origin, type) {
    var vuexState = {};
    var localState = null;
    localState = jsonParse(storage[type]);//取到当前业务所需的数据
    // if(!localState){//项目初始化时候，如果[localType]_vuex为'空字串'那么初始化为原始state，
    //   setStorage('vuex_'+type,origin)
    // }
    var needParams = {};
    Object.keys(origin).forEach((key) => {
        /*用户登录信息各项目都统一从以下字段取,为了兼容老项目*/
        if (key === 'uid' || key === 'healthId' || key === 'loginInfo') {
            needParams['uid'] = storage.uid;
            needParams['healthId'] = storage.healthId;
            needParams['loginInfo'] = jsonParse(storage.loginInfo);
            /*其他业务字段从当前 [localType]_vuex里取*/
        } else {
            needParams[key] = localState[key] || origin[key];
        }
    });
    return needParams;
}
function setStorage(key, val) {
    if (typeof val === 'object') {//所有对象数据存成json字符串的形式
        storage[key] = JSON.stringify(val)
    } else {
        storage[key] = val
    }
}

// 将JSON字符串转为对象
function jsonParse(jsonStr) {
    if (!jsonStr) {
        return ''
    }
    var data;
    try {
        data = JSON.parse(jsonStr)
    } catch (e) {
        data = ''
    }
    return data
}

// 截取code index.html?from=singlemessage&code=1212&state=1212#/sign_submit
function getUrlParam(name) {
    var value;
    var url = window.location.search; //取得整个地址栏
    var hasSearchIndex = url.indexOf("?");
    if (hasSearchIndex > -1) {//地址栏有search
        var searchUrl = url.slice(hasSearchIndex + 1);
        // searchUrl = searchUrl.slice(searchUrl.indexOf('#'))
        var val = ''
        searchUrl.split("&").forEach(function (urlItem) {
            var key = urlItem.split("=")[0];
            if (key == name) {
                val = urlItem.split("=")[1]
            }
        });
        return val
    } else {//地址栏无search
        return ''
    }
    return ''
    var num = str.indexOf("?");
    str = url.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            value = arr[i].substr(num + 1);
            return value
        }
    }
}

// 解决页面弹窗引起的滚动穿透问题
function setHtmlScroll(v, flag) {
    // 禁止页面滚动
    if(flag) {
        v.curPos = document.documentElement.scrollTop || document.body.scrollTop;
        document.querySelector('.container').style.position = 'fixed';
        document.querySelector('.container').style.top = -v.curPos + 'px';
    }
    // 允许页面滚动
    if(!flag) {
        document.querySelector('.container').style.position = 'static';
        document.querySelector('.container').style.top = 'auto';
        window.scrollTo(0, v.curPos);
    }
}

export default {
    getStorage,
    getAllStorage,
    setStorage,
    isEmptyObject,
    checkUserName,
    checkPhone,
    checkLogin,
    // regMobile,
    jiaxinxin,
    validateIdCard,
    isWeixin,
    isIOS,
    getUrlParam,
    setHtmlScroll
}
