define(['$', 'router', 'layout', 'dialog', 'notice'], function($){

    $('#layout').layout({

        //theme: 'inverse',

        laying: 'container',
        
        brand: {
            icon: 'glyphicon glyphicon-globe',
            text: 'jQuery-J2UI',
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
                                text: '通知',
                                dropdown: [
                                    {text: '一个通知', href: '/'},
                                    {text: '另一个通知', href: '/'}
                                ]
                            },
                            {
                                text: '任务',
                                dropdown: (function () {
                                    return [
                                        {text: '一个任务', href: '/'},
                                        {text: '另一个任务', href: '/'}
                                    ];
                                })()
                            },
                            {
                                text: '第三方跳转',
                                href: '/'
                            }
                        ]
                    }

                ],
                right: [
                    {
                        type: 'nav',
                        items: [
                            {
                                text: '用户中心',
                                dropdown: (function () {
                                    return [
                                        {text: '姓名：jian2jun', href: '/'},
                                        {text: '手机: 18800000000', href: '/'}
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
                    icon: 'glyphicon glyphicon-comment',
                    text: '对话框',
                    menu: [
                        {text: '配置', href: '/dialogs/config'},
                        {text: '小号', href: '/dialogs/sm'},
                        {text: '中号', href: '/dialogs/md'},
                        {text: '大号', href: '/dialogs/lg'},
                        {text: '垂直居中', href: '/dialogs/centered'},
                        {text: '禁用关闭', href: '/dialogs/closable'},
                        {text: '禁用效果', href: '/dialogs/fade'}
                    ]
                },
                {
                    icon: 'glyphicon glyphicon-comment',
                    text: '信息提示',
                    menu: [
                        {text: '配置', href: '/notices/config'},
                        {text: '信息', href: '/notices/info'},
                        {text: '成功', href: '/notices/success'},
                        {text: '警告', href: '/notices/warning'},
                        {text: '失败', href: '/notices/danger'},
                        {text: '弹出多个', href: '/notices/many'}
                    ]
                },
                {
                    icon: 'glyphicon glyphicon-info-sign',
                    text: '表格',
                    menu: [
                        {text: '配置', href: '/tables/config'},
                        {text: '基本', href: '/tables/base'},
                        {text: '列渲染', href: '/tables/columns'},
                        {text: '动态数据', href: '/tables/source'},
                        {text: '分页', href: '/tables/paging'},
                        {text: '记录操作', href: '/tables/action'},
                        {text: '记录选择', href: '/tables/select'}
                    ]
                },
                {
                    icon: 'glyphicon glyphicon-record',
                    text: '表单',
                    menu: [
                        {text: '配置', href: '/forms/config'},
                        {text: '基本', href: '/forms/base'},
                        {text: '富文本', href: '/forms/editor'}
                    ]
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