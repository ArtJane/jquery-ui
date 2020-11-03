define(['jquery', 'base', 'notice', 'listpage'], function($){

    $.widget('ui.card', $.ui.base, {
    	
    	templates: {

            main: '\
				<div class="col-md-12">\
					{{if preform}}\
						<div class="row">\
							<div class="preform"></div>\
						</div>\
					{{/if}}\
					<div class="row">\
						{{if title}}\
							<div class="col-md-1">\
								<label>${title}</label>\
							</div>\
						{{/if}}\
						<div class="col-md-2">\
							<button type="button" class="btn btn-primary btn-block selectcoupon" {{if scene==="detail"}}disabled{{/if}}>选择已被投放的卡项</button>\
						</div>\
					</div>\
					<div class="list"></div>\
				</div>'
        },

        options: {

    		preform: null,

			title: '',

            applyBiz: '',

            applySite: '',

			activityType: '',

			list: null,

			validate: true,

            scene: '',

			sort: false

        },

        _create: function(){
			this._addClass(this.widgetFullName);

        	this._on({
				'click .selectcoupon': '_clickSelectcoupon'
        	});
        },

        _init: function(){
			this.element.html(this._tmpl('main', this.options));
			this.list = this.element.find('.list');

			if(this.options.list){
				this._setList(this.options.list);
			}
			if(this.options.preform){
				this._setPreform(this.options.preform);
			}
        },

		_clickSelectcoupon: function(event){
			var that = this;

			if($(event.currentTarget).prop('disabled')){
				return;
			}

			this._setDialogContent();

			$('<div>')
				.dialog({
					title: '选择卡项',
					fade: false,
					size: 'lg',
					buttons: [
						 {
							 text: '取消',
							 clas: 'btn btn-default',
							 click: function(event, data){
								$(this).dialog('close');
							 }
						 },
						 {
							 text: '确定',
							 clas: 'btn btn-primary',
							 click: function(event, data){
								 var close = that._setList();
								 if(close){
                                     $(this).dialog('close');
								 }
							 }
						 }

					]
				})
				.find('.modal-body')
				.append(this.dialogContent);
		},

		_setDialogContent: function(){
			var opts = this.options;
			this.dialogContent = $('<div>').listpage({

				searchItems: [
					[
						{
							col: 'col-md-5',
							tag: 'input',
							type: 'text',
							name: 'params',
							placeholder: '优惠券名称 / 优惠券编号'
						},
						{
							col: 'col-md-5',
							tag: 'select',
							name: 'couponType',
							options: [
								{label: '优惠券类型', value: ''},
								{label: '储值卡/礼品卡', value: 'depositCard'},
								{label: '综合卡', value: 'synthesizeCard'},
								{label: '计次卡', value: 'meteringCard'},
                                {label: '折扣卡', value: 'discountCard'}
							]
						},
						{
							col: 'col-md-2',
							tag: 'button',
							type: 'submit',
							clas: 'btn btn-primary btn-block',
							text: '搜索'
						}
					]
				],

				list: {
					url: '/cardcoupon/chooseCard',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: {
						applyBiz: opts.applyBiz,
						applySite: opts.applySite,
						type:'card',
                        planningType: opts.planningType
					},
					keys: {
						base: 'data',
						source: 'result',
						index: 'couponCode',
						page: 'pageNum',
						pageSize: 'pageSize',
						total: 'total'
					},
					enableCheckbox: true
				},

				columns: [
                    {
                        title: '最终投放码',
                        data: 'couponCode'
                    },
					{
						title: '类型',
						data: 'cardCouponType',
						render: function(data, row){
                            return transCode.couponType[data] || data;
						}
					},
					{
						title: '卡项名称',
						data: 'name'
					},
					{
						title: '面额',
						data: 'amount'
					},
                    {
                        title: '折扣',
                        data: 'discount'
                    },
                    {
                        title: '是否限制抵扣金额',
                        data: 'moneyDeductionLimit'
                    },
                    {
                        title: '单次最高抵扣金额',
                        data: 'onceMostMoneyDeduction'
                    },
					{
						title: '币种',
						data: 'currencyType',
						render: function(data, row){
                            return transCode.currencyType[data] || data;
						}
					},
                    {
                        title: '发送总数量',
                        data: 'totalNumber'
                    }
				]
			});
		},

		_setList: function(list){
			var that = this;

			if(!list){
              var temp =   this.dialogContent.listpage('getCheckedData');
				list = this.options.list = this.dialogContent.listpage('getCheckedData').rows;
			}
            var opts = this.options;
            /*    var planningType = opts.planningType;
              if(planningType==='memberDiscount' && list.length>1) {
                   $('<div>').notice({
                       type: 'danger',
                       message: '会员折扣，每个等级只能选择一张优惠券',
                       time: 2000
                   });
                   return false;
               }*/
			this.list.table({

				list: {
					source: list,
					enableActions: true
				},

				columns: [
                    {
                        title: '最终投放码',
                        data: 'couponCode'
                    },
                    {
                        title: '类型',
                        data: 'cardCouponType',
                        render: function(data, row){
                            return transCode.cardType[data] || data;
                        }
                    },
                    {
                        title: '卡项名称',
                        data: 'name'
                    },
                    {
                        title: '面额',
                        data: 'amount'
                    },
                    {
                        title: '折扣',
                        data: 'discount'
                    },
                    {
                        title: '是否限制抵扣金额',
                        data: 'moneyDeductionLimit'
                    },
                    {
                        title: '单次最高抵扣金额',
                        data: 'onceMostMoneyDeduction'
                    },
                    {
                        title: '发送总数量',
                        data: 'totalNumber'
                    },
					{
						title: '币种',
						data: 'currencyType',
						render: function(data, row){
                            return transCode.currencyType[data] || data;
						}
					},
					{
						title: '应用站点',
						data: 'applySite',
						render: function(data, row){
                            return transCode.siteCode[data] || data;
						}
					},
					{
						title: '应用业务',
						data: 'applyBiz',
						render: function(data, row){
                            return transCode.bizCode[data] || data;
						}
					}
				],

				actions: [
				/*	{
						text: '编辑',
						click: function (event, data) {
							that._setEdit(data);
						}
					},*/
					{
						text: '删除',
                        hide: function(){
						    return that.options.scene === 'detail';
                        },
						click: function (event, data) {
							that._deleteRow(data);
						}
					}
				]
			});
            return true;
		},

		_deleteRow: function(row){
			var that = this;
			var couponslist = this.options.list;
			$.each(couponslist, function(i, item){
				if(item.couponCode === row.couponCode){
					couponslist.splice(i, 1);
					that._setList(couponslist);
					return false;
				}
			});
		},

        _setPreform: function(options){
            this.preform = this.element.find('.preform');
            this.preform.form(options);
        },

		validate: function(callback){
			var that = this;
    		var validate = true;
			var list = this.options.list;
            var preform = null;
            $.Deferred(function(dfd){
                if ( !that.preform ) {
                    dfd.resolve();
                }else{
                    preform = {
                        name: that.options.preform.name
                    };
                    that.preform.form('validate', function(v, data){
                        preform.value = data;
                        if(!v){
                            validate = false;
                            dfd.reject();
                        }else{
                            dfd.resolve();
                        }
                    });
                }
            }).done(function(){
             /*   if(that.options.validate && !list){
                    validate = false;
                    $('<div>').notice({
                        type: 'danger',
                        message: '请选择优惠券！',
                        time: 2000
                    });
                }*/

              /*  if(list){
                    $.each(list, function(i, item){
                        if(!item.info){
                            return validate = false;
                        }
                    });
                    if(!validate){
                        $('<div>').notice({
                            type: 'danger',
                            message: '请完成所有优惠券编辑！',
                            time: 2000
                        });
                    }
                }*/
                if(validate){
                	if(preform !== null){
                        callback.call(that.element[0], validate, list, preform);
					}else{
                        callback.call(that.element[0], validate, list);
					}

                }
			});
		}
	});
    
});