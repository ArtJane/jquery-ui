define(["jquery", "@widgets/base"], function($){

    $.widget("ui.dialog", $.ui.base, {
    	
    	templates: {

            main: `
				<div class="modal-dialog {{if size}}modal-{{size}}{{/if}}">
					<div class="modal-content">
						{{if title}}{{tmpl "header"}}{{/if}}
						<div class="modal-body">{{html content}}</div>
						{{if buttons.length}}{{tmpl "footer"}}{{/if}}
					</div>
				</div>
			`,
            
            header: `
				<div class="modal-header">					
					<h5 class="modal-title">{{title}}</h5>
					{{if closable}}
					<button type="button" class="close">
						<span>&times;</span>
					</button>
					{{/if}}
				</div>
			`,
            
            footer: `
				<div class="modal-footer">
					{{tmpl(buttons) "button"}}
				</div>
			`,
            
            button: `
                <button type="button" class="action {{classes}}">{{text}}</button>
            `
            
        },

        options: {        	
        	title: "", 			//标题，为空则隐藏头部
            closable: true,		//可关闭
        	backdrop: true, 	//点击背景关闭，true/false/'static'
        	keyboard: true, 	//按下esc关闭
        	fade: false, 		//动画效果
        	size: "", 			//尺寸lg/sm
        	content: "", 		//内容，字符串或jquery对象
        	buttons: [
                /*
                 {
                     text: "取消",
                     classes: "btn btn-default",
                     click: function(event, data){
                        $(this).dialog('close');
                     }
                 }
                 */
        	]
        },

        _create: function(){
        	this.options.classes[this.widgetFullName] = this.options.fade ?  "modal fade" : "modal";
        	this._addClass(this.widgetFullName);
        	this.element.attr("tabindex", -1);
        	
        	this._on({
        		'click .close': '_clickClose',
        		'click .action': '_clickAction'
        	});
        },

        _init: function(){
            if(this.options.content.jquery){
                this.options.content = this._outerHtml(this.options.content);
            }
        	
        	this.element
            	.html(this._tmpl("main", this.options))
            	.appendTo('body')
            	.modal({
            		keyboard: this.options.keyboard,
            		backdrop: this.options.backdrop
            	})
            	.on("hidden.bs.modal", function (e) {
            		  $(this).modal("removeBackdrop").remove();
            	});
        },
        
        _clickClose: function(e){
			this.close();
        },
        
        _clickAction: function(e){
			var that = this;
			var data = e.data.tmpl.data;
			$.each(that.options.buttons, function(i){
				if(this.text === data.text && $.isFunction(this.click)){
					this.click.call(that.element[0], e, data);
				}
			});
		},

		close: function(){
        	this.element.modal("hide");
        }

	});

});