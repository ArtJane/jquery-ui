define(['$', 'group', 'dialog'], function ($) {

    var config = `
<pre>
    $(element).dialog({
        title: '标题', //标题，缺省值：'' 
        content: '我是内容~', //内容，缺省值：''                
        closable: true, //显示右上角关闭按钮，缺省值：true                        
        backdrop: true, //点击背景关闭，缺省值：true                         
        keyboard: true, //按Ecs键关闭，缺省值：true          
        mask: true, //显示遮罩层，缺省值：true                        
        fade: true, //渐入渐出效果，缺省值：true                         
        centered: true, //弹出垂直居中，缺省值：false                        
        size: '',　//弹框尺寸，缺省值：''，可选值：'sm'|''|'lg'
        btns: [ //按钮组，缺省值：[]
            {
                icon: 'glyphicon glyphicon-ok-sign', //图标，缺省值：''
                text: '确定', //文本，缺省值：''
                classes: 'btn btn-primary', //样式，缺省值：'btn btn-default'
                href: '/', //跳转地址，缺省值：'javascript:;'
                target: '_blank', //跳转打开方式，缺省值：'_self'
                click: function(){ //点击事件
                    ...
                    $(this).dialog('close'); //关闭dialog
                }
            },
            ...
        ]
    });
</pre>
    `;

    return function (ctx) {

        $(ctx.element).group({

            title: '对话框',

            headingBtns: [
                {
                    text: '小号框',
                    click: function () {
                        $('<div>').dialog({
                            title: '标题',
                            content: '我是内容~',
                            size: 'sm',
                            btns: [
                                {
                                    text: '确定',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    text: '中号框',
                    click: function () {
                        $('<div>').dialog({
                            title: '标题',
                            content: '我是内容~',
                            btns: [
                                {
                                    text: '确定',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    text: '大号框',
                    click: function () {
                        $('<div>').dialog({
                            title: '标题',
                            content: '我是内容~',
                            size: 'lg',
                            btns: [
                                {
                                    text: '确定',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    text: '垂直居中',
                    click: function () {
                        $('<div>').dialog({
                            title: '标题',
                            content: '我是内容~',
                            centered: true,
                            btns: [
                                {
                                    text: '确定',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    text: '禁用关闭',
                    click: function () {
                        $('<div>').dialog({
                            title: '标题',
                            content: '我是内容~',
                            closable: false,
                            backdrop: false,
                            keyboard: false,
                            btns: [
                                {
                                    text: '确定',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    text: '禁用效果',
                    click: function () {
                        $('<div>').dialog({
                            title: '标题',
                            content: '我是内容~',
                            fade: false,
                            btns: [
                                {
                                    text: '确定',
                                    click: function(){
                                        $(this).dialog('close');
                                    }
                                }
                            ]
                        });
                    }
                }
            ],

            items: [
                {
                    title: 'dialog 配置',
                    key: 'config',
                    widget: function (ctx) {
                        return $(ctx.element).html(config);
                    }
                }
            ]
        });
    }
});