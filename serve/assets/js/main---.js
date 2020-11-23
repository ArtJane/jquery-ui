define(['$', 'layout', 'servicesPanel', 'userPanel'], function($){

    $(document)
        .ajaxSend(function (event, xhr, options) {
            if(options.url.charAt(0) === '/'){
                options.url = `${config.ajax}${options.url}`;
            }
        });
    
    $('#layout').layout({
        
        brand: {            
            text: '后台管理系统',
            href: G.workbenchUrl
        },

        source: function(ctx, next){
            $.ajax({
                url:  G.componentsUrl,
                type: 'POST',
                data: {
                    clientId: G.clientId || 'IXG0xerbr2iB8RHD',
                    userId: G.userId,
                    isInternational: false
                },
                success: function(res){
                    ctx.source = res;
                    next(ctx);
                }
            });
        },

        collapse: function (ctx) {
            return {
                left: [
                    {
                        type: 'nav',
                        items: [
                            {
                                text: '产品与服务',
                                dropdown: function(ctx){
                                    $(ctx.element).servicesPanel({
                                        source: $.map(ctx.source.headInfo.dimensionList, function (item) {
                                            return {
                                                title: item.name,
                                                items: $.map(item.categoryList, function(item){
                                                    return {
                                                        icon: 'glyphicon glyphicon-plus',
                                                        title: item.name,
                                                        items: $.map(item.systemList, function(item){
                                                            return {
                                                                icon: 'glyphicon glyphicon-menu-right',
                                                                title: item.name,
                                                                url: item.url
                                                            }
                                                        })
                                                    };
                                                })
                                            }
                                        })
                                    });
                                }
                            }
                        ]
                    }
                ],
                right: [
                    {
                        type: 'nav',
                        items: [
                            {
                                text: ctx.source.headInfo.employee.fullName,
                                icon: 'glyphicon glyphicon-user',
                                dropdown: function(ctx){
                                    var employee = ctx.source.headInfo.employee;
                                    $(ctx.element).userPanel({
                                        source: {
                                            id: employee.empCode,
                                            username: employee.fullName,
                                            phone: employee.phone,
                                            email: employee.email,
                                            address: employee.country + employee.province + employee.city,
                                            changePasswordUrl: G.changePasswordUrl,
                                            workbenchUrl : G.workbenchUrl,
                                            //timezone: this._getCookies('pref-timezone')
                                        }
                                    });
                                }
                            }
                        ]
                    }
                ]
            };
        },

        menu: function (ctx) {
            return $.map(ctx.source.sideBarInfo.menus, function(item){
                return {
                    icon: item.icon,
                    text: item.name,
                    menu: $.map(item.children, function(item){
                        return {
                            icon: item.icon,
                            text: item.name,
                            href: item.url
                        };
                    })
                };
            });
        },

        bar: [
            {
                icon: 'glyphicon glyphicon-comment',
                text: 'tab1',
                active: true,
                content: function (ctx) {
                    $(ctx.element).html("aaaaaaaaaaaaaa");
                }
            },
            {
                icon: 'glyphicon glyphicon-retweet',
                text: 'tab2',
                content: function (ctx) {
                    $(ctx.element).html("bbbbbbbbbbbbbb");
                }
            },
            {
                icon: 'glyphicon glyphicon-globe',
                text: 'tab3',
                content: function (ctx) {
                    $(ctx.element).html("ccccccccccccccccc");
                }
            }
        ],

        footer: '4PX后台管理系统　@copyright 2015-2020'
    });

});