define(['$'], function($) {
    
    $.widget('ui.heading', {        

        templates: {

            main: '\
                <span class="title">{{title}}</span>\
                {{if $data.btns && $data.btns.length}}\
                    <div class="btn-group pull-right">\
                        {{tmpl(btns) "btn"}}\
                    </div>\
                {{/if}}',

            btn: '\
                <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" class="action {{if classes}}{{classes}}{{else}}btn btn-default{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                    {{if icon}}<i class="{{icon}}"></i>{{/if}}{{text}}\
                </a>'
        },

        options: {

            title: '',

            btns: []
        },

        _create: function(){
            this._addClass('ui-heading');

            this._on({
                'click .action': '_clickAction'
            });

            this._on(this.window, {
                'scroll': '_scroll'
            });
        },

        _init: function(){            
            this.element.html(this._tmpl('main', this.options));
        },

        _clickAction: function(event, ctx){
            if($.isFunction(ctx.data.click)){
                ctx.data.click.call(this.element[0], event, ctx.data);
                return false;
            }
        },

        _scroll: function (event, ctx) {
            var width = this.element.width();
            if(this.window.scrollTop() > 50){
                this.element.addClass('pin').width(width);
            }else{
                this.element.removeClass('pin').width('auto');
            }
        }

    });    
});