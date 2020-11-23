define(['$', 'dialog'], function($){

    $.widget('ui.notice', {
    	
    	templates: {    		

			main: '\
				<span class="icon {{icon}}"></span>\
				<div>\
					<div class="title">{{title}}</div>\
					<div class="content">{{html content}}</div>\
				</div>'
    	},
    	
    	options: {
			
			type: 'info',

			title: '',

			content: '',

			fade: true,

			timeout: 3000,

			closed: $.noop
		},

        _create: function(){
			this._addClass('ui-notice', this.options.type);

			this.modal = this.document.find('.modal-ui-notice');
			if(!this.modal.length){
				this.modal = $('<div>')
					.addClass('modal modal-ui-notice show')
					.appendTo('body');
			}
        },
        
        _init: function(){
			var that = this;

			this._handleOptions();
            this.element.dialog({
            	title:　'',
    			size: 'sm',
				fade: this.options.fade,
    			content: this._tmpl('main'), 
    			backdrop: false,
				keyboard: false,
				mask: false,
				modal: false,
				mount: function(){
					$(this).prependTo(that.modal);
				},
				closed: function(){					
					if(!that.modal.find('.ui-notice').length){
						that.modal.remove();
					}
				}
            });

            this._setAutoClose();
        },

		_handleOptions: function(){			
			switch(this.options.type){
				case 'success':
					this.options.icon = 'glyphicon glyphicon-ok-sign';
					break;
				case 'info':
					this.options.icon = 'glyphicon glyphicon-info-sign';
					break;
				case 'warning':
					this.options.icon = 'glyphicon glyphicon-exclamation-sign';
					break;
				case 'danger':
					this.options.icon = 'glyphicon glyphicon-remove-sign';
					break;
			}
        },
        
        _setAutoClose: function(){        	
        	var that = this; 
        	var interval, timeout;
        	
        	if(this.options.timeout <= 0){
				this.close();
				this._trigger('closed');				
        	}else{
				timeout = Math.ceil(this.options.timeout / 500);
				interval = setInterval(function(){
					timeout--;
					if(timeout <= 0){
						clearInterval(interval);
						that.close();
						that._trigger('closed');
					}
				}, 500);
        	}
        },

		close: function(){
			this.element.dialog('close');
        }
    	
    });

});