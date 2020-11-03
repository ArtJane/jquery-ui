define(['jquery', 'base', 'notice', 'listpage'], function($){

    $.widget('ui.coupons', $.ui.base, {
    	
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
							<button type="button" class="btn btn-primary btn-block selectcoupon" {{if scene==="detail"}}disabled{{/if}}>选择优惠券</button>\
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
					title: '选择优惠券',
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
								{label: '代金券', value: 'VO'},
								{label: '折扣券', value: 'DI'},
								{label: '免邮券', value: 'FP'}
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
					url: '/coupon/chooseCoupon',
					type: 'POST',
					contentType: 'application/json; charset=utf-8',
					data: {
						applyBiz: opts.applyBiz,
						applySite: opts.applySite,
                        planningType: opts.planningType
					},
					keys: {
						base: 'data',
						source: 'result',
						index: 'couponBaseId',
						page: 'pageNum',
						pageSize: 'pageSize',
						total: 'total'
					},
					//page: 1,
					//pageSize: 2,
					enableCheckbox: true
				},

				columns: [
					{
						title: '类型',
						data: 'couponType',
						render: function(data, row){
                            return transCode.couponType[data] || data;
						}
					},
					{
						title: '优惠券名称',
						data: 'name'
					},
					{
						title: '金额',
						data: 'amount'
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
				]
			});
		},

		_setList: function(list){
			var that = this;

			if(!list){
				list = this.options.list = this.dialogContent.listpage('getCheckedData').rows;
			}
            var opts = this.options;
            var planningType = opts.planningType;
            if(planningType==='memberDiscount' && list.length>1) {
                $('<div>').notice({
                    type: 'danger',
                    message: '会员折扣，每个等级只能选择一张优惠券',
                    time: 2000
                });
                return false;
            }
			this.list.table({

				list: {
					source: list,
					enableActions: true
				},

				columns: [
					{
						title: '编码',
						data: 'couponBaseCode',
						render: function(data, row){
							return data;
						}
					},
					{
						title: '优惠券类型',
						data: 'couponType',
						render: function(data, row){
                            return transCode.couponType[data] || data;
						}
					},
					{
						title: '优惠券名称',
						data: 'name'
					},
					{
						title: '金额',
						data: 'amount'
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
					{
						text: '编辑',
						click: function (event, data) {
							that._setEdit(data);
						}
					},
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
				if(item.couponBaseId === row.couponBaseId){
					couponslist.splice(i, 1);
					that._setList(couponslist);
					return false;
				}
			});
		},

		_setEdit: function(row){
			var that = this;
            var isDetail = this.options.scene === 'detail';
			this._setEditDialogContent(row);
			$('<div>')
				.dialog({
					title: '设置投放信息',
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
							    if(isDetail){
                                    $(this).dialog('close');
                                }else{
                                    that._setEditData($(this), row);
                                }
							}
						}
					]
				})
				.find('.modal-body')
				.append(this.editDialogContent);
		},

		_setEditDialogContent: function(row){
			var that = this;
			var info = row.info || {};
			var isDetail = this.options.scene === 'detail';
			var items = [
				{
					label: '* 使用有效期',
					labelcol: 'col-md-2',
					tag: 'input',
					type: 'radio',
					name: 'expiryType',
					value: info.expiryType,
                    disabled: isDetail,
					options: [
						{
							label: '固定时段',
							value: 'fixed',
							items: [
								{
									tag: 'input',
									type: 'date',
									name: 'couponEffectiveStartTime_',
									// value: info.couponEffectiveStartTime,
                                    value:typeof(info.couponEffectiveStartTime_)!="undefined"&&info.couponEffectiveStartTime_!=''?info.couponEffectiveStartTime_:info.couponEffectiveStartTime,
                                    readonly:true,
									placeholder: '请选择起始时间'
								},
								{
									tag: 'input',
									type: 'date',
									name: 'couponEffectiveEndTime_',
                                    value:typeof(info.couponEffectiveEndTime_)!="undefined"&&info.couponEffectiveEndTime_!=''?info.couponEffectiveEndTime_:info.couponEffectiveEndTime,
									// value: info.couponEffectiveEndTime,
                                    readonly:true,
									placeholder: '请选择结束时间'
								}
							]
						},
						{
							label: '有效时长',
							value: 'dynamic',
							items: [
								{
									tag: 'span',
									text: '登记后',
									col: 'col-md-2'
								},
								{
									tag: 'input',
									type: 'text',
									name: 'validDay',
									value: info.validDay,
									placeholder: '请输入正整数',
									col: 'col-md-4'
								},
								{
									tag: 'span',
									text: '天有效。',
									col: 'col-md-2'
								}
							]
						}
					]
				},
				{
					label: '* 编码方式',
					labelcol: 'col-md-2',
					tag: 'select',
					name: 'couponCodeRule',
					value: info.couponCodeRule,
                    disabled: isDetail,
					options: [
						{
							label: '请选择',
							value: ''
						},
						{
							label: '系统默认公码',
							value: 'default',
							items: [
								{
									tag: 'span',
									text: '系统自动生成编码'
								}
							]
						},
						{
							label: '自定义公码',
							value: 'customPublic',
							items: [
								{
									col: 'col-md-6',
									tag: 'input',
									type: 'text',
									name: 'couponChildCode',
									value: info.couponCode,
									placeholder: '输入自定义编码'
								},
								{
									col: 'col-md-12',
									tag: 'span',
									text: '字母请输入大写，最长16位。'
								}
							]
						},
						{
							hide: (that.options.activityType !== 'coupon') || $('input[name="isGiftBag"]:checked').val() === "yes",
							label: '私码（每个优惠券独立使用一个编码）',
							value: 'customPrivate',
							items: [
								{
									col: 'col-md-12',
									tag: 'span',
									text: '系统自动生成每张优惠券的编码，结果可导出'
								},
								{
									col: 'col-md-2',
									tag: 'span',
									text: '自定义前缀'
								},
								{
									col: 'col-md-4',
									tag: 'input',
									type: 'text',
									name: 'preCouponCode',
									value: info.preCouponCode,
									placeholder: '最多8位字母或数字'
								},
                                {
                                    col: 'col-md-2',
                                    tag: 'span',
                                    text: '后缀长度'
                                },
                                {
                                    col: 'col-md-2',
                                    tag: 'input',
                                    type: 'text',
                                    name: 'lastNum',
                                    value: info.lastNum,
                                    placeholder: '长度值'
                                }
							]
						}
					]
				},
				{
					label: '* 单次激活张数',
					labelcol: 'col-md-2',
					tag: 'input',
					type: 'text',
					name: 'userNumber',
					value: info.userNumber,
                    disabled: isDetail
				},
				{
					hide: that.options.activityType === 'couponByUser',
					label: '* 投放总量',
					labelcol: 'col-md-2',
					tag: 'input',
					type: 'text',
					name: 'totalNumber',
					value: info.totalNumber,
					placeholder: '0表示不限量',
                    disabled: isDetail
				},
                {
                    label: '优惠券标签',
                    labelcol: 'col-md-2',
                    tag: 'input',
                    type: 'text',
                    name: 'couponLable',
                    value: info.couponLable,
                    disabled: isDetail
                }
			];

			if(this.options.sort){
				items.push({
					label: '* 阶段序列值',
					labelcol: 'col-md-2',
					tag: 'input',
					type: 'text',
					name: 'ladderNo',
					value: info.ladderNo,
                    disabled: isDetail
				});
			}

			this.editDialogContent = $('<div>').form({
				items: items,
				validate: {
					rules: {
					/*	couponEffectiveStartTime: {
							required: true
						},
						couponEffectiveEndTime: {
							required: true,
							prevent: function(){
								var st = $('[name=couponEffectiveStartTime]').val();
								var et = $('[name=couponEffectiveEndTime]').val();
								return new Date(et).getTime() < new Date(st).getTime() ? true : undefined;
							}
						},*/
                        couponEffectiveStartTime_: {
                            required: true
                        },
                        couponEffectiveEndTime_: {
                            required: true,
                            prevent: function(){
                                var st = $('[name=couponEffectiveStartTime]').val();
                                var et = $('[name=couponEffectiveEndTime]').val();
                                return new Date(et).getTime() < new Date(st).getTime() ? true : undefined;
                            }
                        },
						validDay: {
							required: true,
							digits: true
						},
						couponCodeRule: {
							required: true
						},
						couponChildCode: {
							required: true,
							remote: '/couponPool/existCouponCode'
						},
						preCouponCode: {
							required: true
						},
						lastNum:{
							required:true,
                            digits:true
						},
						userNumber: {
							required: true,
							digits: true
						},
						totalNumber: {
							required: true,
							digits: true
						},
						ladderNo: {
							required: true,
							digits: true
						}
					},
					messages: {
						couponEffectiveStartTime: {
							required: '请选择起始时间'
						},
						couponEffectiveEndTime: {
							required: '请选择结束时间',
							prevent: '结束时间不能小于起始时间'
						},
						validDay: {
							required: '请输入天数',
							digits: '请输入整数'
						},
						couponCodeRule: {
							required: '请选择编码方式'
						},
						couponChildCode: {
							required: '请输入自定义编码',
							remote: '自定义编码不可用'
						},
						preCouponCode: {
							required: '请输入自定义前缀'
						},
                        lastNum:{
                            required:'请输入后缀长度',
                            digits:'请输入整数'
                        },
						userNumber: {
							required: '请输入单次激活张数',
							digits: '请输入整数'
						},
						totalNumber: {
							required: '请输入投放总量',
							digits: '请输入整数'
						},
						ladderNo: {
							required: '阶段序列值',
							digits: '请输入整数'
						}
					}
				}
			});
		},

		_setEditData: function(dialog, row){
			var that = this;
			this.editDialogContent.form('validate', function(v, data){
				if(v){
					row.info = data;
					that._setGlobal('couponslist', that.options.couponslist);
					dialog.dialog('close');
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
                if(that.options.validate && !list){
                    validate = false;
                    $('<div>').notice({
                        type: 'danger',
                        message: '请选择优惠券！',
                        time: 2000
                    });
                }

                if(list){
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
                }
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