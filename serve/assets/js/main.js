define(['$', 'router', 'layout', 'dialog', 'notice'], function($){

    $('#layout').layout({

        //theme: 'inverse',

        laying: 'container',
        
        brand: {
            icon: 'glyphicon glyphicon-globe',
            text: 'JIAN2JUN',
            href: '/'
        },

        source: function(ctx, next){
            ctx.source = {};
            next(ctx);
        },

        collapse: function (ctx) {
            return {
                left: [
                    {
                        type: 'search',
                        btn: {
                            click: function (event, ctx) {
                                $('<div>').notice({
                                    content: JSON.stringify(ctx)
                                });
                            }
                        }
                    },
                    {
                        type: 'btn',
                        text: '弹出对话框',
                        click: function () {
                            $('<div>').dialog({
                                title: '我是对话框',
                                content: '我是对话框的内容~',
                                btns: [
                                    {
                                        text: '关闭',
                                        click: function () {
                                            $(this).dialog('close');
                                        }
                                    }
                                ]
                            });
                        }
                    },
                    {
                        type: 'nav',
                        items: [
                            {
                                text: '概述',
                                href: '/'
                            },
                            {
                                text: '基础组件',
                                dropdown: [
                                    {text: '对话框', href: '/dialog'},
                                    {text: '信息提示', href: '/notice'},
                                    {text: '表格', href: '/table'},
                                    {text: '表单', href: '/form'}
                                ]
                            },
                            {
                                text: '高级组件',
                                dropdown: (function () {
                                    return [
                                        {text: '布局', href: '/layout'},
                                        {text: '集合页', href: '/group'},
                                        {text: '列表页', href: '/listPage'},
                                        {text: '详细页', href: '/detailPage'},
                                        {text: '分步页', href: '/stepPage'},
                                        {text: '弹出页', href: '/dialogPage'}
                                    ];
                                })()
                            }
                        ]
                    }

                ],
                right: [
                    {
                        type: 'text',
                        text: 'abc'
                    },
                    {
                        type: 'nav',
                        items: [
                            {
                                text: '基础组件',
                                dropdown: [
                                    {text: '对话框', href: '/dialog'},
                                    {text: '信息提示', href: '/notice'},
                                    {text: '表格', href: '/table'},
                                    {text: '表单', href: '/form'}
                                ]
                            },
                            {
                                text: '高级组件',
                                dropdown: (function () {
                                    return [
                                        {text: '布局', href: '/layout'},
                                        {text: '集合页', href: '/group'},
                                        {text: '列表页', href: '/listPage'},
                                        {text: '详细页', href: '/detailPage'},
                                        {text: '分步页', href: '/stepPage'},
                                        {text: '弹出页', href: '/dialogPage'}
                                    ];
                                })()
                            }
                        ]
                    }
                ]
            };
        },

        menu: function (ctx) {
            return [
                {
                    icon: 'glyphicon glyphicon-dashboard',
                    text: '概述',
                    href: '/'
                },
                {
                    icon: 'glyphicon glyphicon-tasks',
                    text: '基础组件',
                    menu: [
                        {text: '对话框', href: '/dialog'},
                        {text: '信息提示', href: '/notice'},
                        {text: '表格', href: '/table'},
                        {text: '表单', href: '/form'}
                    ]
                },
                {
                    icon: 'glyphicon glyphicon-magnet',
                    text: '高级组件',
                    menu: [
                        {text: '布局', href: '/layout'},
                        {text: '集合页', href: '/group'},
                        {text: '列表页', href: '/listPage'},
                        {text: '详细页', href: '/detailPage'},
                        {text: '分步页', href: '/stepPage'},
                        {text: '弹出页', href: '/dialogPage'}
                    ]
                }
            ]
        },

        footer: '4PX后台管理系统　@copyright 2015-2020'
    });
});