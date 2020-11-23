define(['$'], function ($) {

    $.widget('ui.servicesPanel', {

        templates: {

            main: '\
                <ul class="nav nav-pills nav-justified">\
                    {{tmpl(source) "tab"}}\
                </ul>\
                <div class="tab-content"></div>',

            tab: '\
                <li><a href="javascript:;"><i class="{{icon}}"></i> {{title}}</a></li>',

            panel: '\
                <div>\
                    {{tmpl(items) "list"}}\
                </div>',

            list: '\
                <h6><i class="{{icon}}"></i> {{title}}</h6>\
                <div class="row">\
                    {{each items}}\
                        <div class="col-sm-4"><a href="{{url}}"><i class="{{icon}}"></i> {{title}}</a></div>\
                    {{/each}}\
                </div>',
        },

        options: {
            source: []
        },

        _create: function () {
            this._addClass('ui-servicesPanel');
            this._on({
                'click .nav-pills > li': '_clickPill'
            });
        },

        _init: function () {
            this.element.html(this._tmpl('main'));
            this.element.find('.nav-pills > li').eq(0).click();
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