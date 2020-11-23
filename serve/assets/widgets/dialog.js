define(['$'], function($) {

    $.expr[':']['fixed'] = function(elem) {
        return $(elem).css('position') ==='fixed';
    };

    $.widget('ui.dialog', {

        templates: {

            main: '\
				<div class="modal-dialog {{if size}}modal-{{size}}{{/if}}">\
					<div class="modal-content">\
						{{if title}}{{tmpl "header"}}{{/if}}\
						<div class="modal-body"></div>\
						{{if $data.btns && $data.btns.length}}\
							{{tmpl "footer"}}\
						{{/if}}\
					</div>\
				</div>',

            header: '\
				<div class="modal-header">\
					{{if closable}}<button class="close"><span>&times;</span></button>{{/if}}\
					<h4 class="modal-title">{{title}}</h4>\
				</div>',

            footer: '\
				<div class="modal-footer">\
					{{tmpl(btns) "btn"}}\
				</div>',

            btn: '\
                <a href="{{if href}}{{href}}{{else}}javascript:;{{/if}}" class="action {{if classes}}{{classes}}{{else}}btn btn-default{{/if}}" {{if target}}target="{{target}}"{{/if}}>\
                    {{if icon}}<i class="{{icon}}"></i>{{/if}}\
                    {{text}}\
                </a>'

        },

        options: {

            title: '',

            closable: true,

            backdrop: true,

            keyboard: true,

            mask: true,            

            fade: true,

            centered: false,

            size: '',

            content: '',

            btns: [],

            modal: true,

            mount: function(){
                $(this).appendTo('body');
            },

            closed: $.noop
        },
       

        _create: function() {
            this._addClass('ui-dialog');
            
            if(!this.options.modal){
                this.element.addClass(this.options.fade ? 'fade' : '');
            }else{
                this.element.attr({
                    class: this.options.fade ? 'modal fade' : 'modal',
                    tabindex: -1
                });
            }           
            
            this._on({
                'click': '_clickBackdrop',
                'keydown': '_keydownKeyboard',
                'click .close': '_clickClose',
                'click .action': '_clickAction'
            });

            this.body = this.document.find('body');        
        },

        _init: function() {
            var o = this.options;
            var height;

            this.element
                .html(this._tmpl('main'))
                .find('.modal-body').append(this.options.content);

            this._trigger('mount');

            this.dialog = this.element.find('.modal-dialog');
            this.backdrop = !o.mask ? $() : $('<div>')
                .addClass(o.fade ? 'modal-backdrop fade' : 'modal-backdrop')
                .appendTo('body');      

            this.open();
        },

        open: function() {
            if (this.options.fade) {
                this._delay(function() {
                    this.element.addClass('in');
                    this.backdrop.addClass('in');
                });
            }else{
                this.element.addClass('in');
                this.backdrop.addClass('in');
            }

            this.element
                .css('display', 'block')
                .focus();             

            this._setCenter();
            this._setBody();
        },

        _setCenter: function(){
            if(this.options.centered){
                height = this.dialog.outerHeight();
                console.log(height)
                console.log(this.window.height())
                this.dialog.css({
                    marginTop: (this.window.height() - height) / 2,
                });
            }   
        },

        _setBody: function(){
            var data, count, isOverflow, scrollWidth, fixedElems;

            data = this.body.data('ui-dialog') || {};
            count = data.count || 0;

            if(count > 0){
                this.body.data('ui-dialog', $.extend(data, {
                    count: count + 1
                }));
                return;
            }

            isOverflow = this.body[0].scrollHeight > this.window[0].innerHeight;

            if(isOverflow){

                scrollWidth = this._getScrollWidth();
                fixedElems = $(':fixed').not(function(){
                    return $(this).hasClass('modal') || $(this).hasClass('modal-backdrop')
                });                
         
                this.body.css({
                    paddingRight: scrollWidth + parseFloat(this.body.css('paddingRight'))
                });

                fixedElems.each(function (i, elem) {
                    elem = $(elem);                
                    elem.css({
                        marginRight: scrollWidth + parseFloat(elem.css('marginRight'))
                    });
                });
            }

            this.body.addClass('modal-open');
            this.body.data('ui-dialog', {
                isOverflow: isOverflow,
                fixedElems: fixedElems,
                scrollWidth: scrollWidth,
                count: 1
            });
        },

        _resetBody: function(){            
            var data = this.body.data('ui-dialog');
            var count = data.count;            

            if(count > 1){
                this.body.data('ui-dialog', $.extend(data, {
                    count: count - 1
                }));
                return;
            }

            if(data.isOverflow){
                this.body.css({
                    paddingRight: parseFloat(this.body.css('paddingRight')) - data.scrollWidth
                });
                data.fixedElems.each(function (i, elem) {
                    elem = $(elem);                    
                    elem.css({
                        marginRight: parseFloat(elem.css('marginRight')) - data.scrollWidth
                    });
                });
            }

            this.body.removeClass('modal-open');
            this.body.removeData('ui-dialog');
        },

        _getScrollWidth: function(){
            var div = $('<div>').addClass('modal-scrollbar-measure').appendTo('body');
            var width = div[0].getBoundingClientRect().width - div[0].clientWidth;
            div.remove();
            return width;
        },

        _clickBackdrop: function(event){
            if (this.options.backdrop && event.target === event.currentTarget) {
                this.close();
            }
        },

        _keydownKeyboard: function(event){
            if (this.options.keyboard && event.keyCode === 27) {
                this.close();
            }
        },

        _clickClose: function(event) {
            this.close();
            return false;
        },

        _clickAction: function(event, ctx) {
            if ($.isFunction(ctx.data.click)) {
                ctx.data.click.call(this.element[0], event, ctx.data);
                return false;
            }
        },

        close: function() {            
            if (this.options.fade) {
                this.element.removeClass('in');
                this.backdrop.removeClass('in');
                this._delay(function() {
                    this.element.remove();
                    this.backdrop.remove();
                    this._resetBody();
                    this._trigger('closed');
                }, 300);
            } else {                
                this.element.remove();
                this.backdrop.remove();
                this._resetBody(); 
                this._trigger('closed');               
            }
        }        

    });

});