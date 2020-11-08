define(["jquery", "@widgets/base"], function($) {

    $.widget("ui.title", $.ui.base, {

        templates: {
            main: /* html */ `
                <div class="d-flex justify-content-between px-3 py-2 bg-light">
                    <h3>{{title}}</h3>
                    <div class="btn-group">
                        {{tmpl(buttons) "btn"}}                        
                    </div>                
                </div>
            `,

            btn: /* html */ `
                <a href="{{href}}" class="action {{classes}}">
                    {{text}}
                </a>
            `
        },

        options: {

            /* 
            标题 
            */
            title: "",

            /*
            右侧按钮组
            [
               {
                    href: "#",                      //跳转地址
                    text: "操作",                   //按钮文本
                    classes: "btn btn-primary",     //按钮样式
                    click: function(e){}            //按钮点击事件
                }     
            ]            
            */
            buttons: []
        },

        _create: function() {
            this._addClass("ui-title");
            this._on({
                "click a.action": '_clickAction'
            });
        },

        _init: function() {
            this._setButtons();
            this.element.html(this._tmpl("main", this.options));
        },

        _setButtons: function() {
            this.options.buttons = $.map(this.options.buttons, function(item) {
                return $.extend({
                    href: "javascript:;",
                    text: "",
                    classes: "btn btn-primary"
                }, item);
            });
        },

        _clickAction: function(e) {
            var tmpl = e.data.tmpl;
            var data = tmpl.data;
            if ($.isFunction(data.click)) {
                data.click.call(this.element[0], e);
            }
        }

    });

});