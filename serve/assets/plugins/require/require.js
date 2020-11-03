/*----------------------------
 *配置文件
 *--------------------------*/

requirejs = {
    suffix: '.js?v=20181130',// + new Date().getTime(),
    base: '/',
    paths: {
        'widgets/': [
            'base',         //基类
            'dialog',       //对话框
            'notice',       //通知
            'paging',       //分页
            'table',        //表格
            'form',         //表单
            'group',        //组
            'steps',        //分步
            'listpage',     //列表页
            'stepspage',    //分步页
            'coupons',      //优惠券
            'couponsGroup',  //优惠券组
            'channels',      //产品渠道
            'cards',      //卡券
            'card'
        ],
        jquery: 'plugins/jquery/jquery.min',
        bootstrap: 'plugins/bootstrap/js/bootstrap.min',
        widget: 'plugins/widget/widget',
        jqueryui: 'plugins/jqueryui/jqueryui',
        moment: 'plugins/moment/moment.min',
        daterangepicker: 'plugins/daterangepicker/daterangepicker.min',
        jeDate:'plugins/jedate/jquery.jedate',
        dateTransform:'plugins/jedate/dateTransform',
        tinymce: '/plugins/tinymce/tinymce.min',
        jquerytinymce: '/plugins/tinymce/jquery.tinymce.min',
        chosen: '/plugins/chosen/chosen.jquery.min',
        clipboard: '/plugins/clipboard/clipboard.min',
        validate: '/plugins/validate/jquery.validate.min',
        vue: '/plugins/vue/vue.min'
    },
    auto: 'js/',
    main: 'main',
    deps: {
        bootstrap: ['jquery'],
        jquerytinymce: ['jquery', 'tinymce'],
        chosen: ['jquery'],
        uedbase: ['jquery', 'bootstrap']
    }
};

/*----------------------------
 *模块加载器
 *--------------------------*/

(function(window, undefined){

    var doc = window.document;
    var head = doc.head || doc.documentElement;
    var uid = 0;

    var type = function(obj){
        return Object.prototype.toString.call(obj).replace(/\[object |\]/g, '').toLowerCase();
    };

    var isEmptyObject = function( obj ) {
        var name;
        for(name in obj ) {
            return false;
        }
        return true;
    };

    var getCurrentScript = function(){
        if(doc.currentScript){
            return doc.currentScript.src;
        }
        for (
            var scripts = head.getElementsByTagName('script'),
                i = scripts.length - 1,
                script;
            script = scripts[i--];
        ) {
            if (script.readyState === 'interactive') {
                return script.src;
            }
        }
    };

    var inArray = function(item, items){
        for(var i = 0; i < items.length; i++){
            if(item === items[i]){
                return i;
            }
        }
        return -1;
    };

    var getModule = function(key, sups, factory, path){
        var mod = config.modCache[key];
        if(!mod){
            mod = config.modCache[key] = new Module(key, sups, factory, path);
        }
        return mod;
    };

    var Module = function(key, sups, factory, path){
        this.key = key;
        this.sups = sups;
        this.factory = factory;
        this.path = path;
        this.subs = [];
        this.count = this.sups.length;
        this.state = (key === 'require' || key === 'exports') ? 'complete' : 'init';

        if(this.count){
            this.init();
        }
    };

    var config = requirejs || {};

    config.suffix = config.suffix || '.js';
    config.base = config.base || '/';
    config.paths = config.paths || {};
    config.auto = config.auto || 'js/';
    config.deps = config.deps || {};
    config.main = config.main || '';
    config.modActive = null;
    config.modCache = {};

    Module.prototype = {

        constructor: Module,

        init: function(){
            var key, path;

            for(var i = 0; i < this.sups.length; i++){
                key = this.sups[i];
                if(typeof key === 'string'){
                    path = this.getPath(key);
                    this.sups[i] = getModule(key, [], null, path);
                }
                this.sups[i].subs.push(this);
            }
        },

        getPath: function(key){

            var absPath, path, k, v;

            if(key === 'require' || key === 'exports'){
                return null;
            }

            absPath = /^(http|https|\/)/;

            if(absPath.test(key)){
                path = key;
            }else{
                for(k in config.paths){
                    v = config.paths[k];
                    if(type(v) === 'array'){
                        if(inArray(key, v) > -1){
                            path = k + key;
                            break;
                        }
                    }else if(key === k){
                        path = v;
                        break;
                    }
                }
                if(!path){
                    path = config.auto + key;
                }

                if(!absPath.test(path)){
                    path  = config.base + path;
                }
            }

            if(!/\.js$/.test(path)){
                path += config.suffix;
            }

            return path;
        },

        load: function(){
            var mod;

            for(var i = 0; i < this.sups.length; i++){
                mod = this.sups[i];
                switch (mod.state){
                    case 'init':
                        if(config.deps[mod.key]){
                            (function(m){
                                m.isDeps = true;
                                m.fetched(config.deps[m.key], function(){
                                    m.fetching();
                                });
                            })(mod);
                        }else{
                            mod.fetching();
                        }
                        break;
                    case 'complete':
                        this.count--;
                        break;
                }
            }

            if(this.count < 1){
                this.complete();
            }
        },

        fetching: function(){
            var that = this;
            var script= doc.createElement('script');

            script.async = 'async';
            script.src= this.path;
            script.onload = script.onreadystatechange = function(e){
                if(!script.readyState || /loaded|complete/.test(script.readyState)){
                    script = script.onload = script.onreadystatechange = null;
                    if(that.isDeps){
                        that.notice();
                        return;
                    }
                    if(config.modActive){
                        that.fetched(config.modActive.sups, config.modActive.factory);
                    }else if(that.count < 1 && that.state !== 'complete'){
                        that.complete();
                    }
                }
            };

            head.appendChild(script);
            this.state = 'fetching';
        },

        fetched: function(sups, factory){
            if(config.modActive){
                config.modActive = null;
            }

            this.sups = sups;
            this.factory = factory;
            this.count = this.sups.length;
            this.state = 'fetched';
            if(this.count){
                this.init();
            }
            this.load();
        },
        
        complete: function(){
            var args = [];
            var exports = {};

            for(var i = 0; i < this.sups.length; i++){
                switch (this.sups[i]['key']){
                    case 'require':
                        args[i] = window.require;
                        break;
                    case 'exports':
                        args[i] = exports;
                        break;
                    default:
                        args[i] = this.sups[i].exports;
                }
            }

            this.exports = this.factory && this.factory.apply(null, args);
            if(!this.exports && !isEmptyObject(exports)){
                this.exports = exports;
            }
            this.state = 'complete';

            if(!this.isDeps){
                this.notice();
            }
        },

        notice: function(){
            for(var i = 0; i < this.subs.length; i++){
                if((--this.subs[i].count) < 1 &&  this.subs[i].state !== 'complete'){
                    this.subs[i].complete();
                }
            }
        }
    };

    window.require = function(sups, factory){
        if(type(sups) === 'function'){
            factory = sups;
            sups = [];
        }    
        getModule(++uid, sups, factory).load();
    };

    var define = window.define = function(key, sups, factory){

        var path, prop, mod;

        if(typeof key === 'string'){

            if(type(sups) === 'function'){
                factory = sups;
                sups = [];
            }

            config.modCache[key]['fetched'](sups, factory);

        }else{

            if(type(key) === 'array'){
                factory = sups;
                sups = key;
            }else{
                factory = key;
                sups = [];
            }

            if(path = getCurrentScript()){
                for(prop in config.modCache){
                    mod = config.modCache[prop];
                    if(path.indexOf(mod['path']) > -1){
                        mod.fetched(sups, factory);
                        break;
                    }
                }
            }else{
                config.modActive = {
                    sups: sups,
                    factory: factory
                };
            }
        }
    };

    define.amd = true;

    if(config.main){
        getModule(++uid, [config.main]).load();
    }

})(window);