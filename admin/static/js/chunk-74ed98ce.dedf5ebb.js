(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74ed98ce"],{1169:function(t,e,a){var r=a("2d95");t.exports=Array.isArray||function(t){return"Array"==r(t)}},"1c4c":function(t,e,a){"use strict";var r=a("9b43"),o=a("5ca1"),i=a("4bf8"),n=a("1fa8"),s=a("33a4"),l=a("9def"),c=a("f1ae"),d=a("27ee");o(o.S+o.F*!a("5cc5")((function(t){Array.from(t)})),"Array",{from:function(t){var e,a,o,u,_=i(t),m="function"==typeof this?this:Array,f=arguments.length,p=f>1?arguments[1]:void 0,h=void 0!==p,g=0,v=d(_);if(h&&(p=r(p,f>2?arguments[2]:void 0,2)),void 0==v||m==Array&&s(v))for(e=l(_.length),a=new m(e);e>g;g++)c(a,g,h?p(_[g],g):_[g]);else for(u=v.call(_),a=new m;!(o=u.next()).done;g++)c(a,g,h?n(u,p,[o.value,g],!0):o.value);return a.length=g,a}})},"37c8":function(t,e,a){e.f=a("2b4c")},"386d":function(t,e,a){"use strict";var r=a("cb7c"),o=a("83a1"),i=a("5f1b");a("214f")("search",1,(function(t,e,a,n){return[function(a){var r=t(this),o=void 0==a?void 0:a[e];return void 0!==o?o.call(a,r):new RegExp(a)[e](String(r))},function(t){var e=n(a,t,this);if(e.done)return e.value;var s=r(t),l=String(this),c=s.lastIndex;o(c,0)||(s.lastIndex=0);var d=i(s,l);return o(s.lastIndex,c)||(s.lastIndex=c),null===d?-1:d.index}]}))},"3a72":function(t,e,a){var r=a("7726"),o=a("8378"),i=a("2d00"),n=a("37c8"),s=a("86cc").f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:n.f(t)})}},"5df3":function(t,e,a){"use strict";var r=a("02f4")(!0);a("01f9")(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,e=this._t,a=this._i;return a>=e.length?{value:void 0,done:!0}:(t=r(e,a),this._i+=t.length,{value:t,done:!1})}))},"67ab":function(t,e,a){var r=a("ca5a")("meta"),o=a("d3f4"),i=a("69a8"),n=a("86cc").f,s=0,l=Object.isExtensible||function(){return!0},c=!a("79e5")((function(){return l(Object.preventExtensions({}))})),d=function(t){n(t,r,{value:{i:"O"+ ++s,w:{}}})},u=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!l(t))return"F";if(!e)return"E";d(t)}return t[r].i},_=function(t,e){if(!i(t,r)){if(!l(t))return!0;if(!e)return!1;d(t)}return t[r].w},m=function(t){return c&&f.NEED&&l(t)&&!i(t,r)&&d(t),t},f=t.exports={KEY:r,NEED:!1,fastKey:u,getWeak:_,onFreeze:m}},6842:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pad_5"},[a("div",{staticClass:"query_fields pad_b_no handle_timerange"},[a("el-form",{ref:"queryForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.queryForm,size:"mini"}},[a("el-form-item",{attrs:{label:"订单编号",prop:"orderid","label-width":"68px"}},[a("el-input",{staticClass:"wid_140",attrs:{placeholder:"订单编号"},model:{value:t.queryForm.orderid,callback:function(e){t.$set(t.queryForm,"orderid",e)},expression:"queryForm.orderid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号码",prop:"user_phone","label-width":"68px"}},[a("el-input",{staticClass:"wid_140",attrs:{placeholder:"手机号码"},model:{value:t.queryForm.user_phone,callback:function(e){t.$set(t.queryForm,"user_phone",e)},expression:"queryForm.user_phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"订单状态",prop:"orderStatus"}},[a("el-select",{attrs:{placeholder:"请选择订单状态"},model:{value:t.queryForm.orderStatus,callback:function(e){t.$set(t.queryForm,"orderStatus",e)},expression:"queryForm.orderStatus"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),a("el-option",{attrs:{label:"待支付",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"已支付",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"配送中",value:"3"}}),t._v(" "),a("el-option",{attrs:{label:"已完成",value:"4"}}),t._v(" "),a("el-option",{attrs:{label:"已取消",value:"10"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"所属门店",prop:"siteid","label-width":"68px"}},[a("el-select",{staticClass:"wid_140",attrs:{placeholder:"所属门店"},model:{value:t.queryForm.siteid,callback:function(e){t.$set(t.queryForm,"siteid",e)},expression:"queryForm.siteid"}},t._l(t.queryForm.siteids,(function(t,e){return a("el-option",{key:t.siteid,attrs:{label:t.site_name,value:t.siteid}})})),1)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.queryData}},[t._v("\n          查询\n        ")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){return t.resetData("queryForm")}}},[t._v("\n          重置\n        ")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handle_refresh}},[t._v("\n          刷新\n        ")])],1)],1)],1),t._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"orderid",label:"订单编号","show-overflow-tooltip":!0,width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"用户姓名",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_phone",label:"用户手机号",width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"siteName",label:" 站点名",width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:" 总价",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.total_price/100)+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"订单状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.order_status?a("span",[t._v("待支付")]):1==e.row.order_status?a("span",[t._v("已支付")]):2==e.row.order_status?a("span",[t._v("配货中")]):3==e.row.order_status?a("span",[t._v("运输中")]):4==e.row.order_status?a("span",[t._v("签收")]):5==e.row.order_status?a("span",[t._v("评价")]):6==e.row.order_status?a("span",[t._v("取消中")]):7==e.row.order_status?a("span",[t._v("退货中")]):8==e.row.order_status?a("span",[t._v("订单创建")]):9==e.row.order_status?a("span",[t._v("无效订单")]):10==e.row.order_status?a("span",[t._v("已取消")]):11==e.row.order_status?a("span",[t._v("取消失败")]):12==e.row.order_status?a("span",[t._v("已退货")]):13==e.row.order_status?a("span",[t._v("退货失败")]):14==e.row.order_status?a("span",[t._v("已送达")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createtime","show-overflow-tooltip":"",label:"创建时间",width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.handle_detail(e.row)}}},[t._v("\n            订单详情\n          ")])]}}])})],1),t._v(" "),a("div",{staticClass:"block mar_t10"},[a("el-pagination",{attrs:{"current-page":t.currentPage,total:t.pageTotal,background:"",layout:"total, prev, pager, next, jumper"},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.add_loading,expression:"add_loading"}],staticClass:"addUsers_dialog",attrs:{title:"订单详情",visible:t.dialogVisible_detail,width:"80%",top:"10px",center:"","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},on:{"update:visible":function(e){t.dialogVisible_detail=e}}},[a("div",{staticClass:"dialogBody_addPermission"},[a("div",{staticClass:"grid-content bg-purple-dark pad_t2"},[a("el-form",{staticClass:"demo-form-inline valid_form",attrs:{inline:!0,model:t.detailForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"订单ID"}},[a("el-input",{staticClass:"wid_180",attrs:{disabled:!0,placeholder:""},model:{value:t.detailForm.orderid,callback:function(e){t.$set(t.detailForm,"orderid",e)},expression:"detailForm.orderid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户姓名"}},[a("el-input",{staticClass:"wid_180",attrs:{disabled:!0,placeholder:""},model:{value:t.detailForm.user_name,callback:function(e){t.$set(t.detailForm,"user_name",e)},expression:"detailForm.user_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户手机号"}},[a("el-input",{staticClass:"wid_180",attrs:{disabled:!0,placeholder:""},model:{value:t.detailForm.user_phone,callback:function(e){t.$set(t.detailForm,"user_phone",e)},expression:"detailForm.user_phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户地址"}},[a("el-input",{staticClass:"wid_180",attrs:{disabled:!0,placeholder:""},model:{value:t.detailForm.user_address,callback:function(e){t.$set(t.detailForm,"user_address",e)},expression:"detailForm.user_address"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"地详细地址址"}},[a("el-input",{staticClass:"wid_180",attrs:{disabled:!0,placeholder:""},model:{value:t.detailForm.user_detail_address,callback:function(e){t.$set(t.detailForm,"user_detail_address",e)},expression:"detailForm.user_detail_address"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"订单状态"}},[a("el-input",{staticClass:"wid_180",attrs:{disabled:!0,placeholder:""},model:{value:t.detailForm.order_status,callback:function(e){t.$set(t.detailForm,"order_status",e)},expression:"detailForm.order_status"}})],1)],1),t._v(" "),a("p",[t._v("下单商品列表：")]),t._v(" "),a("div",{staticClass:"detailGoodsTable"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoadingGoods,expression:"tableLoadingGoods"}],staticStyle:{width:"100%"},attrs:{data:t.tableDataGoods,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"goodsid",label:"商品ID","show-overflow-tooltip":!0,width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"goods_name",label:"商品名称","show-overflow-tooltip":!0,width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"unit",label:"单位","show-overflow-tooltip":!0,width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"goods_img",label:"商品图","show-overflow-tooltip":!0,width:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{widht:"60px"}},[a("img",{staticStyle:{width:"60px"},attrs:{src:""+t.imgHttpUrl+e.row.goods_img,alt:""}})])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"price",label:"单价","show-overflow-tooltip":!0,width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"goods_count",label:"商品数量","show-overflow-tooltip":!0,width:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_price",label:"总价","show-overflow-tooltip":!0,width:""}})],1)],1)],1)]),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"info",size:"mini"},on:{click:function(e){t.dialogVisible_detail=!1}}},[t._v("\n        关 闭\n      ")])],1)]),t._v(" "),a("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.agent_detail_loading,expression:"agent_detail_loading"}],staticClass:"agent_detail",attrs:{title:"机构详情",visible:t.agent_detail_dialogVisible,width:"50%",center:"","close-on-click-modal":!1,"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},on:{"update:visible":function(e){t.agent_detail_dialogVisible=e}}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.agent_detail_form,"label-width":"68px",disabled:""}},[a("el-form-item",{attrs:{label:"机构名称",prop:"agent_name"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"审批人"},model:{value:t.agent_detail_form.agent_name,callback:function(e){t.$set(t.agent_detail_form,"agent_name",e)},expression:"agent_detail_form.agent_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"负责人",prop:"charger","label-width":"68px"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"负责人"},model:{value:t.agent_detail_form.charger,callback:function(e){t.$set(t.agent_detail_form,"charger",e)},expression:"agent_detail_form.charger"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"联系地址",prop:"address"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"联系地址"},model:{value:t.agent_detail_form.address,callback:function(e){t.$set(t.agent_detail_form,"address",e)},expression:"agent_detail_form.address"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"联系电话",prop:"phone"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"联系电话"},model:{value:t.agent_detail_form.phone,callback:function(e){t.$set(t.agent_detail_form,"phone",e)},expression:"agent_detail_form.phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"联系邮箱",prop:"email"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"联系邮箱"},model:{value:t.agent_detail_form.email,callback:function(e){t.$set(t.agent_detail_form,"email",e)},expression:"agent_detail_form.email"}})],1),t._v(" "),a("div"),t._v(" "),a("el-form-item",{attrs:{label:"开户名",prop:"account_user","label-width":"68px"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"开户名"},model:{value:t.agent_detail_form.account_user,callback:function(e){t.$set(t.agent_detail_form,"account_user",e)},expression:"agent_detail_form.account_user"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"开户行",prop:"bank_code","label-width":"68px"}},[a("el-select",{staticClass:"wid_190",attrs:{placeholder:"开户行"},on:{change:function(e){return t.changeOption_bank(e)}},model:{value:t.agent_detail_form.bank_code,callback:function(e){t.$set(t.agent_detail_form,"bank_code",e)},expression:"agent_detail_form.bank_code"}},t._l(t.agent_detail_form.bankInfo,(function(t,e){return a("el-option",{key:e,attrs:{label:t.bankname,value:t.bankcode}})})),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"账号",prop:"account_no","label-width":"68px"}},[a("el-input",{staticClass:"wid_180",attrs:{placeholder:"账号"},model:{value:t.agent_detail_form.account_no,callback:function(e){t.$set(t.agent_detail_form,"account_no",e)},expression:"agent_detail_form.account_no"}})],1),t._v(" "),a("el-form-item",{staticClass:"marg_r0",attrs:{label:"开户地","label-width":"68px"}},[a("el-col",{attrs:{span:11}},[a("el-form-item",{staticClass:"marg_b0",attrs:{prop:"account_province_code"}},[a("el-select",{staticClass:"wid_90",attrs:{placeholder:"选择省"},on:{change:function(e){return t.changeOption_province_addBank(e)}},model:{value:t.agent_detail_form.account_province_code,callback:function(e){t.$set(t.agent_detail_form,"account_province_code",e)},expression:"agent_detail_form.account_province_code"}},t._l(t.agent_detail_form.account_regions,(function(t,e){return a("el-option",{key:e,attrs:{label:t.province,value:t.adcode}})})),1)],1)],1),t._v(" "),a("el-col",{attrs:{span:11}},[a("el-form-item",{staticClass:"marg_b0",attrs:{prop:"city_code"}},[a("el-select",{staticClass:"wid_90",attrs:{placeholder:"选择市"},on:{change:function(e){return t.changeOption_city_addBank(e)}},model:{value:t.agent_detail_form.account_city_code,callback:function(e){t.$set(t.agent_detail_form,"account_city_code",e)},expression:"agent_detail_form.account_city_code"}},t._l(t.agent_detail_form.account_cities,(function(t,e){return a("el-option",{key:e,attrs:{label:t.city,value:t.adcode}})})),1)],1)],1)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.agent_detail_dialogVisible=!1}}},[t._v("\n        关 闭\n      ")])],1)],1)],1)},o=[],i=(a("ac6a"),a("ac4d"),a("8a81"),a("5df3"),a("1c4c"),a("6b54"),a("7f7f"),a("386d"),a("96cf"),a("1da1")),n=a("ff82"),s=a("cf45");function l(t,e){var a;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(a=c(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,n=!0,s=!1;return{s:function(){a=t[Symbol.iterator]()},n:function(){var t=a.next();return n=t.done,t},e:function(t){s=!0,i=t},f:function(){try{n||null==a.return||a.return()}finally{if(s)throw i}}}}function c(t,e){if(t){if("string"===typeof t)return d(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?d(t,e):void 0}}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,r=new Array(e);a<e;a++)r[a]=t[a];return r}var u={name:"SearchOrder",data:function(){return{imgHttpUrl:"",tableDataGoods:[],tableLoadingGoods:!1,districtSearch:"",tableLoading:!1,tableData:[],pageTotal:100,currentPage:1,fullscreenLoading:!1,queryForm:{siteid:"",orderid:"",user_phone:"",siteids:[],orderStatus:"",virtual_classs:[{id:1,value:"礼物"},{id:2,value:"红包"}],virtual_class:"",city_agent_name:"",virtualSourceCustomid:"",customid:"",custom_name:"",up_customid:"",up_custom_name:"",allTime:"",endTime:"",startTime:""},dialogVisible_detail:!1,add_loading:!1,detailForm:{detailForm_title:"",customid:"",nickname:"",age:"",sex:"",phone:"",wechat:"",province:"",city:"",addr:"",tall:"",weight:"",custom_type:"",member_status:"",email:"",custom_status:"",apple_pay:"",app_openid:"",app_logintype:""},agent_detail_dialogVisible:!1,agent_detail_loading:!1,agent_detail_form:{regions:[],cities:[],bankInfo:"",agentid:"",agent_name:"",charger:"",province_code:"",city_code:"",address:"",virtual_rate:"",account_rate:"",phone:"",email:"",contract_no:"",bank_code:"",account_user:"",account_no:"",account_regions:"",account_cities:[],account_province_code:"",account_city_code:""}}},created:function(){this.imgHttpUrl=s["a"].baseUrl,this.getSiteids(),this.getOrderList(1)},methods:{getOrderList:function(t){var e=this,a={siteid:this.queryForm.siteid,orderid:this.queryForm.orderid,phone:this.queryForm.user_phone,orderStatus:this.queryForm.orderStatus,page_num:t,page_count:10};this.tableLoading=!0,this.$http.post("".concat(s["a"].baseUrl,"/manage/order/searchtMerchantOrder"),a).then((function(t){"0000"==t.data.code&&(console.log(t),e.tableData=t.data.data.orderList,e.pageTotal=t.data.page.page_total,e.tableLoading=!1)})).catch((function(t){}))},getSiteids:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e={},this.$http.post("".concat(s["a"].baseUrl,"/manage/site/searchSite"),e).then((function(t){console.log(t),a.queryForm.siteids=t.data.data.siteList})).catch((function(t){}));case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handle_detail:function(t,e){var a=this,r={orderid:t.orderid};this.dialogVisible_detail=!0,this.add_loading=!0,this.$http.post("".concat(s["a"].baseUrl,"/manage/order/getOrderDetail"),r).then((function(t){if("0000"==t.data.code){var e=t.data.data.orderInfo;switch(a.detailForm.orderid=e.orderid,a.detailForm.user_name=e.user_name,a.detailForm.user_phone=e.user_phone,a.detailForm.user_address=e.user_address,a.detailForm.user_detail_address=e.user_detail_address,e.order_status){case 0:a.detailForm.order_status="待支付";break;case 1:a.detailForm.order_status="已支付";break;case 2:a.detailForm.order_status="配货中";break;case 3:a.detailForm.order_status="运输中";break;case 4:a.detailForm.order_status="签收";break;case 5:a.detailForm.order_status="评价";break;case 6:a.detailForm.order_status="取消中";break;case 7:a.detailForm.order_status="退货中";break;case 8:a.detailForm.order_status="订单创建";break;case 9:a.detailForm.order_status="无效订单";break;case 10:a.detailForm.order_status="已取消";break;case 11:a.detailForm.order_status="取消失败";break;case 12:a.detailForm.order_status="已退货";break;case 13:a.detailForm.order_status="退货失败";break;case 14:a.detailForm.order_status="已送达";break}a.tableDataGoods=e.goodsList,a.add_loading=!1}else a.add_loading=!1,a.m_message(t.data.msg,"error")})).catch((function(t){}))},getBankList:function(){var t=this;this.$http.post("".concat(s["a"].baseUrl,"/agent/addAgent"),{data:{signInUserId:this.$store.getters.userId,signInRoleId:this.$store.getters.roleId}}).then((function(e){"0000"==e.data.code&&(t.bankInfo=t.agent_detail_form.bankInfo=e.data.data.bankList)})).catch((function(t){}))},getTabelDataList:function(t){var e=this,a={data:{signInUserId:this.$store.getters.userId,signInRoleId:this.$store.getters.roleId,pageNum:t,pageSize:10,virtual_class:this.queryForm.virtual_class,city_agent_name:this.queryForm.city_agent_name,virtualSourceCustomid:this.queryForm.virtualSourceCustomid,customid:this.queryForm.customid,custom_name:this.queryForm.custom_name,up_customid:this.queryForm.up_customid,up_custom_name:this.queryForm.up_custom_name,travel_projects:this.queryForm.travel_projects,startTime:this.queryForm.startTime,endTime:this.queryForm.endTime}};this.tableLoading=!0,this.$http.post("".concat(s["a"].baseUrl,"/virtualProfit/selectVirtualProfit"),a).then((function(t){"0000"==t.data.code&&(e.tableData=t.data.data.virtualProfitList,e.pageTotal=t.data.data.page.pageTotal,e.tableLoading=!1)})).catch((function(t){}))},handle_refresh:function(){this.getOrderList(this.currentPage)},exportData:function(){var t={data:{signInUserId:this.$store.getters.userId,signInRoleId:this.$store.getters.roleId,virtual_class:this.queryForm.virtual_class,city_agent_name:this.queryForm.city_agent_name,customid:this.queryForm.customid,startTime:this.queryForm.startTime,endTime:this.queryForm.endTime}};this.fullscreenLoading=!0,window.location.href="".concat(s["a"].baseUrl,"/virtualProfit/exportVirtualProfit?signInUserId=").concat(t.data.signInUserId,"&signInRoleId=").concat(t.data.signInRoleId,"&customid=").concat(t.data.customid,"&virtual_class=").concat(t.data.virtual_class,"&city_agent_name=").concat(t.data.city_agent_name,"&startTime=").concat(t.data.startTime,"&endTime=").concat(t.data.endTime),this.fullscreenLoading=!1},queryData:function(){this.getOrderList(1),this.currentPage=1},resetData:function(t){this.$refs[t].resetFields()},handleCurrentChange:function(t){this.currentPage=t,this.getOrderList(t)},m_message:function(t,e){this.$message({message:t,type:e})},queryCity:function(t,e){var a=this;this.districtSearch.search(t,(function(t,r){var o,i=l(r.districtList[0].districtList);try{for(i.s();!(o=i.n()).done;){var n=o.value;a[e].cities.push({adcode:n.adcode,city:n.customname})}}catch(s){i.e(s)}finally{i.f()}}))},queryBankCity:function(t,e){var a=this;this.districtSearch.search(t,(function(t,r){var o,i=l(r.districtList[0].districtList);try{for(i.s();!(o=i.n()).done;){var n=o.value;a[e].account_cities.push({adcode:n.adcode,city:n.name})}}catch(s){i.e(s)}finally{i.f()}}))},initMap:function(){var t=this;AMap.plugin("AMap.DistrictSearch",(function(){t.districtSearch=new AMap.DistrictSearch({level:"city",subdistrict:1})}))},initProvinces:function(){var t=[];for(var e in n["a"].province_list)t.push({adcode:e,province:n["a"].province_list[e]});this.queryForm.regions=t,this.detailForm.regions=this.detailForm.account_regions=t,this.agent_detail_form.regions=this.agent_detail_form.account_regions=t}}},_=u,m=(a("d676"),a("2877")),f=Object(m["a"])(_,r,o,!1,null,"9921f21a",null);e["default"]=f.exports},"7bbc":function(t,e,a){var r=a("6821"),o=a("9093").f,i={}.toString,n="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(e){return n.slice()}};t.exports.f=function(t){return n&&"[object Window]"==i.call(t)?s(t):o(r(t))}},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"8a81":function(t,e,a){"use strict";var r=a("7726"),o=a("69a8"),i=a("9e1e"),n=a("5ca1"),s=a("2aba"),l=a("67ab").KEY,c=a("79e5"),d=a("5537"),u=a("7f20"),_=a("ca5a"),m=a("2b4c"),f=a("37c8"),p=a("3a72"),h=a("d4c0"),g=a("1169"),v=a("cb7c"),b=a("d3f4"),y=a("4bf8"),w=a("6821"),F=a("6a99"),k=a("4630"),S=a("2aeb"),x=a("7bbc"),C=a("11e9"),I=a("2621"),q=a("86cc"),O=a("0d58"),$=C.f,L=q.f,T=x.f,P=r.Symbol,D=r.JSON,j=D&&D.stringify,A="prototype",U=m("_hidden"),E=m("toPrimitive"),N={}.propertyIsEnumerable,V=d("symbol-registry"),z=d("symbols"),G=d("op-symbols"),M=Object[A],R="function"==typeof P&&!!I.f,J=r.QObject,B=!J||!J[A]||!J[A].findChild,H=i&&c((function(){return 7!=S(L({},"a",{get:function(){return L(this,"a",{value:7}).a}})).a}))?function(t,e,a){var r=$(M,e);r&&delete M[e],L(t,e,a),r&&t!==M&&L(M,e,r)}:L,K=function(t){var e=z[t]=S(P[A]);return e._k=t,e},W=R&&"symbol"==typeof P.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof P},Y=function(t,e,a){return t===M&&Y(G,e,a),v(t),e=F(e,!0),v(a),o(z,e)?(a.enumerable?(o(t,U)&&t[U][e]&&(t[U][e]=!1),a=S(a,{enumerable:k(0,!1)})):(o(t,U)||L(t,U,k(1,{})),t[U][e]=!0),H(t,e,a)):L(t,e,a)},Q=function(t,e){v(t);var a,r=h(e=w(e)),o=0,i=r.length;while(i>o)Y(t,a=r[o++],e[a]);return t},X=function(t,e){return void 0===e?S(t):Q(S(t),e)},Z=function(t){var e=N.call(this,t=F(t,!0));return!(this===M&&o(z,t)&&!o(G,t))&&(!(e||!o(this,t)||!o(z,t)||o(this,U)&&this[U][t])||e)},tt=function(t,e){if(t=w(t),e=F(e,!0),t!==M||!o(z,e)||o(G,e)){var a=$(t,e);return!a||!o(z,e)||o(t,U)&&t[U][e]||(a.enumerable=!0),a}},et=function(t){var e,a=T(w(t)),r=[],i=0;while(a.length>i)o(z,e=a[i++])||e==U||e==l||r.push(e);return r},at=function(t){var e,a=t===M,r=T(a?G:w(t)),i=[],n=0;while(r.length>n)!o(z,e=r[n++])||a&&!o(M,e)||i.push(z[e]);return i};R||(P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var t=_(arguments.length>0?arguments[0]:void 0),e=function(a){this===M&&e.call(G,a),o(this,U)&&o(this[U],t)&&(this[U][t]=!1),H(this,t,k(1,a))};return i&&B&&H(M,t,{configurable:!0,set:e}),K(t)},s(P[A],"toString",(function(){return this._k})),C.f=tt,q.f=Y,a("9093").f=x.f=et,a("52a7").f=Z,I.f=at,i&&!a("2d00")&&s(M,"propertyIsEnumerable",Z,!0),f.f=function(t){return K(m(t))}),n(n.G+n.W+n.F*!R,{Symbol:P});for(var rt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ot=0;rt.length>ot;)m(rt[ot++]);for(var it=O(m.store),nt=0;it.length>nt;)p(it[nt++]);n(n.S+n.F*!R,"Symbol",{for:function(t){return o(V,t+="")?V[t]:V[t]=P(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in V)if(V[e]===t)return e},useSetter:function(){B=!0},useSimple:function(){B=!1}}),n(n.S+n.F*!R,"Object",{create:X,defineProperty:Y,defineProperties:Q,getOwnPropertyDescriptor:tt,getOwnPropertyNames:et,getOwnPropertySymbols:at});var st=c((function(){I.f(1)}));n(n.S+n.F*st,"Object",{getOwnPropertySymbols:function(t){return I.f(y(t))}}),D&&n(n.S+n.F*(!R||c((function(){var t=P();return"[null]"!=j([t])||"{}"!=j({a:t})||"{}"!=j(Object(t))}))),"JSON",{stringify:function(t){var e,a,r=[t],o=1;while(arguments.length>o)r.push(arguments[o++]);if(a=e=r[1],(b(e)||void 0!==t)&&!W(t))return g(e)||(e=function(t,e){if("function"==typeof a&&(e=a.call(this,t,e)),!W(e))return e}),r[1]=e,j.apply(D,r)}}),P[A][E]||a("32e9")(P[A],E,P[A].valueOf),u(P,"Symbol"),u(Math,"Math",!0),u(r.JSON,"JSON",!0)},ac4d:function(t,e,a){a("3a72")("asyncIterator")},b16d:function(t,e,a){},d4c0:function(t,e,a){var r=a("0d58"),o=a("2621"),i=a("52a7");t.exports=function(t){var e=r(t),a=o.f;if(a){var n,s=a(t),l=i.f,c=0;while(s.length>c)l.call(t,n=s[c++])&&e.push(n)}return e}},d676:function(t,e,a){"use strict";var r=a("b16d"),o=a.n(r);o.a},ff82:function(t,e,a){"use strict";e["a"]={province_list:{11e4:"北京市",12e4:"天津市",13e4:"河北省",14e4:"山西省",15e4:"内蒙古自治区",21e4:"辽宁省",22e4:"吉林省",23e4:"黑龙江省",31e4:"上海市",32e4:"江苏省",33e4:"浙江省",34e4:"安徽省",35e4:"福建省",36e4:"江西省",37e4:"山东省",41e4:"河南省",42e4:"湖北省",43e4:"湖南省",44e4:"广东省",45e4:"广西壮族自治区",46e4:"海南省",5e5:"重庆市",51e4:"四川省",52e4:"贵州省",53e4:"云南省",54e4:"西藏自治区",61e4:"陕西省",62e4:"甘肃省",63e4:"青海省",64e4:"宁夏回族自治区",65e4:"新疆维吾尔自治区",71e4:"台湾省",81e4:"香港特别行政区",82e4:"澳门特别行政区"},adcode_list:{"上海市":"310000","云南省":"530000","内蒙古自治区":"150000","北京市":"110000","台湾省":"710000","吉林省":"220000","四川省":"510000","天津市":"120000","宁夏回族自治区":"640000","安徽省":"340000","山东省":"370000","山西省":"140000","广东省":"440000","广西壮族自治区":"450000","新疆维吾尔自治区":"650000","江苏省":"320000","江西省":"360000","河北省":"130000","河南省":"410000","浙江省":"330000","海南省":"460000","湖北省":"420000","湖南省":"430000","澳门特别行政区":"820000","甘肃省":"620000","福建省":"350000","西藏自治区":"540000","贵州省":"520000","辽宁省":"210000","重庆市":"500000","陕西省":"610000","青海省":"630000","香港特别行政区":"810000","黑龙江省":"230000"}}}}]);