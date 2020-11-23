define(['jquery'], function($) {

    // 默认延迟时间
    var readyDelayTime = 7000;

    if(!$.fn.selector){
        $.fn.init = (function (orig) {
            return function (selector, context, root) {
                var inst = orig.call(this, selector, context, root);
                inst.selector = selector;
                return inst;
            }
        })($.fn.init);
        $.fn.init.prototype = $.fn;
    }

    $.fn.ready = (function (orig) {
        return function (fn) {
            var that = this;
            if(this[0] === document){
                return orig.call(this, fn);
            }
            else{
                if(this.length){
                    fn.call(this[0], $);
                }
                else{
                    $.Deferred(function (dfd) {
                        var element;
                        var interval = setInterval(function () {
                            element = $(that.selector);
                            if(element.length){
                                clearInterval(interval);
                                dfd.resolveWith(element[0], $);
                            }
                            else{
                                readyDelayTime -= 50;
                                if(readyDelayTime <= 0){
                                    clearInterval(interval);
                                }
                            }
                        }, 50);
                    }).done(fn);
                }
                return this;
            }
        }

    })($.fn.ready);

});