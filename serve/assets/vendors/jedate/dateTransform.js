//设置cookie
function setCookie(key, val, days) {
    var Now = new Date();
    Now.setDate(Now.getDate() + days);
    document.cookie = key + '=' + escape(val) + '; expires=' + Now;
}
//获取cookie
function getCookie(key) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == key) {
            return unescape(arr2[1]);
        };
    };
    return false;
}

// 日期转换（时间源(零时区毫秒)，返回日期是否包含时间(true或false)）
function dateTransform(sourceTimes, hasTimes) {
    if (!sourceTimes) {
        return sourceTimes;
    }
    // 获取时区设置
    var timeZone = getCookie('pref-timezone');
    // 与标准时的时差num
    if (timeZone) {
        var arr = timeZone.split(':');
        if (parseInt(arr[0]) >= 0) {
            var num = parseInt(arr[0]) + parseInt(arr[1]) / 60;
        } else {
            var num = parseInt(arr[0]) + (-parseInt(arr[1]) / 60);
        }
    } else {
        var num = -(new Date().getTimezoneOffset() / 60);
    }

    // 本地时区
    var localZone = 8;
    // 目标时区的毫秒
    var targetTimes = parseInt(sourceTimes) + (num * 3600000) - (localZone * 3600000);
    // 目标时区的日期对象
    var targetDate = new Date(targetTimes);
    var y = targetDate.getFullYear();
    var m = targetDate.getMonth() + 1;
    var m0 = m < 10 ? ('0' + m) : m;
    var d = targetDate.getDate();
    var d0 = d < 10 ? ('0' + d) : d;
    var hour = targetDate.getHours();
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = targetDate.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = targetDate.getSeconds();
    second = second < 10 ? ('0' + second) : second;

    // 获取格式设置
    if (getCookie('pref-format')) {//有设置
        var format = getCookie('pref-format');
    } else {//没设置
        if (getCookie('lang')) {//国际化设置
            if (getCookie('lang') == 'zh') {
                var format = 'zh-CN';
            } else {
                var format = 'en-GB';
            }
        } else {//浏览器设置
            var userLanguage = (navigator.browserLanguage || navigator.languages[0]).toLowerCase();
            if (userLanguage.indexOf('zh')!=-1) {
                var format = 'zh-CN';
            } else {
                var format = 'en-GB';
            }
        }
    }

    if (/-/.test(sourceTimes) || sourceTimes.length <= 4) {// 非时间戳
        
        if (format === 'en-GB') {// 英文调整顺序返回
            return sourceTimes.split('-').reverse().join('/')
        } else {// 中文去掉补位0返回
            return sourceTimes.replace(/-0|-/g, '/');
        }
    }
    
    // 返回对应的日期格式
    switch (format) {
        case 'zh-CN':
            if (hasTimes) { // 包含时分秒
                return y + '/' + m + '/' + d + ' ' + hour + ':' + minute + ':' + second;
            } else { // 不包含时分秒
                return y + '/' + m + '/' + d;
            }
            break;
        case 'en-GB':
            if (hasTimes) {
                return d0 + '/' + m0 + '/' + y + ' ' + hour + ':' + minute + ':' + second;
            } else {
                return d0 + '/' + m0 + '/' + y;
            }
            break;
        default:
            return y + '/' + m + '/' + d + ' ' + hour + ':' + minute + ':' + second;
    }
}

// 日期时间转换（时间源(零时区毫秒)，返回日期时间格式formatType：date(只显示年月日) time(只显示时分秒) dateTime(显示年月日时分秒)默认）
function timeTransform(sourceTimes, formatType) {
    if (!sourceTimes) {
        return sourceTimes;
    }
    var  sourceTime = new Date(sourceTimes.replace(new RegExp("-","gm"),"/")).getTime();


    // 获取时区设置
    var timeZone = this._getCookies('pref-timezone');
    // 与标准时的时差num
    if (timeZone) {
        var arr = timeZone.split(':');
        if (parseInt(arr[0]) >= 0) {
            var num = parseInt(arr[0]) + parseInt(arr[1]) / 60;
        } else {
            var num = parseInt(arr[0]) + (-parseInt(arr[1]) / 60);
        }
    } else {
        var num = -(new Date().getTimezoneOffset() / 60);
    }

    // 本地时区
    var localZone = -(new Date().getTimezoneOffset() / 60);
    // console.log('时区：' + num);
    // 目标时区的毫秒
    var targetTimes = parseInt(sourceTime) + (num * 3600000) - (localZone * 3600000);
    // 目标时区的日期对象
    var targetDate = new Date(targetTimes);
    var y = targetDate.getFullYear();
    var m = targetDate.getMonth() + 1;
    var m0 = m < 10 ? ('0' + m) : m;
    var d = targetDate.getDate();
    var d0 = d < 10 ? ('0' + d) : d;
    var hour = targetDate.getHours();
    hour = hour < 10 ? ('0' + hour) : hour;
    var minute = targetDate.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = targetDate.getSeconds();
    second = second < 10 ? ('0' + second) : second;

    // 获取格式设置
    if (this._getCookies('pref-format')) {//有设置
        var format = this._getCookies('pref-format');
    } else {//没设置
        if ( this._getCookies('lang')) {//国际化设置
            if ( this._getCookies('lang') == 'zh') {
                var format = 'zh-CN';
            } else {
                var format = 'en-GB';
            }
        } else {//浏览器设置
            var userLanguage = (navigator.browserLanguage || navigator.languages[0]).toLowerCase();
            if (userLanguage.indexOf('zh')!=-1) {
                var format = 'zh-CN';
            } else {
                var format = 'en-GB';
            }
        }
    }

    if (/-/.test(sourceTime) || sourceTime.length <= 4) {// 非时间戳
        if (format === 'en-GB') {// 英文调整顺序返回
            return sourceTime.split('-').reverse().join('/')
        } else {// 中文去掉补位0返回
            return sourceTime.replace(/-0|-/g, '/');
        }
    }

    // 返回对应的日期时间格式
    switch (format) {
        case 'zh-CN':
            if (formatType === 'date') { // 年月日
                return y + '-' + m + '-' + d;
            } else if (formatType === 'time') { // 时分秒
                return hour + ':' + minute + ':' + second;
            } else { // 年月日时分秒
                return y + '-' + m + '-' + d + ' ' + hour + ':' + minute + ':' + second;
            }
            break;
        case 'en-GB':
            if (formatType === 'date') { // 日月年
                return d0 + '-' + m0 + '-' + y;
            } else if (formatType === 'time') { // 时分秒
                return hour + ':' + minute + ':' + second;
            } else { // 日月年时分秒
                return d0 + '-' + m0 + '-' + y + ' ' + hour + ':' + minute + ':' + second;
            }
            break;
        default:
            return y + '-' + m + '-' + d + ' ' + hour + ':' + minute + ':' + second;
    }
}