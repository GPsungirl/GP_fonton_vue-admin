(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d9fe3"],{"6a68":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pad_5"},[a("div",{staticClass:"query_fields pad_b_no handle_timerange"},[a("el-form",{ref:"queryForm",staticClass:"demo-form-inline",attrs:{inline:!0,model:t.queryForm,size:"mini"}},[a("el-form-item",{attrs:{label:"用户ID",prop:"customid","label-width":"68px"}},[a("el-input",{staticClass:"wid_140",attrs:{placeholder:"请输入用户ID"},model:{value:t.queryForm.customid,callback:function(e){t.$set(t.queryForm,"customid",e)},expression:"queryForm.customid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"电话",prop:"phone","label-width":"68px"}},[a("el-input",{staticClass:"wid_140",attrs:{placeholder:"电话"},model:{value:t.queryForm.phone,callback:function(e){t.$set(t.queryForm,"phone",e)},expression:"queryForm.phone"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"消费贝壳","label-width":"68px"}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{prop:"startVirtual"}},[a("el-input",{staticStyle:{width:"70px"},attrs:{placeholder:"最小值"},model:{value:t.queryForm.startVirtual,callback:function(e){t.$set(t.queryForm,"startVirtual",e)},expression:"queryForm.startVirtual"}}),t._v("-\n            ")],1),t._v(" "),a("el-form-item",[a("el-input",{staticStyle:{width:"70px"},attrs:{placeholder:"最大值"},model:{value:t.queryForm.endVirtual,callback:function(e){t.$set(t.queryForm,"endVirtual",e)},expression:"queryForm.endVirtual"}}),t._v("贝壳\n            ")],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"订单编号",prop:"virtual_payoffid","label-width":"68px"}},[a("el-input",{staticClass:"wid_140",attrs:{placeholder:"订单编号"},model:{value:t.queryForm.virtual_payoffid,callback:function(e){t.$set(t.queryForm,"virtual_payoffid",e)},expression:"queryForm.virtual_payoffid"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"消费时间",prop:"businessTime"}},[a("el-date-picker",{attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.queryForm.businessTime,callback:function(e){t.$set(t.queryForm,"businessTime",e)},expression:"queryForm.businessTime"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.queryData}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){return t.resetData("queryForm")}}},[t._v("重置")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handle_refresh}},[t._v("刷新")])],1)],1)],1),t._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"customid",label:"用户ID",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"昵称",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"virtual_src_amount",label:"消费贝壳",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"性别",width:"50px"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.sex?a("span",[t._v("男")]):"2"==e.row.sex?a("span",[t._v("女")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"消费用途",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.virtual_class?a("span",[t._v("礼物")]):2==e.row.virtual_class?a("span",[t._v("红包")]):3==e.row.virtual_class?a("span",[t._v("现金充值")]):4==e.row.virtual_class?a("span",[t._v("提成入账")]):5==e.row.virtual_class?a("span",[t._v("转账")]):6==e.row.virtual_class?a("span",[t._v("提现")]):7==e.row.virtual_class?a("span",[t._v("充值会员")]):8==e.row.virtual_class?a("span",[t._v("预约上线")]):9==e.row.virtual_class?a("span",[t._v("退款")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"gift_name",label:"礼物名称",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"virtual_gift_price",label:"单价",width:"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"virtual_gift_num",label:"数量",width:"60"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createtime","show-overflow-tooltip":!0,label:"消费时间",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"virtual_payoffid",label:"订单编号",width:"","show-overflow-tooltip":!0}})],1),t._v(" "),a("div",{staticClass:"block mar_t10"},[a("el-pagination",{attrs:{"current-page":t.currentPage,total:t.pageTotal,background:"",layout:"total, prev, pager, next, jumper"},on:{"current-change":t.handleCurrentChange}})],1)],1)])},l=[],i=a("cf45"),s={name:"virtualConsumeRecord",data:function(){return{tableLoading:!1,tableData:[],pageTotal:0,currentPage:1,queryForm:{customid:"",phone:"",business_types:[{id:4,value:"邀请上线"}],virtual_class:"",virtual_payoffid:"",businessTime:"",startTime:"",endTime:"",startVirtual:"",endVirtual:"",nickname:""}}},created:function(){this.getTabelDataList(1)},methods:{getTabelDataList:function(t){var e=this,a={data:{signInUserId:this.$store.getters.userId,signInRoleId:this.$store.getters.roleId,pageNum:t,pageSize:10,customid:this.queryForm.customid,phone:this.queryForm.phone,virtual_payoffid:this.queryForm.virtual_payoffid,startTime:this.queryForm.startTime,endTime:this.queryForm.endTime,startVirtual:this.queryForm.startVirtual,endVirtual:this.queryForm.endVirtual}};this.tableLoading=!0,this.$http.post("".concat(i["a"].baseUrl,"/virtualPayoffInfo/selectVirtualPayoffList"),a).then(function(t){"0000"==t.data.code&&(e.tableData=t.data.data.virtualPayoffList,e.pageTotal=t.data.data.page.pageTotal,e.tableLoading=!1)}).catch(function(t){})},handle_refresh:function(){this.getTabelDataList(this.currentPage)},queryData:function(){this.queryForm.startTime=this.queryForm.businessTime[0],this.queryForm.endTime=this.queryForm.businessTime[1],this.getTabelDataList(1),this.currentPage=1},resetData:function(t){this.$refs[t].resetFields(),this.queryForm.businessTime="",this.queryForm.pay_type="",this.queryForm.virtual_class="",this.queryForm.startVirtual="",this.queryForm.endVirtual=""},handleCurrentChange:function(t){this.currentPage=t,this.getTabelDataList(t)}}},o=s,n=a("2877"),u=Object(n["a"])(o,r,l,!1,null,null,null);e["default"]=u.exports}}]);