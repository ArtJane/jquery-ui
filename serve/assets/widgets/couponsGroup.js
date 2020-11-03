define(['jquery', 'base', 'dialog', 'coupons'], function($){

    $.widget('ui.couponsGroup', $.ui.base, {
    	
    	templates: {

            main: '\
				<div class="group"></div>\
				<div>\
					<div class="col-md-2">\
						<button type="button" class="btn btn-primary btn-block addcoupons"><i class="glyphicon glyphicon-plus"></i></button>\
						<button type="button" class="btn btn-primary btn-block delcoupons"><i class="glyphicon glyphicon-minus"></i></button>\
					</div>\
					<div class="col-md-10">\
						注：新添加的优惠券只有在以上优惠券被领取以及使用后才能领取。\
					</div>\
				</div>'
        },

        options: {

			title: '券',

			size: 2,

			group: null

        },

        _create: function(){
			this._addClass(this.widgetFullName);
        	
        	this._on({
				'click .addcoupons': '_clickAddcoupons',
				'click .delcoupons': '_clickDelcoupons'
        	});
        },

        _init: function(){

			var that = this;
			this.element.html(this._tmpl('main', this.options));
			this.group = this.element.find('.group');

			if(this.options.group){
				$.each(this.options.group, function(key, v){
					that._appendCoupons(this.options.title + key, v);
				});
			}else{
				for(var i = 1; i <= this.options.size; i++){
					this._appendCoupons(this.options.title + i);
				}
			}
        },

		_appendCoupons: function(title, list){
			$('<div>')
				.coupons({
					applyBiz: this.options.applyBiz,
					applySite: this.options.applySite,
					title: title,
					list: list
				})
				.appendTo(this.group);
		}
	});
    
});