define(["jquery", "@widgets/base"], function($) {

    $.widget("ui.dialog", $.ui.base, {

        templates: {

            main: /* html */ `
				<div class="modal-dialog {{if size}}modal-{{size}}{{/if}} {{if scrollable}}modal-dialog-scrollable{{/if}} {{if centered}}modal-dialog-centered{{/if}}">
					<div class="modal-content">
						{{if title}}{{tmpl "header"}}{{/if}}
						<div class="modal-body"></div>
						{{if buttons.length}}{{tmpl "footer"}}{{/if}}
					</div>
				</div>
			`,

            header: /* html */ `
				<div class="modal-header">					
					<h5 class="modal-title">{{title}}</h5>
					{{if closable}}
					<button type="button" class="close">
						<span>&times;</span>
					</button>
					{{/if}}
				</div>
			`,

            footer: /* html */ `
				<div class="modal-footer">
					{{tmpl(buttons) "button"}}
				</div>
			`,

            button: /* html */ `
                <button type="button" class="action {{$data.classes || 'btn btn-primary'}}">{{text}}</button>
            `

        },

        options: {

            /* 
            标题，为空则隐藏头部 
            */
            title: "",

            /* 
            可关闭 
            */
            closable: true,

            /* 
            可滚动 
            */
            scrollable: false,

            /* 
            垂直居中 
            */
            centered: false,

            /* 
            点击背景关闭 
            */
            backdrop: true,

            /* 
            按下esc关闭 
            */
            keyboard: true,

            /* 
            淡入淡出效果 
            */
            fade: false,

            /* 
            尺寸：xl/lg/sm/"" 
            */
            size: "",

            /* 
            内容，字符串或jquery对象 
            */
            content: "",

            /*
            底部按钮组
            [
            	{
            		text: "确定",					//按钮文本
            		classes: "btn btn-primary",		//按钮样式
            		click: function(e){				//按钮点击事件
            			$(this).dialog("close");
            		}
            	}
            ]
            */
            buttons: []
        },

        _create: function() {
            this.element.attr({
                class: this.options.fade ? "ui-dialog modal fade" : "ui-dialog modal",
                tabindex: -1
            });

            this._on({
                "click .close": "_clickClose",
                "click .action": "_clickAction"
            });
        },

        _init: function() {
            this.element
                .html(this._tmpl("main", this.options))
                .find(".modal-body").html(this.options.content).end()
                .appendTo('body')
                .modal({
                    keyboard: this.options.keyboard,
                    backdrop: this.options.backdrop
                })
                .on("hidden.bs.modal", function(e) {
                    $(this).modal("dispose").remove();
                });
        },

        _clickClose: function(e) {
            this.close();
        },

        _clickAction: function(e) {
            var data = e.data.tmpl.data;
            if ($.isFunction(data.click)) {
                data.click.call(this.element[0], e);
            }
        },

        close: function() {
            this.element.modal("hide");
        }

    });

});