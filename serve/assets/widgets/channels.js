define(['jquery', 'vue'], function($, Vue){

	var Channels = Vue.extend({

       	template: '\
			<table class="table table-bordered" style="table-layout: fixed;">\
				<thead>\
            		<tr>\
            			<th>产品</th>\
            			<th style="width: 33%;">仓库</th>\
            			<th style="width: 33%;">目的地国家</th>\
            		</tr>\
            	</thead>\
            	<tbody>\
            		<tr v-for="(channel, i) in channels" :key="i">\
            			<td>\
            			    <div class="checkbox">\
                                <label>\
                                    <input type="checkbox" :checked="channel.checked" @click="clickChannel(i)"> {{channel.code + \'-\' + channel.name}}\
                                </label>\
                            </div>\
            			</td>\
            			<td colspan="2" style="padding: 0px;">\
							<table class="table" style="margin-bottom: 0px; table-layout: fixed;" v-for="(route, j) in channel.routes" :key="j">\
								<tr>\
									<td style="width: 50%; padding: 8px; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd;">\
									    <div class="checkbox">\
                                            <label>\
                                                <input type="checkbox" :checked="route.checked" @click="clickRoute(i, j)"> {{transCode.warehouse[route.sourceCode]}}\
                                            </label>\
                                        </div>\
									</td>\
									<td style="width: 50%;">\
										<table class="table" style="margin-bottom: 0px;">\
											<tbody>\
                                                <tr v-for="(country, k) in route.countrys" :key="k">\
                                                    <td style="border-top: none; border-bottom: 1px solid #ddd;">\
                                                        <div class="checkbox">\
                                                            <label>\
                                                                <input type="checkbox" :checked="country.checked" @click="clickCountry(i, j, k)"> {{country.desCountryName}}\
                                                            </label>\
                                                        </div>\
                                                    </td>\
                                                </tr>\
											</tbody>\
										</table>\
									</td>\
								</tr>\
							</table>\
						</td>\
            		</tr>\
            	</tbody>\
            </table>',

		data: function(){
			return {
                channels: []
			};
		},

        methods: {

            clickChannel: function(i){
                var channel = this.channels[i];
                if(channel.checked === "checked"){
                    channel.checked = "";
                    $.each(channel.routes, function(i, route){
                        route.checked = "";
                        $.each(route.countrys, function(i, country){
                            country.checked = "";
                        });
                    });

                }else{
                    channel.checked = "checked";
                    $.each(channel.routes, function(i, route){
                        route.checked = "checked";
                        $.each(route.countrys, function(i, country){
                            country.checked = "checked";
                        });
                    });
                }
                this.channels.splice(i, 1, channel);
            },

            clickRoute: function(i, j){
                var channel = this.channels[i];
                var route = channel["routes"][j];
                if(route.checked === "checked"){
                    route.checked = "";
                    $.each(route.countrys, function(i, country){
                        country.checked = "";
                    });
                }else{
                    route.checked = "checked";
                    $.each(route.countrys, function(i, country){
                        country.checked = "checked";
                    });
                }
                this.channels.splice(i, 1, channel);
            },

            clickCountry: function(i, j, k){
                var channel = this.channels[i];
                var route = channel["routes"][j];
                var country = route.countrys[k];
                if(country.checked === "checked"){
                    country.checked = "";
                }else{
                    country.checked = "checked";
                }
                this.channels.splice(i, 1, channel);
            }

        },

        created: function(){
			var that = this;
			$.ajax({
				url: "/productLine/getProducts",
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                data: {
                    siteCode: this.siteCode
                },
				success: function(res){
                    $.each(res.data, function(i, channel){
                        channel.checked = "";
                        $.each(channel.routes, function(i, route){
                            route.checked = "";
                            route.countrys = [];
                            $.each(route.destinationCountryCodes, function(i, item){
                                var country = {
                                    productCode: channel.code,
                                    warehouseCode: route.sourceCode,
                                    desCountryCode: item.code,
                                    desCountryName: item.name,
                                    checked: ""
                                };
                                if(that.channelsData){
                                    $.each(that.channelsData, function(i, c){
                                        if(country.productCode === c.productCode
                                            && country.warehouseCode === c.warehouseCode
                                            && country.desCountryCode === c.desCountryCode){
                                            country.checked = "checked";
                                        }
                                    });
                                }
                                route.countrys.push(country);
                            });
                        });
                    });
                    that.channels = res.data;
				}
			});

		}

	});

	//jquery实例方法接口

    $.widget('ui.channels', $.ui.base, {

        options: {
			siteCode: "cn",
            channels: null
        },

        _create: function(){
            this.vueElement = $("<div>").appendTo(this.element);
        },

		_init: function(){
        	var that = this;
        	var channels = this.options.channels;

            that.vue = new Channels({
                el: that.vueElement[0],
                data: function(){
                    return {
                        siteCode: that.options.siteCode,
                        channelsData: that.options.channels
                    }
                }
            });

            if(channels){
                $.each(that.vue.channels, function(i, channel){
                    $.each(channel.routes, function(i, route){
                        $.each(route.countrys, function(i, country){
                            $.each(channels, function(i, c){
                                if(country.productCode === c.productCode
                                    && country.warehouseCode === c.warehouseCode
                                    && country.desCountryCode === c.desCountryCode){
                                    country.checked = "checked";
                                }
                            });
                        });
                    });
                });
            }
		},

        validate: function(callback){
            var validate = true;
            var data = [];
            $.each(this.vue.channels, function(i, channel){
                $.each(channel.routes, function(i, route){
                    $.each(route.countrys, function(i, country){
                        if(country.checked === "checked"){
                            data.push({
                                productCode: country.productCode,
                                warehouseCode: country.warehouseCode,
                                desCountryCode: country.desCountryCode
                            })
                        }
                    });
                });
            });

            if(!data.length){
                validate = false;
                $('<div>').notice({
                    type: 'danger',
                    message: '请选择物流产品！',
                    time: 2000
                });
            }

            callback.call(this.element[0], validate, data);
        }

	});
    
});