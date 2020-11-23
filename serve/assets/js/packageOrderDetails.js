define(['jquery', 'moment', 'group', 'form', 'table', 'serve/assets/js/base/dialog', 'notice'], function($, moment){

    $.widget("ui.packageOrderBaseDetail", {
        options: {
            category: '',
            packageOperateType: '',
            memberCode: '',
            referOrderId: '',
            packageStatus: ''
        },
        _init: function(){
            var o = this.options;
            this.element.group({
                source: function (ctx, next) {
                    $.ajax({
                        url: '/packageSearch/getOne',
                        type: 'GET',
                        data: {
                            fpxOrderId: o.category,
                            packageStatus: o.packageStatus
                        },
                        success: function (res) {
                            ctx.source = res.data;
                            next(ctx);
                        }
                    });
                },
                items: [
                    {
                        title: '基本信息',
                        key: 'base',
                        widget: 'form',
                        options: function (data) {
                            return {
                                items: [
                                    [
                                        {
                                            label: '4PX运单号：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'fpxOrderId',
                                            value: data.fpxOrderId
                                        },
                                        {
                                            label: '商家物流号：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'referOrderId',
                                            value: data.referOrderId
                                        },
                                        {
                                            label: '末端派送号：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'terminalDeliveryCo',
                                            value: data.terminalDeliveryNo
                                        },
                                        {
                                            label: '末端派送商：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'terminalDeliveryNo',
                                            value: data.terminalDeliveryCoName
                                        }
                                    ],
                                    [
                                        {
                                            label: '委托单号：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'delegateNo',
                                            value: data.delegateNo
                                        },
                                        {
                                            label: '4PX门店：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'adName',
                                            value: data.adName
                                        },
                                        {
                                            label: '启运国：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'departureCountry',
                                            value: data.departureCountry
                                        },
                                        {
                                            label: '起运仓：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'warehouseCodeName',
                                            value: data.warehouseCodeName
                                        }
                                    ],
                                    [
                                        {
                                            label: '目的国：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'destinationCountry',
                                            value: data.destinationCountry
                                        },
                                        {
                                            label: '参考单号：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'referenceNo',
                                            value: data.referenceNo
                                        },
                                        {
                                            label: '计费重：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: false,
                                            type: 'hidden',
                                            name: 'chargeableWeight',
                                            value: data.chargeableWeight
                                        },
        
                                        {
                                            label: '计重单位：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: false,
                                            type: 'hidden',
                                            name: 'weightUnit',
                                            value: data.weightUnit
                                        }
                                    ],
                                    [
                                        {
                                            label: '包裹实重：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: false,
                                            type: 'hidden',
                                            name: 'packageWeight',
                                            value: data.packageWeight
                                        },
                                        {
                                            label: '体积重：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: false,
                                            type: 'hidden',
                                            name: 'volumeWeight',
                                            value: data.volumeWeight
                                        },
        
                                        {
                                            label: '入库时间：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'instorageTime',
                                            value: data.instorageTime
                                        },
                                        {
                                            label: '付款方式：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'payType',
                                            value: data.payType
                                        }
                                    ],
                                    [
                                        {
                                            label: '包裹状态：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'statusFlagName',
                                            value: data.statusFlagName
                                        },
                                        {
                                            label: '订单状态：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'statusFlag',
                                            value: (function(){
                                                if (data.operateType == 'merge' ){
                                                    if(data.statusFlag >= 60){
                                                        return  '已合箱'
                                                    }else{
                                                        return  '未合箱'
                                                    }
                                                }else{
                                                    return ''
                                                }
                                            })()
                                        },
                                        {
                                            label: '出库时间：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'outTime',
                                            value: data.outTime
                                        },
                                        {
                                            label: '是否问题件：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'isIssue',
                                            value: data.isIssue == 0 ? "N" : "Y"
                                        }
                                    ],
                                    [
                                        {
                                            label: '包裹类型：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'operateType',
                                            value:(function(){
                                                var typeOb = {
                                                    single:"单票",
                                                    merge:"合箱",
                                                    split:"分箱"
                                                };
                                                return typeOb[data.operateType]
                                            })()
                                        },
                                        {
                                            label: '产品：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'productCodeName',
                                            value: data.productCodeName
                                        },
                                        {
                                            label: '合箱后单号：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'parentFpxOrderId',
                                            value: data.operateType == 'merge'?data.parentFpxOrderId:''
                                        },
                                        {
                                            label: '客户备注：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'remark',
                                            value: data.remark
                                        }
                                    ],
                                    [
                                        {
                                            label: '下单时间：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'prealertTime',
                                            value: data.prealertTime
                                        },
                                        {
                                            label: '是否大件：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'largeFlag',
                                            value: (function(){
                                                if (data.largeFlag == 0 ){
                                                    return "N"
                                                }else{
                                                    if(data.largeFlag ==null || data.largeFlag==''){
                                                        return ''
                                                    }else {
                                                        return "Y"
        
                                                    }
                                                }
                                            })()
                                        },
                                        {
                                            label: '包裹属性：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'packageAttribute',
                                            value:(function(){
                                                var typeOb = {
                                                    0:"",
                                                    1:"一票多件",
                                                    2:"合箱转单票",
                                                    3:"一票多件and合箱转单票",
                                                    4:"团购"
                                                };
                                                return typeOb[data.packageAttribute]
                                            })()
                                        },
                                        {
                                            label: '预报类型：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'packageAttribute',
                                            value:(function(){
                                                var typeOb = {
                                                    10:"免预报订单",
                                                    9:"R+订单",
                                                    0:"普通订单（预报/认领订单）",
                                                    1:"普通订单（预报/认领订单）",
                                                    2:"普通订单（预报/认领订单）"
                                                };
                                                return typeOb[data.packageAttribute]
                                            })()
                                        }
                                    ]                                    
                                ]
                            }
                        }
                    }
                ]                
            });
        }
    });

    $.widget("ui.packageOrderWeightDetail", {

        options: {
            category: '',
            packageOperateType: '',
            memberCode: '',
            referOrderId: '',
            packageStatus: ''
        },

        _init: function(){
            var o = this.options;
            this.element.group({
                source: function (ctx, next) {
                    $.ajax({
                        url: '/packageSearch/getPackgeOrderWeightInfo',
                        type: 'GET',
                        data: {
                            fpxOrderId: o.category,
                            referOrderId: o.referOrderId,
                            packageStatus: o.packageStatus,
                            packageOperateType: o.packageOperateType
                        },
                        success: function (res) {
                            ctx.source = res.data;
                            next(ctx);
                        }
                    });
                },                
                items: [
                    {
                        title: '重量信息',
                        key: 'weight',
                        widget: 'table',
                        options: function (data) {                            
                            return {
                                source: data,
                                columns: [
                                    {
                                        title: '商家物流号',
                                        field: 'referOrderId'
                                    },
                                    {
                                        title: '计重单位',
                                        field: 'weightUnit'
                                    },
                                    {
                                        title: '重量',
                                        field: 'packageWeight'
                                    },
                                    {
                                        title: '体积',
                                        field: 'volumeLength',
                                        render: function (row) {
                                            if (row.volumeLength) {
                                                return row.volumeLength + '*' + row.volumeWide + '*' +row.volumeHeight + ' '+row.volumeUnit;
                                            } else {
                                                return '';
                                            }
                                        }
                                    },
                                    {
                                        title: '体积重',
                                        field: 'volumeWeight'
                                    },
                                    {
                                        title: '计费重',
                                        field: 'chargeableWeight'
                                    },
                                ]
    
                            }
                        
                        }
                    }
                ]                
            });
        }
    });

    $.widget("ui.packageOrderMemberDetail", {

        options: {
            category: '',
            packageOperateType: '',
            memberCode: '',
            referOrderId: '',
            packageStatus: ''
        },

        _init: function(){
            var o = this.options;
            this.element.group({
                source: function (ctx, next) {
                    $.ajax({
                        url: '/packageSearch/getMemberInfo',
                        type: 'GET',
                        data: {
                            memberCode: o.memberCode
                        },
                        success: function (res) {
                            ctx.source = res.data;
                            next(ctx);
                        }
                    });
                },          
                items: [                    
                    {
                        title: '会员信息',
                        key: 'member',
                        widget: 'form',
                        options: function (data) {
                            return {
                                items: [
                                    [
                                        {
                                            label: '会员昵称：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'firstName',
                                            value: data == null ? "" : data.firstName
                                        },
                                        {
                                            label: '用户编码：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'memberCode',
                                            value: data == null ? "" : data.memberCode
                                        }
                                    ],
                                    [
                                        {
                                            label: '会员等级：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'gradeLevel',
                                            value: data == null ? "" : data.gradeLevel
                                        },
                                        {
                                            label: '联系方式：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'tel',
                                            value: data == null ? "" : data.tel
                                        }
                                    ],
                                    [
                                        {
                                            label: '邮箱：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'email',
                                            value: data == null ? "" : data.email
                                        },
                                        {
                                            label: '所属站点：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'registRegion',
                                            value: data == null ? "" : data.registSite
                                        }
                                    ]                                    
                                ]
                            }                        
                        }
                    }
                ]                
            });
        }
    });    

    $.widget("ui.packageOrderSendDetail", {

        options: {
            category: '',
            packageOperateType: '',
            memberCode: '',
            referOrderId: '',
            packageStatus: ''
        },

        _init: function(){
            var o = this.options;
            this.element.group({
                source: function (ctx, next) {
                    $.ajax({
                        url: '/packageSearch/getPkgSendAddress',
                        type: 'GET',
                        data: {
                            fpxOrderId: o.category,
                            referOrderId: o.referOrderId,
                            packageStatus: o.packageStatus
                        },
                        success: function (res) {
                            ctx.source = res.data;
                            next(ctx);
                        }
                    });
                }, 
                items: [
                    {
                        title: '寄件信息',
                        key: 'send',
                        widget: 'form',
                        options: function (data) {
                            return{
                                items: [
                                    [
                                        {
                                            label: '寄件人人姓名：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'userName',
                                            value: data == null ? "" : data.userName
                                        },
                                        {
                                            label: '联系方式：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'mobile',
                                            value: data == null ? "" : (data.areaCode
                                                + data.mobile)
                                        },
                                        {
                                            label: '邮箱：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'email',
                                            value: '-'
                                        }
                                    ],
                                    [
                                        {
                                            label: '国家/地区：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'mobile',
                                            value: data == null ? "" : data.country
                                        },
                                        {
                                            label: '省份/州：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'province',
                                            value: data == null ? "" : data.province
                                        },
                                        {
                                            label: '城市：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'city',
                                            value: data == null ? "" : data.city
                                        }
                                    ],
                                    [
                                        {
                                            label: '区：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'district',
                                            value: data == null ? "" : data.district
                                        },
                                        {
                                            label: '详细地址：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'address',
                                            value: data == null ? "" : data.address
                                        },
                                        {
                                            label: '邮编：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'postcode',
                                            value: data == null ? "" : data.postcode
                                        }
                                    ],
                                    [
                                        {
                                            col: 'col-md-4',
                                            label: '寄件方式：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'deliveryType',
                                            value: data == null || data.deliveryType == null ? "" : (data.deliveryType == 1 ? "自提" : data.deliveryType == 2 ? "自提柜" : "派送")
                                        },
                                        {
                                            col: 'col-md-4',
                                            label: '自提点：',
                                            tag: 'input',
                                            type: 'text',
                                            disabled: true,
                                            name: 'pickUpCode',
                                            value: data == null ? "" : data.pickUpName
                                        }
                                    ]                                    
                                ],
                                btns: [
                                    {
                                        clas: 'btn-default copy',
                                        type: 'reset',
                                        text: '复制地址',
                                        click: function (event, d) {
                                            $(event.target).zclip({
                                                path: '/plugins/zclip/ZeroClipboard.swf',
                                                copy: function () {
                                                    return d.province + "-"
                                                        + d.city + "-"
                                                        + d.district + "-"
                                                        + d.address;
                                                },
                                                afterCopy: function () {
                                                    layer.msg('复制成功！', {
                                                        skin: 'layui-msg-warning',
                                                        closeBtn: 1,
                                                        time: 2000,
                                                        end: function () {
                                                            layer.closeAll();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                ]                                
                            }
                                              
                        }
                    }
                ]                
            });
        }
    });

});