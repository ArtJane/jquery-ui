define(['$'], function ($) {

    $.widget('ui.userPanel', {

        templates: {

            main: '\
                <div class="media">\
                    <div class="media-body">\
                        <h4 class="media-heading">个人信息</h4>\
                        <p>姓　名：{{username}}</p>\
                        <p>手　机：{{phone}}</p>\
                        <p>邮　箱：{{email}}</p>\
                        <p>办公地：{{address}}</p>\
                    </div>\
                    <div class="media-right">\
                        <img class="media-object img-circle" src="/images/user.png" alt="用户头像">\
                    </div>\
                </div>\
                 <div class="time-zone media">\
                    <div class="zone-body media-body">\
                        <h4 class="zone-heading media-heading">时区信息</h4>\
                        <p>时  区：{{timezone}}</p>\
                    </div>\
                    <div class="media-right">\
                        <a href="{{workbenchUrl}}preSetting" class="btn btn-default btn-logout"  target="_blank">修改</a>\
                    </div>\
                 </div>\
                <p>\
                    <a href="{{changePasswordUrl}}" class="btn btn-primary">修改密码</a>\
                    <a href="/logout" class="btn btn-default btn-logout">注销</a>\
                </p>'
        },

        options: {
            source: []
        },

        _create: function () {
            this._addClass('ui-userPanel');
        },

        _init: function () {
            this.element.html(this._tmpl('main', this.options.source));
        },

        _clickPill: function(event, ctx){
            $(event.currentTarget)
                .closest('li').addClass('active')
                .siblings('.active').removeClass('active');

            this.element
                .find('.tab-content')
                .html(this._tmpl('panel', ctx.data));

            return false;
        }

    });

});