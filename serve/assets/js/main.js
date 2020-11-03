define(['jquery', 'layout'], function($){

    $('.layout').layout();

    /*
    var layoutAsideMenu = $('.layout-aside > .menu').on('click', '.collapse a', function(event){
        var href = $(this).attr('href');
        alert(href);
        setGlobal(href, null);
        window.loadPage(href);
        return false;
    });
    */

    //全局页面加载方法
    window.loadPage = function(page, record){
        if(location.hash == '#' + page){
            $(window).trigger('hashchange');
        }else{
            location.hash = page;
            if(record){
                setGlobal(page, record);
            }
        }
    };

    //hash改变触发事件
    $(window).on('hashchange', function(event){
        loadPageByHash();
    });

    //页面加载
    window._loadPage = function(page, record){
        var $element = $('.layout-article').empty();
        var data = $element.data();
        $.each(data, function(key, value){
            if(/ui/.test(key)){
                $element[value.widgetName]('destroy');
            }
        });

        require([page], function(res){
            //G.page = page;
            $(window).scrollTop(0);
            res(record);
            /*
             try{
             res(record);
             }catch(e){
             location.replace(location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''));
             }
             */
        });

        //asid菜单acive
        $('.layout-aside > .menu')
            .find('li.active').removeClass('active').end()
            .find('a[href="' + page.replace(/Detail/, '') + '"]')
            .closest('.menu').collapse('show').end()
            .closest('li').addClass('active');
    };

    //根据hash值加载页面
    var loadPageByHash = function(){
        var record;
        var page = location.hash.substring(1);
        //var priv = !!layoutAside.find('.leafnode>a[href=' + page + ']').length;
        if(page/* && priv*/){
            record= getGlobal(page);
            window._loadPage(page, record);
        }
    };

    //刷新页面
    loadPageByHash();

    //ajax全局设置
    $(document)
        .ajaxError(function(res){
            require(['notice'], function(){
                console.log(res.message)
                $('<div>').notice({
                    type: 'danger',
                    message: res.message||'服务器异常，请稍后再试！',
                    time: 2000
                });
            });
        })
        .ajaxComplete(function(event, xhr, settings){
            try{
                var locat = xhr.getAllResponseHeaders();
                var result = JSON.parse(xhr.responseText);
                if(result.code == 'err100002'){
                    require(['notice'], function(){
                        $('<div>').notice({
                            type: 'danger',
                            message: '登录过期，请刷新页面重试！',
                            time: 2000
                        });
                    });
                    return true;
                }else if(result.code == 'err100003'){
                    window.loadPage('unauthorized');
                    return true;
                }
            }
            catch(e){}
        });

});