<template>
  <!-- 订单列表 -->
  <div class="pad_5">
    <!-- M1 查询区域 -->
    <div class="query_fields pad_b_no handle_timerange">
      <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" class="demo-form-inline">

        <el-form-item label="订单编号" prop="orderid" label-width="68px">
          <el-input v-model="queryForm.orderid" placeholder="订单编号" class="wid_140"></el-input>
        </el-form-item>
        <!-- 用户姓名 custom_name-->
        <el-form-item label="手机号码" prop="user_phone" label-width="68px">
          <el-input v-model="queryForm.user_phone" placeholder="手机号码" class="wid_140"></el-input>
        </el-form-item>
        <el-form-item label="所属门店" prop="siteid" label-width="68px">
          <el-select v-model="queryForm.siteid" placeholder="所属门店" class="wid_140">
            <el-option v-for="(item, index) of queryForm.siteids" :key="item.siteid" :label="item.site_name" :value="item.siteid"></el-option>
          </el-select>
        </el-form-item>
        <!-- 订单时间 -->
        <!-- <el-form-item label="订单时间" prop="allTime">
          <el-date-picker v-model="queryForm.allTime" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间"></el-date-picker>
        </el-form-item> -->
        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" size="mini" @click="queryData">查询</el-button>
          <el-button type="success" size="mini" @click="resetData('queryForm')">重置</el-button>
          <el-button type="primary" size="mini" @click="handle_refresh">刷新</el-button>
          <!-- <el-button type="primary" size="mini" @click="exportData" v-loading.fullscreen.lock="fullscreenLoading">导出数据</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <!-- M2 主列表 -->
    <div>
      <!-- 表格 -->
      <el-table :data="tableData" v-loading="tableLoading" border stripe style="width: 100%">
        <!-- orderid 订单id   user_name 用户姓名 user_phone 用户手机号 user_address 用户地址  user_detail_address  详细地址 -->
        <el-table-column prop="orderid" label="订单编号" :show-overflow-tooltip="true" width></el-table-column>
        <el-table-column prop="user_name" label="用户姓名" width="80"></el-table-column>
        <el-table-column prop="user_phone" label="用户手机号" width=""></el-table-column>
        <el-table-column prop="user_address" label="用户地址" width="150"></el-table-column>
        <el-table-column prop="user_detail_address" label="详细地址" width="260"></el-table-column>
        <el-table-column prop="siteName" label=" 站点名" width></el-table-column>
        <el-table-column prop="total_price" label=" 总价" width="80"></el-table-column>
        <el-table-column prop label="订单状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.order_status == 0">待支付</span>
            <span v-else-if="scope.row.order_status == 1">已支付</span>
            <span v-else-if="scope.row.order_status == 2">配货中</span>
            <span v-else-if="scope.row.order_status == 3">运输中</span>
            <span v-else-if="scope.row.order_status == 4">签收</span>
            <span v-else-if="scope.row.order_status == 5">评价</span>
            <span v-else-if="scope.row.order_status == 6">取消中</span>
            <span v-else-if="scope.row.order_status == 7">退货中</span>
            <span v-else-if="scope.row.order_status == 8">订单创建</span>
            <span v-else-if="scope.row.order_status == 9">无效订单</span>
            <span v-else-if="scope.row.order_status == 10">已取消</span>
            <span v-else-if="scope.row.order_status == 11">取消失败</span>
            <span v-else-if="scope.row.order_status == 12">已退货</span>
            <span v-else-if="scope.row.order_status == 13">退货失败</span>
            <span v-else-if="scope.row.order_status == 14">已送达</span>

          </template>
        </el-table-column>
        <el-table-column prop="createtime" show-overflow-tooltip label="创建时间" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="80">
          <template slot-scope="scope">
            <el-button @click="handle_detail(scope.row)" type="text" size="small">订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block mar_t10">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :total="pageTotal" background
          layout="total, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
    <!-- M3 dialog 详情 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible_detail" width="80%" top="10px" class="addUsers_dialog" center v-loading="add_loading"
      element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <!--新增 body -->
      <div class="dialogBody_addPermission">
        <div class="grid-content bg-purple-dark pad_t2">

          <el-form :inline="true" :model="detailForm" label-width="100px" class="demo-form-inline valid_form">
            <el-form-item label="订单ID">
              <el-input v-model="detailForm.orderid" :disabled="true" class="wid_180" placeholder></el-input>
            </el-form-item>
            <el-form-item label="用户姓名">
              <el-input v-model="detailForm.user_name" :disabled="true" class="wid_180" placeholder></el-input>
            </el-form-item>
            <el-form-item label="用户手机号">
              <el-input v-model="detailForm.user_phone" :disabled="true" class="wid_180" placeholder></el-input>
            </el-form-item>
            <el-form-item label="用户地址">
              <el-input v-model="detailForm.user_address" :disabled="true" class="wid_180" placeholder></el-input>
            </el-form-item>
            <el-form-item label="地详细地址址">
              <el-input v-model="detailForm.user_detail_address" :disabled="true" class="wid_180" placeholder></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-input v-model="detailForm.order_status" :disabled="true" class="wid_180" placeholder></el-input>
            </el-form-item>

            <!-- <el-form-item label="用户状态">
              <el-input
                v-model="detailForm.custom_status"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input>
            </el-form-item> -->
          </el-form>

          <!-- 展示订单商品 -->
          <!-- goodsid 商品 id  goods_name 商品名称  unit单位  goods_img 商品 logourl   price 单价   src_price 原价  goods_count 商品数量   total_price总价 -->
          <p>下单商品列表：</p>
          <div class="detailGoodsTable">
            <el-table :data="tableDataGoods" v-loading="tableLoadingGoods" border stripe style="width: 100%">
              <el-table-column prop="goodsid" label="商品ID" :show-overflow-tooltip="true" width></el-table-column>
              <el-table-column prop="goods_name" label="商品名称" :show-overflow-tooltip="true" width></el-table-column>
              <el-table-column prop="unit" label="单位" :show-overflow-tooltip="true" width></el-table-column>
              <el-table-column prop="goods_img" label="商品图" :show-overflow-tooltip="true" width>
                <template slot-scope="scope">
                  <div style="widht:60px;">
                    <img :src="`${imgHttpUrl}`+scope.row.goods_img" alt="" style="width:60px;">
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="单价" :show-overflow-tooltip="true" width></el-table-column>
              <el-table-column prop="goods_count" label="商品数量" :show-overflow-tooltip="true" width></el-table-column>
              <el-table-column prop="total_price" label="总价" :show-overflow-tooltip="true" width></el-table-column>
            </el-table>
          </div>

        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible_detail = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- M5 dialog所属机构-->
    <el-dialog title="机构详情" :visible.sync="agent_detail_dialogVisible" width="50%" center :close-on-click-modal="false"
      v-loading="agent_detail_loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)" class="agent_detail">
      <!-- 业务信息 -->
      <el-form :inline="true" :model="agent_detail_form" class="demo-form-inline " label-width="68px" disabled>
        <!-- 业务信息 -->

        <el-form-item label="机构名称" prop="agent_name">
          <el-input v-model="agent_detail_form.agent_name" placeholder="审批人" class="wid_180"></el-input>
        </el-form-item>
        <!-- <el-form-item label="机构编号" prop="agentid">
                <el-input v-model="agent_detail_form.agentid" placeholder="" class="wid_180"></el-input>
            </el-form-item> -->
        <el-form-item label="负责人" prop="charger" label-width="68px">
          <el-input v-model="agent_detail_form.charger" placeholder="负责人" class="wid_180"></el-input>
        </el-form-item>
        <!-- <el-form-item label="业务地区"  class="marg_r0">
                <el-col :span="11">
                    <el-form-item prop="province_code" class="marg_b0">
                        <el-select v-model="agent_detail_form.province_code"
                            placeholder="选择省"
                            class="wid_90"
                            @change="changeOption_province_addBusiness($event)">
                            <el-option v-for="(item, index) in agent_detail_form.regions"
                                :key="index"
                                :label=" item.province "
                                :value=" item.adcode ">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="city_code" class="marg_b0">
                        <el-select v-model="agent_detail_form.city_code"
                            placeholder="选择市"
                            class="wid_90"
                            @change="changeOption_city_addBusiness($event)">
                            <el-option v-for="(item, index) in agent_detail_form.cities"
                                :key="index"
                                :label=" item.city "
                                :value=" item.adcode ">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item> -->
        <el-form-item label="联系地址" prop="address">
          <el-input v-model="agent_detail_form.address" placeholder="联系地址" class="wid_180"></el-input>
        </el-form-item>
        <!-- <el-form-item label="贝壳分成" prop="virtual_rate">
                <el-input v-model="agent_detail_form.virtual_rate" placeholder="贝壳分成" class="wid_181"></el-input>%
            </el-form-item> -->
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="agent_detail_form.phone" placeholder="联系电话" class="wid_180"></el-input>
        </el-form-item>
        <!-- <el-form-item label="出行分成" prop="account_rate">
                <el-input v-model="agent_detail_form.account_rate" placeholder="出行分成" class="wid_181"></el-input>%
            </el-form-item> -->
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="agent_detail_form.email" placeholder="联系邮箱" class="wid_180"></el-input>
        </el-form-item>
        <!-- <el-form-item label="合同编号" prop="contract_no">
                <el-input v-model="agent_detail_form.contract_no" placeholder="合同编号" class="wid_180"></el-input>
            </el-form-item> -->
        <div></div>
        <el-form-item label="开户名" prop="account_user" label-width="68px">
          <el-input v-model="agent_detail_form.account_user" placeholder="开户名" class="wid_180"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bank_code" label-width="68px">
          <el-select v-model="agent_detail_form.bank_code" placeholder="开户行" class="wid_190" @change="changeOption_bank($event)">
            <el-option v-for="(item, index) in agent_detail_form.bankInfo" :key="index" :label=" item.bankname " :value=" item.bankcode ">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="account_no" label-width="68px">
          <el-input v-model="agent_detail_form.account_no" placeholder="账号" class="wid_180"></el-input>
        </el-form-item>
        <el-form-item label="开户地" label-width="68px" class="marg_r0">
          <el-col :span="11">
            <el-form-item prop="account_province_code" class="marg_b0">
              <el-select v-model="agent_detail_form.account_province_code" placeholder="选择省" class="wid_90"
                @change="changeOption_province_addBank($event)">
                <el-option v-for="(item, index) in agent_detail_form.account_regions" :key="index" :label=" item.province" :value=" item.adcode ">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="city_code" class="marg_b0">
              <el-select v-model="agent_detail_form.account_city_code" placeholder="选择市" class="wid_90" @change="changeOption_city_addBank($event)">
                <el-option v-for="(item, index) in agent_detail_form.account_cities" :key="index" :label=" item.city " :value=" item.adcode ">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="agent_detail_dialogVisible = false" size="mini">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import provinces from '../../utils/area.js'
import commonUrl from "../../utils/common";

export default {
  name: "SearchOrder",
  data () {
    return {
      imgHttpUrl: '',
      tableDataGoods: [],
      tableLoadingGoods: false,
      districtSearch: '',
      // 主列表
      tableLoading: false,
      tableData: [],
      // 分页
      pageTotal: 100,
      currentPage: 1,
      fullscreenLoading: false,
      // 查询参数
      queryForm: {
        siteid: '',
        orderid: '',
        user_phone: '',
        siteids: [],

        virtual_classs: [
          {
            id: 1,
            value: "礼物"
          },
          {
            id: 2,
            value: "红包"
          }
        ],
        // 收益类型
        virtual_class: "",
        // 所属市级机构
        city_agent_name: "",
        // 收益来源ID
        virtualSourceCustomid: "",
        // 用户id
        customid: "",
        // 用户姓名
        custom_name: "",
        // 上级id
        up_customid: "",
        // 上级姓名
        up_custom_name: "",
        // 所有时间
        allTime: "",
        // 结束时间
        endTime: "",
        // 开始时间
        startTime: ""
      },
      // 新增 弹框规则 修改也用该弹框
      dialogVisible_detail: false,
      add_loading: false,
      detailForm: {
        // 标题

        detailForm_title: "",
        customid: "",
        nickname: "",
        age: '',
        sex: "",
        phone: "",
        wechat: '',
        province: '',
        city: '',
        addr: '',
        tall: '',
        weight: '',
        custom_type: "", // 客户类别  0普通客户 1兼职向导人员 2全职向导人员 3咨询人员 4校园代



        member_status: "",
        email: "",
        custom_status: "", //用户状态  1可用 2不可用
        apple_pay: "", //是否可以进行苹果支付 1支持 2不支持
        app_openid: "", //第三方登录标识 微信Openid 陌陌
        app_logintype: "", //app登录类别 0手机号 1微信 2陌陌 3邮箱


      },
      // 所属机构的详情
      agent_detail_dialogVisible: false,
      agent_detail_loading: false,
      agent_detail_form: {
        regions: [],
        cities: [],
        bankInfo: '',
        // 机构编号
        agentid: '',
        // 机构名称
        agent_name: '',
        // 负责人
        charger: '',
        // 业务地区
        province_code: '',
        city_code: '',
        // 联系地址
        address: '',
        // 贝壳分成
        virtual_rate: '',
        // 出行分成
        account_rate: '',
        // 电话
        phone: '',
        // 邮箱
        email: '',
        // 合同编号
        contract_no: '',
        // 开户行
        bank_code: '',
        // 开户名
        account_user: '',
        // 账号
        account_no: '',
        // 开户地
        account_regions: '',
        account_cities: [],
        account_province_code: '',
        account_city_code: '',
      },
    };
  },
  created () {
    // 初始化 地图plugin
    // this.initMap();
    // // 初始化 省份
    // this.initProvinces();
    // // 初始化 银行信息
    // this.getBankList();
    // // 初始化主列表
    // this.getTabelDataList(1);
    this.imgHttpUrl = commonUrl.baseUrl


    // 初始化所有门店
    this.getSiteids()
    // 初始化订单列表
    this.getOrderList(1);
  },
  methods: {
    // ***初始化订单列表
    getOrderList (pageNum) {
      // 参数
      let param = {
        siteid: this.queryForm.siteid,
        orderid: this.queryForm.orderid,
        phone: this.queryForm.user_phone,
        page_num: pageNum,
        page_count: 10,
      }
      this.tableLoading = true
      this.$http.post(`${commonUrl.baseUrl}/manage/order/searchtMerchantOrder`, param).then(res => {

        if (res.data.code == '0000') {
          console.log(res)
          this.tableData = res.data.data.orderList
          // 分页 总数
          this.pageTotal = res.data.page.page_total;
          // 关闭加载
          this.tableLoading = false
        }
      }).catch(err => { })
    },

    // ***获取所有门店
    async getSiteids () {
      let param = {}
      this.$http.post(`${commonUrl.baseUrl}/manage/site/searchSite`, param).then(res => {
        console.log(res)
        this.queryForm.siteids = res.data.data.siteList
      }).catch(err => { })
    },

    // ***详情操作 @params:row:当前行数据
    handle_detail (row, type) {
      // 参数
      let param = {
        orderid: row.orderid
      };
      // 开弹框
      this.dialogVisible_detail = true;
      // 加载中
      this.add_loading = true;
      this.$http
        .post(`${commonUrl.baseUrl}/manage/order/getOrderDetail`, param)
        .then(res => {
          if (res.data.code == "0000") {
            // 数据赋值
            let result = res.data.data.orderInfo;
            this.detailForm.orderid = result.orderid;
            this.detailForm.user_name = result.user_name;
            this.detailForm.user_phone = result.user_phone;
            this.detailForm.user_address = result.user_address;
            this.detailForm.user_detail_address = result.user_detail_address;
            //  状态 0待支付 1已支付 2配货中 3运输中 4签收 5评价 6取消中 7退货中 8订单创建  9无效订单 10已取消  11取消失败  12以退货  13退货失败  14已送达                                 
            switch (result.order_status) {
              case 0:
                this.detailForm.order_status = "待支付";
                break;
              case 1:
                this.detailForm.order_status = "已支付";
                break;
              case 2:
                this.detailForm.order_status = "配货中";
                break;
              case 3:
                this.detailForm.order_status = "运输中";
                break;
              case 4:
                this.detailForm.order_status = "签收";
                break;
              case 5:
                this.detailForm.order_status = "评价";
                break;
              case 6:
                this.detailForm.order_status = "取消中";
                break;
              case 7:
                this.detailForm.order_status = "退货中";
                break;

              case 8:
                this.detailForm.order_status = "订单创建";
                break;
              case 9:
                this.detailForm.order_status = "无效订单";
                break;
              case 10:
                this.detailForm.order_status = "已取消";
                break;
              case 11:
                this.detailForm.order_status = "取消失败";
                break;
              case 12:
                this.detailForm.order_status = "已退货";
                break;
              case 13:
                this.detailForm.order_status = "退货失败";
                break;
              case 14:
                this.detailForm.order_status = "已送达";
                break;

            }

            this.tableDataGoods = result.goodsList
            // 加载完
            this.add_loading = false;
          } else {
            this.add_loading = false;
            this.m_message(res.data.msg, 'error');
          }
        })
        .catch(err => { });
    },


    // 初始化 银行信息
    getBankList () {
      this.$http.post(`${commonUrl.baseUrl}/agent/addAgent`, {
        data: {
          signInUserId: this.$store.getters.userId,
          signInRoleId: this.$store.getters.roleId,
        }
      }).then(res => {
        if (res.data.code == '0000') {
          // console.log(res)
          this.bankInfo = this.agent_detail_form.bankInfo = res.data.data.bankList
        }
      }).catch(err => {

      })
    },
    // 初始化主列表
    getTabelDataList (pageNum) {
      // 参数
      let param = {
        data: {
          // 公有
          signInUserId: this.$store.getters.userId,
          signInRoleId: this.$store.getters.roleId,
          pageNum: pageNum,
          pageSize: 10,
          // 私有
          // 收益类型
          virtual_class: this.queryForm.virtual_class,
          // 所属市级机构
          city_agent_name: this.queryForm.city_agent_name,
          // 收益来源ID
          virtualSourceCustomid: this.queryForm.virtualSourceCustomid,
          // 用户ID
          customid: this.queryForm.customid,
          // 用户姓名
          custom_name: this.queryForm.custom_name,
          // 上级ID
          up_customid: this.queryForm.up_customid,
          // 上级姓名
          up_custom_name: this.queryForm.up_custom_name,
          // 出行项目
          travel_projects: this.queryForm.travel_projects,
          // 出行开始时间
          startTime: this.queryForm.startTime,
          // 出行结束时间
          endTime: this.queryForm.endTime
        }
      };
      this.tableLoading = true;
      this.$http
        .post(`${commonUrl.baseUrl}/virtualProfit/selectVirtualProfit`, param)
        .then(res => {
          // console.log(res)
          // debugger
          if (res.data.code == "0000") {
            this.tableData = res.data.data.virtualProfitList;
            // 分页总数
            this.pageTotal = res.data.data.page.pageTotal;
            // 关闭加载
            this.tableLoading = false;
          }
        })
        .catch(err => { });
    },
    // 刷新
    handle_refresh () {
      this.getOrderList(this.currentPage);
      // this.currentPage = 1;
    },


    // 导出数据
    exportData () {
      let param = {
        data: {
          // 公有
          signInUserId: this.$store.getters.userId,
          signInRoleId: this.$store.getters.roleId,
          // 私有
          // 收益类型
          virtual_class: this.queryForm.virtual_class,
          // 所属市级机构
          city_agent_name: this.queryForm.city_agent_name,
          // 用户ID
          customid: this.queryForm.customid,
          // 出行项目
          // travel_projects:this.queryForm.travel_projects,
          // 出行开始时间
          startTime: this.queryForm.startTime,
          // 出行结束时间
          endTime: this.queryForm.endTime
        }
      };
      this.fullscreenLoading = true;
      window.location.href = `${commonUrl.baseUrl}/virtualProfit/exportVirtualProfit?signInUserId=${param.data.signInUserId}&signInRoleId=${param.data.signInRoleId}&customid=${param.data.customid}&virtual_class=${param.data.virtual_class}&city_agent_name=${param.data.city_agent_name}&startTime=${param.data.startTime}&endTime=${param.data.endTime}`;
      this.fullscreenLoading = false;
      // this.$http.post(`${ commonUrl.baseUrl}/virtualProfit/export`, param).then(res=>{
      //     if(res.data.code == '0000'){
      //         this.m_message(res.data.msg, 'success')

      //     }
      // }).catch(err=>{})
    },
    // 查询按钮
    queryData () {
      // if (this.queryForm.allTime.length > 0) {
      //   // 修正 开始 和结束 时间
      //   this.queryForm.startTime = this.queryForm.allTime[0];
      //   this.queryForm.endTime = this.queryForm.allTime[1];
      // }

      this.getOrderList(1);
      this.currentPage = 1;
    },
    // 重置按钮
    resetData (formName) {
      this.$refs[formName].resetFields();
      // 对于queryForm 下拉
      // this.queryForm.startTime = "";
      // this.queryForm.endTime = "";
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val;
      // 获取单前页数据列表
      this.getOrderList(val);
      //console.log(`当前页: ${val}`);
    },
    // 提示信息 message:提示信息   type 提示类型
    m_message (message, type) {
      this.$message({
        message,
        type
      });
    },
    // 查 市区 txt: String 省份名,dataOrigin 是指 add_form  或是queryeForm 这种 父级数据源
    queryCity (txt, dataOrigin) {

      let vm = this
      // 搜索所有省/直辖市信息

      this.districtSearch.search(txt, function (status, result) {
        // console.log(result)
        // 查询成功时，result即为对应的行政区信息
        for (let item of result.districtList[0].districtList) {
          vm[dataOrigin].cities.push({
            adcode: item.adcode,
            city: item.customname
          })
        }

      })

    },
    // 针对 account_cities这个特殊（后期合并方法***）
    queryBankCity (txt, dataOrigin) {

      let vm = this
      // 搜索所有省/直辖市信息

      this.districtSearch.search(txt, function (status, result) {

        // 查询成功时，result即为对应的行政区信息
        for (let item of result.districtList[0].districtList) {
          vm[dataOrigin].account_cities.push({
            adcode: item.adcode,
            city: item.name
          })
        }

      })

    },
    // 初始化 地图
    initMap () {
      let vm = this
      //利用高德地图API 获取 所有省
      AMap.plugin('AMap.DistrictSearch', function () {
        vm.districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: 'city',
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 1
        })
      })


    },
    // 初始化 省份数据
    initProvinces () {
      // 处理一下 数据
      let arr = [];
      for (let i in provinces.province_list) {
        arr.push({
          adcode: i,
          province: provinces.province_list[i]
        })
      }
      this.queryForm.regions = arr
      // 详情
      this.detailForm.regions = this.detailForm.account_regions = arr
      // 详情并修改
      this.agent_detail_form.regions = this.agent_detail_form.account_regions = arr
    },
  }
};
</script>
<style lang="scss" scoped>
.addUsers_dialog >>> .el-dialog__body {
  height: 500px;
}
.detailGoodsTable{
  height:300px;
  
}
</style>