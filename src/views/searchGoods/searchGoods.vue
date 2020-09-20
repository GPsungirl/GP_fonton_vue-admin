<template>
  <!-- 充值收益 -->
  <div class="pad_5">
    <!-- M1 查询区域 -->
    <div class="query_fields pad_b_no handle_timerange">
      <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" class="demo-form-inline">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsName" label-width="68px">
          <el-input v-model="queryForm.goodsName" placeholder="商品名称" class="wid_140"></el-input>
        </el-form-item>

        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" size='mini' @click="queryData">查询</el-button>
          <el-button type="success" size='mini' @click="resetData('queryForm')">重置</el-button>
          <el-button type="primary" size='mini' @click="handle_refresh">刷新</el-button>

        </el-form-item>
      </el-form>
    </div>
    <!-- M2 主列表 -->
    <div>
      <!-- 表格 -->
      <el-table :data="tableData" v-loading="tableLoading" border stripe style="width: 100%">
        <el-table-column prop="goods_name" label="商品名称" width=""></el-table-column>
        <el-table-column prop="unit" label="商品规格" width="">
          <!-- <template slot-scope="scope">
                  <span v-if="scope.row.unit == 1">kg</span>
                  <span v-if="scope.row.unit == 2">个</span>
                  <span v-if="scope.row.unit == 3">盒</span>
                  <span v-if="scope.row.unit == 4">袋</span>
                </template> -->
        </el-table-column>
        <el-table-column prop="stock" label="商品库存" width=""></el-table-column>
        <el-table-column prop="" label="商品价格" width="100">
          <template slot-scope="scope">
            {{scope.row.price /100}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="商品原价" width="100">
          <template slot-scope="scope">
            {{scope.row.src_price /100}}
          </template>
        </el-table-column>
        <el-table-column prop="goods_desc" label="商品描述" width="" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" show-overflow-tooltip label="创建时间" width=""></el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.goods_status == 0">不可用</span>
            <span v-if="scope.row.goods_status == 1">可用</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="">
          <template slot-scope="scope">
            <el-button @click="handle_detail(scope.row)" type="text" size="small">详情</el-button>
            <el-button v-if="scope.row.goods_status == 0" @click="handle_frozen(scope.row)" type="text" size="small">可用
            </el-button>
            <el-button v-if="scope.row.goods_status == 1" @click="handle_frozen(scope.row)" type="text" size="small">不可用</el-button>
            <el-button @click="handle_detail(scope.row)" type="text" size="small"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block mar_t10">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :total="pageTotal" background
          layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <!-- M3 dialog 详情 -->
    <el-dialog title="商品详情" :visible.sync="dialogCreate" width="60%" class="addUsers_dialog" center v-loading="add_loading"
      element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <!--新增 body -->
      <div class="dialogBody_addPermission">
        <div class="grid-content bg-purple-dark pad_t2">
          <el-form :inline="true" :model="detailForm" tip="0px" label-width="100px" class="demo-form-inline valid_form">
            <el-form-item label="商品名称">
              <el-input v-model="detailForm.goods_name" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品权重">
              <el-input v-model="detailForm.goods_order" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品LOGO">
              <img :src="detailForm.goods_img" alt="">
            </el-form-item>
            <el-form-item label="商品原产地">
              <el-input v-model="detailForm.made_place" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品价格" class="wid_parent">
              <el-input v-model="detailForm.price" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品库存">
              <el-input v-model="detailForm.stock" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品原价">
              <el-input v-model="detailForm.src_price" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品供应商">
              <el-input v-model="detailForm.supplier" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品banner">
              <div v-if="detailForm.bannerList.length>0">
                <img v-for="(item,index) in detailForm.bannerList" :key="index" :src="item.url" alt="">
              </div>

            </el-form-item>
            <el-form-item label="商品详情图">
              <div v-if="detailForm.detailList.length>0">
                <img v-for="(item,index) in detailForm.detailList" :key="index" :src="item.url" alt="">
              </div>

            </el-form-item>
            <el-form-item label="商品总销量">
              <el-input v-model="detailForm.total_count" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>
            <el-form-item label="商品规格">
              <el-input v-model="detailForm.typeid" :disabled="true" class="wid_140" placeholder></el-input>
            </el-form-item>

          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogCreate = false" size="mini">关 闭</el-button>
        <!-- <el-button type="info" @click="submitCreateGoods" size="mini">创 建</el-button> -->
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

import commonUrl from '../../utils/common';

export default {
  name: 'SearchGoods',
  data () {
    return {
      // 主列表
      tableLoading: false,
      tableData: [],
      // 分页
      pageTotal: 100,
      currentPage: 1,
      // 查询参数
      queryForm: {
        goodsName: '',
      },
      // 新增 弹框规则 修改也用该弹框
      dialogCreate: false,
      add_loading: false,
      detailForm: {
        detailList: [],
        bannerList: [],
        goods_desc: '',
        goods_img: '',
        goods_name: '',
        goods_order: '',
        made_place: '',
        price: '',
        src_price: '',
        stock: '',
        supplier: '',
        total_count: '',
        typeid: ''
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
      goodsTypes: [],
    }

  },
  created () {
    // 初始化主列表
    this.getTabelDataList(1);
    this.getGoodsCatogory()
  },
  methods: {

    // 提交
    submitCreateGoods () {

    },
    // 新增时初始化商品数据
    initGoods () {

    },
    // 获取商品分类
    async getGoodsCatogory () {
      let param = {}
      this.$http.post(`${commonUrl.baseUrl}/manage/goods/getGoodsType`, param).then(res => {
        this.goodsTypes = res.data.data.goodsType

      }).catch(err => { })
    },
    // 初始化主列表
    getTabelDataList (pageNum) {
      // 参数
      let param = {
        goodsName: this.queryForm.goodsName,
        page_num: pageNum,
        page_count: 10,
      }
      this.tableLoading = true
      this.$http.post(`${commonUrl.baseUrl}/manage/goods/searchGoodsInfo`, param).then(res => {
        console.log(res)
        if (res.data.code == '0000') {

          this.tableData = res.data.data.goodsList
          // 分页 总数
          this.pageTotal = res.data.page.page_total;
          // 关闭加载
          this.tableLoading = false
        }
      }).catch(err => { })
    },

    // 详情操作 
    handle_detail (row) {
      // 参数
      let param = {
        goodsid: row.goodsid
      };
      let that = this
      // 开弹框
      this.dialogCreate = true;
      // 加载中
      this.add_loading = true;
      this.$http
        .post(`${commonUrl.baseUrl}/manage/goods/getGoodsDetail`, param)
        .then(res => {
          if (res.data.code == "0000") {
            // 数据赋值

            let gdata = res.data.data.goodsDetail

            this.detailForm.goods_name = gdata.goods_name

            this.detailForm.goods_order = gdata.goods_order
            this.detailForm.made_place = gdata.made_place
            this.detailForm.price = gdata.price
            this.detailForm.src_price = gdata.src_price
            this.detailForm.stock = gdata.stock
            this.detailForm.supplier = gdata.supplier
            this.detailForm.total_count = gdata.total_count
            this.detailForm.typeid = gdata.typeid
            this.detailForm.unit = gdata.unit
            this.detailForm.goods_img = commonUrl.baseUrl + gdata.goods_img
            this.detailForm.bannerList = gdata.bannerList.map(item => {
              item.url = commonUrl.baseUrl + item.url
              return item
            })
            this.detailForm.detailList = gdata.detailList.map(item => {
              item.url = commonUrl.baseUrl + item.url
              return item
            })
            // that.detailForm.goods_desc = gdata.goods_desc

            // this.detailForm = {
            //   goods_desc:gdata.goods_desc,
            //   goods_img:commonUrl.baseUrl+data.goods_img,
            //   goods_name:gdata.goods_name,
            //   goods_order:gdata.goods_order,
            //   made_place:gdata.made_place,
            //   price:gdata.price,
            //   src_price:gdata.src_price,
            //   stock:gdata.stock,
            //   supplier:gdata.supplier,
            //   total_count:gdata.total_count,
            //   typeid:gdata.typeid
            // }
            // this.detailForm.typeid = this.getGoodsCatogory.forEach(item=>{
            //   if(item.typeid == gdata.typeid){
            //     return item.type_name
            //   }
            // })


            this.add_loading = false;
          } else {
            this.add_loading = false;
            this.m_message(res.data.msg, 'error');
          }
        })
        .catch(err => { });
    },

    // 禁用
    handle_frozen (row) {
      let _flag = "";
      let _flag_title = ""
      let _flag_txt = "";
      if (row.goods_status == 1) {//当前可用
        _flag = 0;
        _flag_title = "禁用"
        _flag_txt = "是否冻将该商品设置为不可用?";
      } else {
        _flag = 1;
        _flag_title = "可用"
        _flag_txt = "是否将该商品设置为可用?";
      }
      this.$confirm(_flag_txt, _flag_title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        size: "mini",
        center: true
      }).then(() => {
        let param = {
          goodsInfo: {
            goods_status: _flag,
            goodsid: row.goodsid,
          }
        };
        this.$http
          .post(`${commonUrl.baseUrl}/manage/goods/editGoodsInfo`, param)
          .then(res => {
            if (res.data.code == "0000") {
              this.m_message(res.data.msg, "success");

              // 刷新
              this.handle_refresh();
            } else {
              this.m_message(res.data.msg, "warning");
            }
          })
          .catch(err => { });
      });
    },


    // 所属机构操作
    handle_agent_name (row) {
      let param = {
        data: {
          agentid: row.city_agentid
        }
      }
      this.agent_detail_dialogVisible = true
      this.agent_detail_loading = true
      this.$http.post(`${commonUrl.baseUrl}/agent/selectAgentInfo`, param).then(res => {
        if (res.data.code == '0000') {
          // console.log('机构信息：')
          // console.log(res)
          let result = res.data.data.agentInfo
          // 机构id
          this.agent_detail_form.agentid = result.agentid
          // 机构名称
          this.agent_detail_form.agent_name = result.agent_name
          // 负责人
          this.agent_detail_form.charger = result.charger
          // 业务地区
          // this.agent_detail_form.province_code = result.province_code
          // 根据省查询所有市
          // this.queryCity(result.province, 'agent_detail_form')
          // this.agent_detail_form.city_code = result.city_code
          // 联系地址
          this.agent_detail_form.address = result.address
          // 贝壳分成
          // this.agent_detail_form.virtual_rate = result.virtual_rate
          // 出行分成
          // this.agent_detail_form.account_rate = result.account_rate
          // 电话
          this.agent_detail_form.phone = result.phone
          // 邮箱
          this.agent_detail_form.email = result.email
          // 合同编号
          // this.agent_detail_form.contract_no = result.contract_no
          // 开户行
          this.agent_detail_form.bank_code = result.bank_code
          // 开户名
          this.agent_detail_form.account_user = result.account_user
          // 账号
          this.agent_detail_form.account_no = result.account_no
          // 开户地
          // 查询开户行所在省份下的所有市列表
          this.queryBankCity(result.account_province, 'agent_detail_form')
          this.agent_detail_form.account_province_code = result.account_pro_code
          this.agent_detail_form.account_city_code = result.account_city_code

          this.agent_detail_loading = false
        } else {
          this.agent_detail_loading = false;
          this.m_message(res.data.msg, 'error')
        }
      }).catch(err => { })
    },
    // 刷新
    handle_refresh () {
      this.getTabelDataList(this.currentPage)
      // this.currentPage = 1
    },
    // 查询按钮
    queryData () {

      this.getTabelDataList(1);
      this.currentPage = 1
    },
    // 重置按钮
    resetData (formName) {
      this.$refs[formName].resetFields();
      // 对于queryForm 下拉
      this.queryForm.startTime = ''
      this.queryForm.endTime = ''
    },
    // 分页
    handleCurrentChange (val) {
      this.currentPage = val
      // 获取单前页数据列表
      this.getTabelDataList(val);
      //console.log(`当前页: ${val}`);
    },
    // 提示信息 message:提示信息   type 提示类型
    m_message (message, type) {
      this.$message({
        message,
        type
      })
    },




  }
}
</script>
<style lang="scss" scoped>
img {
  width: 50px;
}
</style>