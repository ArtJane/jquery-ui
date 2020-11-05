define(["jquery", "@widgets/base"], function ($){

    $.widget("ui.title", $.ui.base, {

        templates: {
            main: `
                <div class="d-flex justify-content-between px-3 py-2 bg-light">
                    <h3>{{title}}</h3>
                    <div class="btn-group">
                        {{tmpl(buttons) "btn"}}                        
                    </div>                
                </div>
            `,

            btn: `
                <a href="{{href}}" class="action {{classes}}" target="{{target}}">
                    {{text}}
                </a>
            `
        },

        options: {
            title: "",
            buttons: [
                /*
                {
                    href: "/",
                    target: "_self",
                    text: "",
                    classes: "btn btn-primary",
                    click: function(){}
                }
                */
            ]
        },

        _create: function (){
            this._on({
                "click a.action": '_clickAction'
            });
        },

        _init: function (){
            this._setButtons();
            this.element.html(this._tmpl("main", this.options));
        },

        _setButtons: function (){
            this.options.buttons = $.map(this.options.buttons, function (item){
                return $.extend({
                    href: "javascript:;",
                    target: "_self",
                    text: "",
                    classes: "btn btn-primary"
                }, item);
            });
        },

        _clickAction: function (e){
            var tmpl = e.data.tmpl;
            var data = tmpl.data;
            if($.isFunction(data.click)){
                data.click.call(this.element[0], e);
            }
        }

    });

});