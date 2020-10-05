<template>
  <!-- -->
  <div class="pad_5">
    <!-- M1 查询区域 -->
    <div class="query_fields pad_b_no">
      <el-form
        :inline="true"
        :model="queryForm"
        ref="queryForm"
        size="mini"
        class="demo-form-inline"
      >
        <!-- 站点名称 -->
        <el-form-item label="站点名称" prop="siteName">
          <el-input
            v-model="queryForm.siteName"
            placeholder="请输入站点名称"
            class="wid_140"
          ></el-input>
        </el-form-item>
        <!-- 招商中心名称 -->
        <!-- <el-form-item label="招商中心名称" prop="siteName">
          <el-input
            v-model="queryForm.siteName"
            placeholder="请输入机构名称"
            class="wid_140"
          ></el-input>
        </el-form-item> -->
        <!-- 查询 -->
        <el-form-item>
          <el-button type="primary" size="mini" @click="queryData">
            查询
          </el-button>
          <el-button type="success" size="mini" @click="resetData('queryForm')">
            重置
          </el-button>

          <el-button type="primary" size="mini" @click="handle_refresh">
            刷新
          </el-button>
          <el-button type="warning" size="mini" @click="handle_add">
            新增站点
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- M2 主列表 -->
    <div>
      <!-- 表格 -->

      <el-table
        :data="tableData"
        v-loading="tableLoading"
        border
        stripe
        style="width: 100%;"
      >
        <el-table-column
          prop="site_name"
          label="站点名称"
          width=""
        ></el-table-column>
        <el-table-column
          prop="contact"
          label="联系人"
          width=""
        ></el-table-column>
        <el-table-column prop="phone" label="手机号" width=""></el-table-column>
        <el-table-column prop="" label="站点图片" width="">
          <template slot-scope="scope">
            <img
              style="width: 50px;"
              :src="`${IMG_URL}${scope.row.site_img}`"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column prop="" label="所属地区" width="">
          <template slot-scope="scope">
            {{ scope.row.province + scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="详细地址"
          width="240"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="creattime"
          label="创建时间"
          width=""
        ></el-table-column>
        <!-- <el-table-column v-if="roleId == 7" prop="" label="审核原因" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.check_cause == 0">新增机构</span>
            <span v-if="scope.row.check_cause == 1">修改信息</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="" label="操作" width="">
          <template slot-scope="scope">
            <el-button
              @click="handle_detail(scope.row)"
              type="text"
              size="small"
            >
              详情
            </el-button>
            <el-button @click="handle_modi(scope.row)" type="text" size="small">
              修改
            </el-button>
            <!-- 只有运营管理才有权限：审核 -->
            <el-button
              v-if="roleId == 7"
              @click="handle_detail_check(scope.row)"
              type="text"
              size="small"
            >
              审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block mar_t10">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="pageTotal"
          background
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
    <!-- M3 dialog 新增站点 -->
    <el-dialog
      title="新增站点"
      class="addSite"
      top="1vh"
      :visible.sync="add_dialogVisible"
      width="50%"
      center
      :close-on-click-modal="false"
      v-loading="add_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 业务信息 -->
      <el-form
        :inline="true"
        :model="add_form"
        :rules="add_rules"
        label-width="80px"
        ref="add_form"
        class="demo-form-inline valid_form"
      >
        <!-- 业务信息 -->
        <!-- <p class="form_title">业务信息</p> -->
        <el-form-item label="站点名称" prop="siteName">
          <el-input
            v-model="add_form.siteName"
            placeholder="站点名称"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input
            v-model="add_form.contact"
            placeholder="联系人"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="add_form.phone"
            placeholder="手机号"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="add_form.address"
            placeholder="详细地址"
            class="wid_180"
          ></el-input>
        </el-form-item>

        <el-form-item label="经纬度" prop="latlon">
          <el-input
            v-model="add_form.latlon"
            placeholder="所在经纬度"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <a
          style="
            color: #409eff;
            vertical-align: center;
            padding-top: 5px;
            display: inline-block;
          "
          href="https://lbs.qq.com/tool/getpoint/index.html"
          target="_blank"
        >
          坐标拾取器
        </a>
      </el-form>
      <el-divider content-position="left">站点图片</el-divider>
      <el-upload
        action=""
        :auto-upload="true"
        accept="jpg,jpeg,png,PNG"
        list-type="picture-card"
        :file-list="files1"
        :before-upload="beforeUpload1"
        :http-request="handlePost1"
        :on-change="changeImage1"
        :on-remove="handleRemove1"
      >
        <i class="el-icon-plus"></i>
        <div slot="tip">
          最多可上传1张jpg/png图片，并且每张图片大小不超过500kb
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_dialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="save_add" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- M3-1 dialog 修改站点 -->
    <el-dialog
      title="修改站点"
      class="addSite"
      top="1vh"
      :visible.sync="modi_dialogVisible"
      width="50%"
      center
      :close-on-click-modal="false"
      v-loading="add_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 业务信息 -->
      <el-form
        :inline="true"
        :model="modi_form"
        :rules="modi_rules"
        label-width="80px"
        ref="modi_form"
        class="demo-form-inline valid_form"
      >
        <!-- 业务信息 -->
        <!-- <p class="form_title">业务信息</p> -->
        <el-form-item label="站点名称" prop="siteName">
          <el-input
            v-model="modi_form.siteName"
            placeholder="站点名称"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input
            v-model="modi_form.contact"
            placeholder="联系人"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="modi_form.phone"
            placeholder="手机号"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="省市区" prop="">
          <el-input
            disabled
            v-model="modi_form.province_city"
            placeholder="详细地址"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="modi_form.address"
            placeholder="详细地址"
            class="wid_180"
          ></el-input>
        </el-form-item>

        <el-form-item label="经纬度" prop="latlon">
          <el-input
            v-model="modi_form.latlon"
            placeholder="所在经纬度"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <a
          style="
            color: #409eff;
            vertical-align: center;
            padding-top: 5px;
            display: inline-block;
          "
          href="https://lbs.qq.com/tool/getpoint/index.html"
          target="_blank"
        >
          坐标拾取器
        </a>
      </el-form>
      <el-divider content-position="left">站点图片</el-divider>
      <el-upload
        action=""
        :auto-upload="true"
        accept="jpg,jpeg,png,PNG"
        list-type="picture-card"
        :file-list="files1"
        :before-upload="beforeUpload1"
        :http-request="handlePost1"
        :on-change="changeImage1"
        :on-remove="handleRemove1"
      >
        <i class="el-icon-plus"></i>
        <div slot="tip">
          最多可上传1张jpg/png图片，并且每张图片大小不超过500kb
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modi_dialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="save_modi" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- M4 dialog 站点详情 -->
    <el-dialog
      title="查看站点详情"
      class="addSite"
      top="1vh"
      :visible.sync="vdetail_dialogVisible"
      width="50%"
      center
      :close-on-click-modal="false"
      v-loading="vdetail_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 业务信息 -->
      <el-form
        disabled
        :inline="true"
        :model="modi_form"
        :rules="modi_rules"
        label-width="80px"
        ref="modi_form"
        class="demo-form-inline valid_form"
      >
        <!-- 业务信息 -->

        <el-form-item label="站点名称" prop="siteName">
          <el-input
            v-model="modi_form.siteName"
            placeholder="站点名称"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input
            v-model="modi_form.contact"
            placeholder="联系人"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="modi_form.phone"
            placeholder="手机号"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="省市区" prop="">
          <el-input
            disabled
            v-model="modi_form.province_city"
            placeholder="详细地址"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="modi_form.address"
            placeholder="详细地址"
            class="wid_180"
          ></el-input>
        </el-form-item>

        <el-form-item label="经纬度" prop="latlon">
          <el-input
            v-model="modi_form.latlon"
            placeholder="所在经纬度"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <a
          style="
            color: #409eff;
            vertical-align: center;
            padding-top: 5px;
            display: inline-block;
          "
          href="https://lbs.qq.com/tool/getpoint/index.html"
          target="_blank"
        >
          坐标拾取器
        </a>
      </el-form>
      <el-divider content-position="left">站点图片</el-divider>
      <el-upload
        action=""
        :auto-upload="true"
        accept="jpg,jpeg,png,PNG"
        list-type="picture-card"
        :file-list="files1"
        :before-upload="beforeUpload1"
        :http-request="handlePost1"
        :on-change="changeImage1"
        :on-remove="handleRemove1"
        disabled
      >
        <i class="el-icon-plus"></i>
        <div slot="tip">
          最多可上传1张jpg/png图片，并且每张图片大小不超过500kb
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="vdetail_dialogVisible = false" size="mini">
          取 消
        </el-button>
      </span>
    </el-dialog>
    <!-- M5 dialog 详情并审核(招商中心) -->
    <el-dialog
      title="招商中心审核"
      :visible.sync="detail_check_dialogVisible"
      width="50%"
      center
      :close-on-click-modal="false"
      v-loading="detail_check_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="agent_detail"
    >
      <!-- 业务信息 -->
      <el-form
        :inline="true"
        :model="detail_check_form"
        class="demo-form-inline"
        disabled
      >
        <!-- 业务信息 -->
        <!-- <p class="form_title">业务信息</p> -->
        <el-form-item label="机构名称" prop="agent_name">
          <el-input
            v-model="detail_check_form.agent_name"
            placeholder="审批人"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="机构编号" prop="agentid">
                    <el-input v-model="detail_check_form.agentid" placeholder="" class="wid_180"></el-input>
                </el-form-item> -->
        <el-form-item label="联系人" prop="contact" label-width="68px">
          <el-input
            v-model="detail_check_form.contact"
            placeholder="联系人"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="业务地区"  class="marg_r0">
                    <el-col :span="11">
                        <el-form-item prop="province_code" class="marg_b0">
                            <el-select v-model="detail_check_form.province_code"
                                placeholder="选择省"
                                class="wid_90"
                                @change="changeOption_province_addBusiness($event)">
                                <el-option v-for="(item, index) in detail_check_form.regions"
                                    :key="index"
                                    :label=" item.province "
                                    :value=" item.adcode ">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item prop="city_code" class="marg_b0">
                            <el-select v-model="detail_check_form.city_code"
                                placeholder="选择市"
                                class="wid_90"
                                @change="changeOption_city_addBusiness($event)">
                                <el-option v-for="(item, index) in detail_check_form.cities"
                                    :key="index"
                                    :label=" item.city "
                                    :value=" item.adcode ">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item> -->
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="detail_check_form.address"
            placeholder="详细地址"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="贝壳分成" prop="virtual_rate">
          <el-input
            v-model="detail_check_form.virtual_rate"
            placeholder="贝壳分成"
            class="wid_181"
          ></el-input>
          %
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="detail_check_form.phone"
            placeholder="手机号"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="出行分成" prop="account_rate">
          <el-input
            v-model="detail_check_form.account_rate"
            placeholder="出行分成"
            class="wid_181"
          ></el-input>
          %
        </el-form-item>
        <el-form-item label="联系邮箱" prop="latlon">
          <el-input
            v-model="detail_check_form.latlon"
            placeholder="联系邮箱"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="站点名称" prop="siteName">
          <el-input
            v-model="detail_check_form.siteName"
            placeholder="站点名称"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="开户名" prop="account_user" label-width="68px">
          <el-input
            v-model="detail_check_form.account_user"
            placeholder="开户名"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="开户行" prop="bank_code" label-width="68px">
                    <el-select v-model="detail_check_form.bank_code"
                        placeholder="开户行"
                        class="wid_190"
                        @change="changeOption_bank($event)">
                        <el-option v-for="(item, index) in detail_check_form.bankInfo"
                            :key="index"
                            :label=" item.bankname "
                            :value=" item.bankcode ">
                        </el-option>
                    </el-select>
                </el-form-item> -->
        <el-form-item label="开户行" prop="account_bank" label-width="68px">
          <el-input
            v-model="detail_check_form.account_bank"
            placeholder=""
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account_no" label-width="68px">
          <el-input
            v-model="detail_check_form.account_no"
            placeholder="账号"
            class="wid_180"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户地" label-width="68px" class="marg_r0">
          <el-col :span="11">
            <el-form-item prop="account_province_code" class="marg_b0">
              <el-select
                v-model="detail_check_form.account_province_code"
                placeholder="选择省"
                class="wid_90"
                @change="changeOption_province_addBank($event)"
              >
                <el-option
                  v-for="(item, index) in detail_check_form.account_regions"
                  :key="index"
                  :label="item.province"
                  :value="item.adcode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="city_code" class="marg_b0">
              <el-select
                v-model="detail_check_form.account_city_code"
                placeholder="选择市"
                class="wid_90"
                @change="changeOption_city_addBank($event)"
              >
                <el-option
                  v-for="(item, index) in detail_check_form.account_cities"
                  :key="index"
                  :label="item.city"
                  :value="item.adcode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>

      <!-- 业务审核 -->
      <el-form
        :inline="true"
        :model="detail_check_form"
        :rules="detail_check_rules"
        ref="detail_check_form"
        class="demo-ruleForm demo-form-inline valid_form"
      >
        <el-form-item label="审核" prop="merchant_check" label-width="68px">
          <el-select
            v-model="detail_check_form.merchant_check"
            placeholder="请选择审核类别"
            class="wid_190"
            @change="selectedAgentCheck($event)"
          >
            <el-option
              v-for="(item, index) in detail_check_form.merchant_checks"
              :key="index"
              :label="item.txt"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核说明" prop="check_remark" label-width="68px">
          <el-input
            type="textarea"
            v-model="detail_check_form.check_remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detail_check_dialogVisible = false" size="mini">
          关 闭
        </el-button>
        <el-button @click="handle_check" type="primary" size="mini">
          审 核
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import provinces from '../../utils/area.js'
import commonUrl from '../../utils/common'
import { isvalidPhone, validNum100, filterSpace } from '../../utils/validate'
import { formData } from '../../utils/formData.js'
export default {
  name: 'merchantCenterCheck',
  data() {
    // 校验手机号
    let validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确手机号码'))
      } else {
        callback()
      }
    }
    // 校验分成
    let validRate = (val, value, callback) => {
      if (!value) {
        callback(new Error('请输入值'))
      } else if (!validNum100(value)) {
        callback(new Error('请输入0-100之间的数'))
      } else {
        callback()
      }
    }
    return {
      // 角色ID
      roleId: '',
      // 加载
      add_loading: false,
      modi_loading: false,
      // 地图
      districtSearch: '',
      // 主列表
      tableLoading: false,
      tableData: [],
      // 分页
      pageTotal: 100,
      currentPage: 1,
      // 银行信息
      bankInfo: '',
      IMG_URL: '',
      imgType: 1,
      filesLOGO: [],
      files1: [],
      // 查询参数
      queryForm: {
        // 招商中心名称
        // siteName: '',
        // 站点名称
        siteName: '',
      },
      // dialog add
      add_dialogVisible: false,
      modi_dialogVisible: false,
      vdetail_dialogVisible: false,
      detail_dialogVisible: false,
      vdetail_loading: false,
      detail_loading: false,
      detail_check_dialogVisible: false,
      detail_check_loading: false,
      // 修改站点
      modi_form: {
        siteid: '',
        province_city: '',
        siteName: '',
        contact: '',
        latlon: '',
        phone: '',
        address: '',
        site_img: '',
      },
      modi_rules: {
        siteName: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
        ],
        // site_img: [
        //   { required: true, message: '请选择站点图片', trigger: 'change' },
        // ],
        // 联系人
        // contact: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        // 业务地区
        // province_code: [
        //   { required: true, message: '请选择业务地区', trigger: 'change' },
        // ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        latlon: [{ required: true, message: '请输入经纬度', trigger: 'blur' }],
        // 电话
        // phone: [{ required: true, trigger: 'blur', validator: validPhone }],
      },
      // 新增 对话框表单
      add_form: {
        // 业务信息
        siteName: '',
        contact: '',
        latlon: '',
        phone: '',
        address: '',
        site_img: '',
      },
      isMOdi: false,
      add_rules: {
        siteName: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
        ],
        // site_img: [
        //   { required: true, message: '请选择站点图片', trigger: 'change' },
        // ],
        // 联系人
        // contact: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        // 业务地区
        // province_code: [
        //   { required: true, message: '请选择业务地区', trigger: 'change' },
        // ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        latlon: [{ required: true, message: '请输入经纬度', trigger: 'blur' }],
        // 电话
        // phone: [{ required: true, trigger: 'blur', validator: validPhone }],
      },

      // 详情
      detail_form: {
        regions: [],
        cities: [],
        // 机构编号
        agentid: '',
        // 招商名称
        siteName: '',
        // 联系人
        contact: '',
        // 业务地区
        province_code: '',
        city_code: '',
        // 详细地址
        address: '',
        // 贝壳分成
        virtual_rate: '',
        // 出行分成
        account_rate: '',
        // 电话
        phone: '',
        // 邮箱
        latlon: '',
        // 站点名称
        siteName: '',
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
        bankInfo: '',

        account_bank: '',
      },
      // 详情并审核
      detail_check_form: {
        // regions:[],
        // cities:[],
        // 机构编号
        agentid: '',
        // 招商名称
        siteName: '',
        // 联系人
        contact: '',
        // 业务地区
        // province_code:'',
        // city_code:'',
        // 详细地址
        address: '',
        // 贝壳分成
        virtual_rate: '',
        // 出行分成
        account_rate: '',
        // 电话
        phone: '',
        // 邮箱
        latlon: '',
        // 站点名称
        siteName: '',
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

        // 审核类别
        merchant_checks: [
          {
            id: 2,
            txt: '审核通过',
          },
          {
            id: 4,
            txt: '审核拒绝',
          },
          {
            id: 5,
            txt: '修改审核拒绝',
          },
        ],
        merchant_check: '',
        // 审核说明
        check_remark: '',
        // 用户id
        userid: '',
        // 招商中心编号
        merchant_center_code: '',
        // 招商中心id
        merchantid: '',
        account_bank: '',
      },
      // 详情并审核 规则
      detail_check_rules: {
        // 审核状态
        merchant_check: [
          { required: true, message: '请选择审核状态', trigger: 'change' },
        ],
        check_remark: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    // 初始化roleId
    this.roleId = this.$store.getters.roleId
    this.IMG_URL = `${commonUrl.baseUrl}`
    // 初始化 地图plugin
    // this.initMap()
    // 初始化 省份
    // this.initProvinces()
    // 初始化 银行信息
    // this.getBankList()
    // 初始化 主数据列表
    this.getTableDataList(1)
  },
  methods: {
    // 初始化 银行信息
    getBankList() {
      this.$http
        .post(`${commonUrl.baseUrl}/merchantCenter/addMerchantCenter`, {
          data: {
            signInUserId: this.$store.getters.userId,
            signInRoleId: this.$store.getters.roleId,
          },
        })
        .then((res) => {
          if (res.data.code == '0000') {
            console.log(res)
            this.bankInfo = this.add_form_bank.bankInfo = res.data.data.bankList
            // 组合省份
            let arr = []
            if (res.data.data.manageProvinceCodeList.length > 0) {
              for (let item of res.data.data.manageProvinceCodeList) {
                arr.push({
                  adcode: item.province_code,
                  province: provinces.province_list[item.province_code],
                })
              }
            }
            this.add_form.regions = arr
          }
        })
        .catch((err) => {})
    },
    // 初始化 主数据列表
    getTableDataList(pageNum) {
      let param = {
        page_num: pageNum,
        page_count: 10,
        siteName: this.queryForm.siteName,
      }
      this.tableLoading = true
      this.$http
        .post(`${commonUrl.baseUrl}/manage/site/searchSite`, param)
        .then((res) => {
          if (res.data.code == '0000') {
            console.log(res)
            this.tableData = res.data.data.siteList

            // 分页总数
            this.pageTotal = res.data.page.page_total
            this.tableLoading = false
          }
        })
        .catch((err) => {})
    },
    // 刷新 主列表
    handle_refresh() {
      this.getTableDataList(this.currentPage)
      // this.currentPage = 1
    },
    // 查询按钮
    queryData() {
      // 根据参数进行查询
      this.getTableDataList(1)
      this.currentPage = 1
    },
    // 详情 操作
    handle_detail(row) {
      this.isMOdi = true
      this.vdetail_dialogVisible = true
      this.vdetail_loading = true
      this.$http
        .post(`${commonUrl.baseUrl}/manage/site/getSiteDetail`, {
          siteid: row.siteid,
        })
        .then((res) => {
          if (res.data.code == '0000') {
            console.log(res)
            const result = res.data.data.siteInfo
            let {
              address,
              area,
              city,
              contact,
              lat_point,
              lon_point,
              phone,
              province,
              site_img,
              site_name,
              siteid,
            } = result
            this.modi_form = {
              siteid,
              province_city: `${province}-${city}-${area}`,
              siteName: site_name,
              contact,
              latlon: `${lat_point},${lon_point}`,
              phone,
              address,
              site_img,
            }
            this.files1 = [
              {
                name: site_img.slice(site_img.lastIndexOf('/') + 1),
                url: `${commonUrl.baseUrl}${site_img}`,
              },
            ]

            this.vdetail_loading = false
          }
        })
        .catch((err) => {})
    },
    // 详情审核
    handle_detail_check(row) {
      // this.detail_check_form.userid = row.userid
      this.detail_check_form.merchantid = row.merchantid
      this.detail_check_form.merchant_center_code = row.merchant_center_code

      this.detail_check_dialogVisible = true
      this.detail_check_loading = true
      this.$http
        .post(`${commonUrl.baseUrl}/merchantCenter/selectCenterInfo`, {
          data: { merchantid: row.merchantid },
        })
        .then((res) => {
          if (res.data.code == '0000') {
            let result = res.data.data.centerInfo
            // 机构id
            // this.detail_form.agentid = result.agentid
            // 招商名称
            this.detail_check_form.siteName = result.siteName
            // 联系人
            this.detail_check_form.contact = result.contact
            // 业务地区
            //this.detail_check_form.province_code = result.province_code
            // 根据省查询所有市
            //this.queryCity(result.province, 'detail_check_form')

            //this.detail_check_form.city_code = result.city_code
            // 详细地址
            this.detail_check_form.address = result.address
            // 贝壳分成
            this.detail_check_form.virtual_rate = result.virtual_rate
            // 出行分成
            this.detail_check_form.account_rate = result.account_rate
            // 电话
            this.detail_check_form.phone = result.phone
            // 邮箱
            this.detail_check_form.latlon = result.latlon
            // 站点名称
            this.detail_check_form.siteName = result.siteName
            // 开户行
            this.detail_check_form.bank_code = result.bank_code
            this.detail_check_form.account_bank = result.account_bank
            // 开户名
            this.detail_check_form.account_user = result.account_user
            // 账号
            this.detail_check_form.account_no = result.account_no
            // 开户地
            // 查询开户行所在省份下的所有市列表
            this.queryBankCity(result.account_province, 'detail_check_form')
            this.detail_check_form.account_province_code =
              result.account_pro_code
            this.detail_check_form.account_city_code = result.account_city_code

            this.detail_check_loading = false
          }
        })
        .catch((err) => {})
    },
    // 审核 按钮
    handle_check() {
      if (this.m_valid_addForm('detail_check_form')) {
        let param = {
          data: {
            // 公参
            signInUserId: this.$store.getters.userId,
            signInRoleId: this.$store.getters.roleId,
            userid: this.detail_check_form.userid,
            // 私参
            merchant_center_code: this.detail_check_form.merchant_center_code,
            merchantid: this.detail_check_form.merchantid,
            merchant_check: this.detail_check_form.merchant_check,
            check_remark: this.detail_check_form.check_remark,
          },
        }
        this.detail_check_loading = true
        this.$http
          .post(
            `${commonUrl.baseUrl}/merchantCenter/checkMerchantCenter`,
            param,
          )
          .then((res) => {
            if (res.data.code == '0000') {
              console.log(res)
              this.detail_check_loading = false
              this.detail_check_dialogVisible = false
              this.m_message('审核完成', 'success')
              this.handle_refresh(1)
            }
          })
          .catch((err) => {})
      }
    },
    // 选中审核状态
    selectedAgentCheck(e) {
      if (e == 2) {
        this.detail_check_rules.check_remark = null
      } else {
        this.detail_check_rules.check_remark = [
          { required: true, message: '请输入审核说明', trigger: 'blur' },
        ]
      }
    },
    changeOption_bank(e) {
      for (let item of this.add_form_bank.bankInfo) {
        if (item.bankcode == e) {
          this.add_form_bank.bankname = item.bankname
        }
      }
    },
    // 》》》》》》》》》》》》》》》
    // *1*上传文件接口
    handlePost1(content) {
      var uploadData = new FormData()

      let file = content.file
      uploadData.append('file', file)

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      formData(uploadData).then((res) => {
        res = res.data
        if (res.code === '0000') {
          if (this.isMOdi) {
            this.modi_form.site_img = res.data.fileUrl
          } else {
            this.add_form.site_img = res.data.fileUrl
          }

          // this.listImgs.push({
          //   fileid: res.data.fileid,
          //   file_url: res.data.fileUrl,
          //   goods_file_type: this.imgType,
          //   imgTitle: this.imgTitle,
          //   previewUrl: res.data.previewUrl,
          //   uid: file.uid,
          // })
          this.$message.success(res.msg)
          loading.close()
        }
      })
    },
    // *1*删除文件
    handleRemove1(file, fileList) {
      this.files1 = fileList
      if (this.isMOdi) {
        this.modi_form.site_img = ''
      } else {
        this.add_form.site_img = ''
      }
    },
    // *1*文件改变
    changeImage1(file, fileList) {
      this.filesLOGO = fileList
    },
    // *1*上传之前
    beforeUpload1(file) {
      if (this.filesLOGO.length > 1) {
        this.$message.error('最多1张')
      }
      const isLt500K = file.size / 1024 < 500
      if (!isLt500K) {
        this.$message.error('图片不超过500K')
      }
      return isLt500K && this.filesLOGO.length <= 1
    },
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // 新增按钮
    handle_add() {
      this.isMOdi = false
      this.add_dialogVisible = true
      // 清空数据
      this.resetForm('add_form')
      // this.resetForm('add_bank_form')

      // this.add_loading = true
      // this.$http
      //   .post(`${commonUrl.baseUrl}/merchantCenter/addMerchantCenter`, {
      //     data: {
      //       signInUserId: this.$store.getters.userId,
      //       signInRoleId: this.$store.getters.roleId,
      //     },
      //   })
      //   .then((res) => {
      //     if (res.data.code == '0000') {
      //       this.add_loading = false
      //       this.bankInfo = this.add_form_bank.bankInfo = res.data.data.bankList
      //       // 组合省份(目的是限制省份)
      //       // let arr = [];
      //       // if(res.data.data.manageProvinceCodeList.length > 0){
      //       //     for(let item of res.data.data.manageProvinceCodeList){
      //       //         arr.push({
      //       //             adcode: item.province_code,
      //       //             province: provinces.province_list[item.province_code]
      //       //         })
      //       //     }
      //       // }
      //       this.add_form.regions = arr
      //     }
      //   })
      //   .catch((err) => {})
    },
    // 保存 新增
    save_add() {
      // 校验

      if (this.m_valid_addForm('add_form')) {
        if (!this.add_form.site_img) {
          this.$message.error('请上传站点图片')
          return
        }
        let param = {
          siteInfo: {
            address: this.add_form.address,
            siteName: this.add_form.siteName,
            contact: this.add_form.contact,
            lat_point: this.add_form.latlon.split(',')[0],
            lon_point: this.add_form.latlon.split(',')[1],
            // latlon: this.add_form.latlon,
            phone: this.add_form.phone,
            site_img: this.add_form.site_img,
          },
        }
        this.add_loading = true
        this.$http
          .post(`${commonUrl.baseUrl}/manage/site/createSite`, param)
          .then((res) => {
            console.log(res)
            if (res.data.code == '0000') {
              this.add_loading = false
              this.add_dialogVisible = false
              this.m_message(res.data.msg, 'success')
              this.handle_refresh()
            } else {
              this.add_loading = false
              this.m_message(res.data.msg, 'success')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },

    // 操作-修改
    handle_modi(row) {
      this.isMOdi = true
      this.modi_dialogVisible = true
      this.modi_loading = true
      this.$http
        .post(`${commonUrl.baseUrl}/manage/site/getSiteDetail`, {
          siteid: row.siteid,
        })
        .then((res) => {
          if (res.data.code == '0000') {
            console.log(res)
            const result = res.data.data.siteInfo
            let {
              address,
              area,
              city,
              contact,
              lat_point,
              lon_point,
              phone,
              province,
              site_img,
              site_name,
              siteid,
            } = result
            this.modi_form = {
              siteid,
              province_city: `${province}-${city}-${area}`,
              siteName: site_name,
              contact,
              latlon: `${lat_point},${lon_point}`,
              phone,
              address,
              site_img,
            }
            this.files1 = [
              {
                name: site_img.slice(site_img.lastIndexOf('/') + 1),
                url: `${commonUrl.baseUrl}${site_img}`,
              },
            ]

            this.modi_loading = false
          }
        })
        .catch((err) => {})
    },
    // 保存编辑
    save_modi() {
      if (this.m_valid_addForm('modi_form')) {
        if (!this.modi_form.site_img) {
          this.$message.error('请上传站点图片')
          return
        }
        let param = {
          siteInfo: {
            address: this.modi_form.address,
            siteName: this.modi_form.siteName,
            contact: this.modi_form.contact,
            lat_point: this.modi_form.latlon.split(',')[0],
            lon_point: this.modi_form.latlon.split(',')[1],
            // latlon: this.add_form.latlon,
            phone: this.modi_form.phone,
            site_img: this.modi_form.site_img,
            siteid: this.modi_form.siteid,
          },
        }
        this.modi_loading = true
        this.$http
          .post(`${commonUrl.baseUrl}/manage/site/editSite`, param)
          .then((res) => {
            console.log(res)
            if (res.data.code == '0000') {
              this.modi_loading = false
              this.modi_dialogVisible = false
              this.m_message(res.data.msg, 'success')
              this.handle_refresh()
            } else {
              this.modi_loading = false
              this.m_message(res.data.msg, 'error')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 重置
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    // 省份change事件
    changeOption_province(e) {
      // 参数收集
      this.queryForm.province_param = {
        adcode: e,
        txt: provinces.province_list[e],
      }
      // 赋值cities (先清理 后赋值)
      this.queryForm.cities = []
      this.queryForm.city_code = ''
      this.queryCity(provinces.province_list[e], 'queryForm')
    },
    changeOption_province_addBusiness(e) {
      // 参数收集
      this.add_form.province_param = {
        adcode: e,
        txt: provinces.province_list[e],
      }
      // 赋值cities (先清理 后赋值)
      this.add_form.cities = []
      this.add_form.city_code = ''
      this.queryCity(provinces.province_list[e], 'add_form')
    },
    changeOption_city_addBusiness(e) {
      for (let item of this.add_form.cities) {
        if (item.adcode == e) {
          this.add_form.city_param = { cityname: item.city, adcode: e }
        }
      }
    },
    changeOption_province_addBank(e) {
      this.add_form_bank.province_param = {
        provincename: provinces.province_list[e],
        adcode: e,
      }
      // 赋值cities (先清理 后赋值)
      this.add_form_bank.cities = []
      this.add_form_bank.city_code = ''
      this.queryCity(provinces.province_list[e], 'add_form_bank')
    },
    // 开户地
    changeOption_city_addBank(e) {
      for (let item of this.add_form_bank.cities) {
        if (item.adcode == e) {
          console.log(item)
          this.add_form_bank.city_param = { cityname: item.city, adcode: e }
        }
      }
    },
    // 查 市区 txt: String 省份名,dataOrigin 是指 add_form  或是queryeForm 这种 父级数据源
    queryCity(txt, dataOrigin) {
      let vm = this
      // 搜索所有省/直辖市信息

      this.districtSearch.search(txt, function (status, result) {
        // 查询成功时，result即为对应的行政区信息
        for (let item of result.districtList[0].districtList) {
          vm[dataOrigin].cities.push({
            adcode: item.adcode,
            city: item.name,
          })
        }
      })
    },
    // 针对 account_cities这个特殊（后期合并方法***）
    queryBankCity(txt, dataOrigin) {
      let vm = this
      // 搜索所有省/直辖市信息

      this.districtSearch.search(txt, function (status, result) {
        // 查询成功时，result即为对应的行政区信息
        for (let item of result.districtList[0].districtList) {
          vm[dataOrigin].account_cities.push({
            adcode: item.adcode,
            city: item.name,
          })
        }
      })
    },
    // 新增 校验规则
    m_valid_addForm(formName) {
      let flag = false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true
          return true
        } else {
          flag = false
          return false
        }
      })
      return flag
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val
      // 获取单前页数据列表
      this.getTableDataList(val)
    },
    // 重置查询条件
    resetData(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }
    },
    // 初始化 地图
    initMap() {
      let vm = this
      //利用高德地图API 获取 所有省
      AMap.plugin('AMap.DistrictSearch', function () {
        vm.districtSearch = new AMap.DistrictSearch({
          // 关键字对应的行政区级别，country表示国家
          level: 'city',
          //  显示下级行政区级数，1表示返回下一级行政区
          subdistrict: 1,
        })
      })
    },
    // 初始化 省份数据
    initProvinces() {
      // 处理一下 数据
      let arr = []
      for (let i in provinces.province_list) {
        arr.push({
          adcode: i,
          province: provinces.province_list[i],
        })
      }
      this.queryForm.regions = arr
      //this.add_form.regions = arr
      this.add_form_bank.regions = arr

      // 详情
      this.detail_form.regions = this.detail_form.account_regions = arr
      // 详情并审核
      this.detail_check_form.regions = this.detail_check_form.account_regions = arr
    },
    // 提示信息 message:提示信息   type 提示类型
    m_message(message, type) {
      this.$message({
        message,
        type,
      })
    },
  },
}
</script>

<style scoped>
.addSite >>> .el-dialog__body {
  height: 500px;
}
</style>
