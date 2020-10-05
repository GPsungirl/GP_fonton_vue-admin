<template>
  <!-- 查询用户列表 -->
  <div class="pad_5">
    <!-- M1 查询区域 -->
    <div class="query_fields pad_b_no">
      <el-form
        :inline="true"
        label-width="90px"
        :model="queryForm"
        ref="queryForm"
        size="mini"
        class="demo-form-inline"
      >
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="nickName">
          <el-input
            v-model="queryForm.nickName"
            placeholder="请输入昵称"
            class="wid_140"
          ></el-input>
        </el-form-item>
        <!-- 是否会员 -->
        <el-form-item label="会员状态" prop="userType">
          <el-select
            v-model="queryForm.userType"
            class="wid_140"
            placeholder="请选择会员状态"
            @change="changeOption_vip($event)"
          >
            <el-option
              v-for="(item, index) in queryForm.userTypes"
              :key="index"
              :label="item.txt"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 性别 -->
        <!-- <el-form-item label="性别" prop="sex">
          <el-select
            v-model="queryForm.sex"
            class="wid_140"
            placeholder="请选择性别"
          >
            <el-option
              v-for="(item, index) in queryForm.sexs"
              :key="index"
              :label="item.txt"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- 所属机构 -->
        <!-- <el-form-item label="所属机构" prop="agent_name">
          <el-input
            v-model="queryForm.agent_name"
            placeholder="所属机构"
            class="wid_140"
          ></el-input>
        </el-form-item> -->
        <!-- 推荐人 -->
        <!-- <el-form-item label="推荐人" prop="up_customname">
          <el-input
            v-model="queryForm.up_customname"
            placeholder="推荐人"
            class="wid_140"
          ></el-input>
        </el-form-item> -->
        <!-- 用户ID -->
        <el-form-item label="用户ID" prop="userid">
          <el-input
            v-model="queryForm.userid"
            placeholder="请输入用户ID"
            class="wid_140"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="queryForm.phone"
            placeholder="手机号"
            class="wid_140"
          ></el-input>
        </el-form-item> -->
        <!-- 用户申请团长审核状态 0不申请  1申请 2申请通过  3审核不通过 不传查询所有 -->
        <el-form-item label="审核状态" prop="checkStatus">
          <el-select
            v-model="queryForm.checkStatus"
            class="wid_140"
            placeholder="请选择审核状态"
          >
            <el-option
              v-for="(item, index) in queryForm.checkStatuss"
              :key="index"
              :label="item.txt"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="累计消费" label-width="68px">
          <el-col :span="24">
            <el-form-item prop="lowMoney">
              <el-input v-model="queryForm.lowMoney" placeholder="最小金额" class style="width:70px"></el-input>-
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryForm.highMoney" placeholder="最大金额" class style="width:70px"></el-input>元
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <!-- 注册时间 -->
        <!-- <el-form-item label="注册时间" prop="times">
          <el-date-picker
            v-model="queryForm.times"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
          prop="userid"
          label="用户ID"
          width=""
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          :show-overflow-tooltip="true"
          width=""
        ></el-table-column>
        <el-table-column prop="" label="LOGO">
          <template slot-scope="scope">
            <img style="width: 30px;" :src="scope.row.avatarurl" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="注册时间"
          :show-overflow-tooltip="true"
          width
        ></el-table-column>
        <!--<el-table-column prop="member_time" label="会员到期" :show-overflow-tooltip="true" width></el-table-column> -->
        <!-- <el-table-column
          prop="agent_name"
          label="所属机构"
          :show-overflow-tooltip="true"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="110"
        ></el-table-column> -->
        <!-- <el-table-column prop="" label="推荐人" width="70">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handle_detail(scope.row, 'up_customid')"
            >
              {{ scope.row.up_customname }}
            </el-button>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="" label="推荐人上级" width="80">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handle_detail(scope.row, 'grand_customid')"
            >
              {{ scope.row.grand_customname }}
            </el-button>
          </template>
        </el-table-column> -->

        <el-table-column prop="" label="是否会员" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.user_type == 1">普通</span>
            <span v-else-if="scope.row.user_type == 2">会员</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="状态" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.custom_status == 1">正常</span>
            <span v-else-if="scope.row.custom_status == 2">异常</span>
          </template>
        </el-table-column> -->
        <!--0 不申请  1 申请 2 申请通过  3 审核不通过 -->
        <el-table-column prop="" label="审核状态" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.user_check_status == 0">不申请</span>
            <span v-else-if="scope.row.user_check_status == 1">申请</span>
            <span v-else-if="scope.row.user_check_status == 2">申请通过</span>
            <span v-else-if="scope.row.user_check_status == 3">审核不通过</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="实名认证状态" width="">
          <template slot-scope="scope">
            <span v-if="scope.row.real_identity_status == 0">未认证</span>
            <span v-else-if="scope.row.real_identity_status == 1">已认证</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="" label="是否实名" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.real_identity_status == 1">已实名</span>
            <span v-else-if="scope.row.real_identity_status == 0">未实名</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="活体状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.face_identity_status == 0">未认证</span>
            <span v-else-if="scope.row.face_identity_status == 1">已认证</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="认证类别" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.authentication_type == 0">系统认证</span>
            <span v-else-if="scope.row.authentication_type == 1">人工认证</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="角色" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.custom_type == 0">普通客户</span>
            <span v-else-if="scope.row.custom_type == 1">合伙人</span>
            <span v-else-if="scope.row.custom_type == 2">业务员</span>
            <span v-else-if="scope.row.custom_type == 3">角落客服</span>
            <span v-else-if="scope.row.custom_type == 4">氛围号</span>
            <span v-else-if="scope.row.custom_type == 5">机构代理</span>
          </template>
        </el-table-column>
        <el-table-column prop label="性别" width="50">
          <template slot-scope="scope">
            <span v-if="scope.row.sex == 1">男</span>
            <span v-if="scope.row.sex == 2">女</span>
            <span v-if="scope.row.sex == 0">未知</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop label="会员状态" width>
          <template slot-scope="scope">
            <span v-if="new Date().getTime() > new Date(scope.row.member_time).getTime()">普通会员</span>
            <span v-else>超级会员</span>
          </template>
        </el-table-column> -->
        <!-- 现居住地 -->
        <!-- <el-table-column prop label="现居住地" width="">
          <template slot-scope="scope">
            <span>{{scope.row.province+scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column prop label="客户类别" width>
          <template slot-scope="scope">
            <span v-if="scope.row.custom_type == 0">普通客户</span>
            <span v-else-if="scope.row.custom_type == 1">兼职向导</span>
            <span v-else-if="scope.row.custom_type == 2">全职向导</span>
            <span v-else-if="scope.row.custom_type == 3">咨询人员</span>
            <span v-else-if="scope.row.custom_type == 4">校园代理</span>
          </template>
        </el-table-column>
        <el-table-column prop label="用户状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.custom_status == 1">可用</span>
            <span v-else-if="scope.row.custom_status == 2">不可用</span>
          </template>
        </el-table-column> -->

        <el-table-column prop label="操作" width>
          <template slot-scope="scope">
            <el-button
              @click="handle_detail(scope.row, 'userid')"
              type="text"
              size="small"
            >
              详情
            </el-button>
            <!-- 审核团长 只有 user_check_status ：1才进行审核-->
            <el-button
              v-if="scope.row.user_check_status == 1"
              @click="handle_check(scope.row)"
              type="text"
              size="small"
            >
              审核
            </el-button>

            <!-- 设置站长 -->
            <el-button
              v-if="
                scope.row.user_check_status == 2 && scope.row.user_type != 2
              "
              @click="handle_vip(scope.row)"
              type="text"
              size="small"
            >
              设置站长
            </el-button>
            <!-- <el-button
              @click="handle_identify(scope.row)"
              type="text"
              size="small"
            >
              人工认证
            </el-button> -->
            <!-- <el-button
              v-if="
                (roleId == 1 || roleId == 7) &&
                scope.row.authentication_type == 1
              "
              @click="handle_identify(scope.row)"
              type="text"
              size="small"
            >
              取消人工
            </el-button> -->
            <!-- 可用 超管和运营 有权限-->
            <!-- <el-button
              v-if="
                (roleId == 1 || roleId == 7) && scope.row.custom_status == 1
              "
              @click="handle_frozen(scope.row)"
              type="text"
              size="small"
            >
              冻结
            </el-button> -->
            <!-- 不可用 超管和运营 有权限-->
            <!-- <el-button
              v-if="
                (roleId == 1 || roleId == 7) && scope.row.custom_status == 2
              "
              @click="handle_frozen(scope.row)"
              type="text"
              size="small"
            >
              解冻
            </el-button> -->
            <!-- 调整角色： 机构、合伙人有权限-->
            <!-- <el-button
             
              @click="modi_role(scope.row)"
              type="text"
              size="small"
            >
              调整角色
            </el-button> -->
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
    <!-- M4 dialog 设置站长 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible_vip"
      width="40%"
      class="addUsers_dialog"
      center
      v-loading="vip_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!--新增 body -->
      <div class="dialogBody_addPermission">
        <div class="grid-content bg-purple-dark pad_t2">
          <el-form
            :inline="true"
            :model="vipForm"
            label-width="80px"
            class="valid_form"
            ref="vip_form"
            :rules="vip_form_rules"
          >
            <p>请选择所在站点</p>
            <!-- <el-form-item label="站点选择" prop="vip_date">
              <el-input
                v-model.number="vipForm.vip_date"
                class="wid_140"
                placeholder="输入会员时长"
              ></el-input>
              <span>天</span>
            </el-form-item> -->
            <el-form-item label="站点选择" prop="site">
              <el-select
                v-model="vipForm.site"
                filterable
                placeholder="请选择站点"
              >
                <el-option
                  v-for="item in vipForm.sites"
                  :label="item.site_name"
                  :value="item.siteid"
                  :key="item.siteid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible_vip = false" size="mini">
          关 闭
        </el-button>
        <el-button type="primary" @click="save_vip" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- M3 dialog 详情 -->
    <el-dialog
      :title="detailForm.detailForm_title + '的信息'"
      :visible.sync="dialogVisible_detail"
      width="42%"
      class="addUsers_dialog"
      center
      v-loading="add_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!--新增 body -->
      <div class="dialogBody_addPermission">
        <div class="grid-content bg-purple-dark pad_t2">
          <el-form
            :inline="true"
            :model="detailForm"
            label-width="80px"
            class="demo-form-inline valid_form"
          >
            <!-- nickname,  avatarurl, createtime,  user_type, user_check_status, up_nickname, -->
            <el-form-item label="用户昵称">
              <el-input
                v-model="detailForm.nickname"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input>
            </el-form-item>

            <el-form-item label="头像">
              <img :src="detailForm.avatarurl" alt="" />
              <!-- <el-input
                v-model="detailForm.nickName"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input> -->
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input
                v-model="detailForm.createtime"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="是否会员">
              <el-input
                v-model="detailForm.user_type"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-input
                v-model="detailForm.user_check_status"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input>
            </el-form-item>
            <el-form-item label="上级昵称">
              <el-input
                v-model="detailForm.up_nickname"
                :disabled="true"
                class="wid_140"
                placeholder
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="info"
          @click="dialogVisible_detail = false"
          size="mini"
        >
          关 闭
        </el-button>
      </span>
    </el-dialog>
    <!-- 调整角色 -->
    <el-dialog
      title="调整角色"
      :visible.sync="modi_rate_dialogVisible"
      top="15vh"
      width="40%"
      center
      :close-on-click-modal="false"
      v-loading="modi_rate_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="modi_role"
    >
      <!-- 业务信息 -->
      <el-form
        :model="modi_rate_form"
        :rules="modi_rate_rules"
        ref="modi_rate_form"
        class="demo-ruleForm valid_form"
        label-width="130px"
      >
        <el-form-item label="选择角色" prop="custom_type">
          <el-select
            v-model="modi_rate_form.custom_type"
            placeholder="会员状态"
            class="wid_140"
          >
            <el-option
              v-for="(item, index) of modi_rate_form.custom_types"
              :key="index"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打赏分成" prop="virtual_rate">
          <el-input
            v-model="modi_rate_form.virtual_rate"
            placeholder="打赏分成"
            class="wid_140"
          ></el-input>
          %
          <span style="color: green; font-size: 12px;">输入1-4之间的数</span>
        </el-form-item>
        <el-form-item label="充值提成" prop="recharge_bonus">
          <el-input
            v-model="modi_rate_form.recharge_bonus"
            placeholder="充值提成"
            class="wid_140"
          ></el-input>
          %
          <span style="color: green; font-size: 12px;">输入1-4之间的数</span>
        </el-form-item>
        <el-form-item label="开通一个月会费" prop="active_fee_month">
          <el-input
            v-model="modi_rate_form.active_fee_month"
            placeholder="开通一个月会费"
            class="wid_140"
          ></el-input>
          元
          <span style="color: green; font-size: 12px;">输入数字小于40</span>
        </el-form-item>
        <el-form-item label="开通三个月会费" prop="active_fee_three_month">
          <el-input
            v-model="modi_rate_form.active_fee_three_month"
            placeholder="开通三个月会费"
            class="wid_140"
          ></el-input>
          元
          <span style="color: green; font-size: 12px;">输入数字小于80</span>
        </el-form-item>
        <el-form-item label="开通六个月会费" prop="active_fee_six_month">
          <el-input
            v-model="modi_rate_form.active_fee_six_month"
            placeholder="开通六个月会费"
            class="wid_140"
          ></el-input>
          元
          <span style="color: green; font-size: 12px;">输入数字小于120</span>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="modi_rate_dialogVisible = false" size="mini">
          关 闭
        </el-button>
        <el-button type="primary" @click="save_modi_role" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- M5 dialog 审核-->
    <el-dialog
      title="审核"
      :visible.sync="detail_check_dialogVisible"
      width="30%"
      center
      v-loading="detail_check_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <!-- 业务审核 -->
      <el-form
        :inline="true"
        :model="detail_check_form"
        :rules="detail_check_rules"
        ref="detail_check_form"
        class="demo-ruleForm demo-form-inline valid_form"
      >
        <el-form-item label="审核状态" prop="merchant_check" label-width="80px">
          <!-- 1待审核2通过3拒绝 -->
          <el-radio-group
            v-model="detail_check_form.merchant_check"
            @change="selectedAgentCheck($event)"
          >
            <!-- <el-radio label="1">待审核</el-radio> -->
            <el-radio label="3">拒绝</el-radio>
            <el-radio label="2">通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="审核说明" prop="check_remark" label-width="80px">
          <el-input
            type="textarea"
            v-model="detail_check_form.check_remark"
          ></el-input>
        </el-form-item> -->
      </el-form>
      <!-- footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="detail_check_dialogVisible = false" size="mini">
          取 消
        </el-button>
        <el-button type="primary" @click="save_check" size="mini">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import provinces from '../../utils/area.js'
import commonUrl from '../../utils/common'
import {
  isvalidPhone,
  validNum100,
  filterSpace,
  validZNum,
  validNum20,
  validNum2,
  validNum4,
  validNum40,
  validNum80,
  validNum120,
  getFloat,
} from '../../utils/validate'
export default {
  name: 'customInfo',
  data() {
    let validMobile = (rule, value, callback) => {
      if (value == '' || value == undefined) {
        callback()
      } else {
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确手机号'))
        } else {
          callback()
        }
      }
    }
    // 比例
    let validRate_commision = (val, value, callback) => {
      if (!value) {
        callback(new Error('请输入值'))
      } else if (!validNum4(value)) {
        callback(new Error('请输入1-4之间的正数,且小数位数不得多于一位'))
      } else {
        callback()
      }
    }
    // 一月会费
    let validFee_one = (val, value, callback) => {
      if (!value) {
        callback(new Error('请输入值'))
      } else if (!validNum40(value)) {
        callback(new Error('请输入0-40之间的正数'))
      } else {
        callback()
      }
    }
    // 三月会费
    let validFee_three = (val, value, callback) => {
      if (!value) {
        callback(new Error('请输入值'))
      } else if (!validNum80(value)) {
        callback(new Error('请输入0-80之间的正数'))
      } else {
        callback()
      }
    }
    // 半月会费
    let validFee_six = (val, value, callback) => {
      if (!value) {
        callback(new Error('请输入值'))
      } else if (!validNum120(value)) {
        callback(new Error('请输入0-120之间的正数'))
      } else {
        callback()
      }
    }
    return {
      roleId: '',
      // 地图
      districtSearch: '',
      // 主列表
      tableLoading: false,
      tableData: [],
      // 分页
      pageTotal: 100,
      currentPage: 1,
      // 查询参数
      queryForm: {
        // 0 不申请  1 申请 2 申请通过  3 审核不通过 不传查询所有
        checkStatuss: [
          { id: 0, txt: '不申请' },
          { id: 1, txt: '申请' },
          { id: 2, txt: '申请通过' },
          { id: 3, txt: '审核不通过' },
        ],
        checkStatus: '',
        userType: '',
        userTypes: [
          // 1 普通 2 会员
          {
            id: 1,
            txt: '普通',
          },
          {
            id: 2,
            txt: '会员',
          },
        ],
        sexs: [
          {
            id: 1,
            txt: '男',
          },
          {
            id: 2,
            txt: '女',
          },
        ],
        sex: '',
        nickName: '',
        agent_name: '',
        up_customname: '',
        // 注册时间段
        times: '',
        startTime: '',
        endTime: '',
        userid: '',
        phone: '',
        lowMoney: '',
        highMoney: '',
        createtime: '',

        // 初始化 省 regions  市 cities
        regions: '',
        cities: [],
        // 省市
        province_code: '',
        city_code: '',
      },
      title: '',
      vipForm: {
        vip_date: '',
        userid: '',
        site: '',
        sites: [],
      },
      vip_form_rules: {
        // vip_date: [
        //   { required: true, message: '会员时长不能为空', trigger: 'blur' },
        //   { type: 'number', message: '会员时长必须为数字值', trigger: 'blur' },
        // ],
        site: [{ required: true, message: '请选择站点', trigger: 'change' }],
      },
      value1: '',
      // 弹框
      vip_loading: false,
      dialogVisible_vip: false,
      // 新增 弹框规则 修改也用该弹框
      dialogVisible_detail: false,
      add_loading: false,
      detailForm: {
        nickname: '',
        avatarurl: '',
        createtime: '',
        user_type: '',
        user_check_status: '',
        up_nickname: '',
      },
      // 调整角色
      modi_rate_dialogVisible: false,
      modi_rate_loading: false,
      modi_rate_form: {
        virtual_rate: '',
        recharge_bonus: '',
        active_fee_month: '',
        active_fee_three_month: '',
        active_fee_six_month: '',
        userid: '',
        userId: '',

        custom_type: '',
        custom_types: [
          // {
          //   id:0,
          //   value:'机构'
          // },
          {
            id: 1,
            value: '合伙人',
          },
          {
            id: 2,
            value: '业务员',
          },
        ],
      },
      modi_rate_rules: {
        // 选择角色
        custom_type: [
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
        // 比例4%
        virtual_rate: [
          { required: true, validator: validRate_commision, trigger: 'blur' },
          // { type: "number", message: "分润比例必须为数字" }
        ],
        // 比例4%
        recharge_bonus: [
          { required: true, validator: validRate_commision, trigger: 'blur' },
        ],
        //单月会费40
        active_fee_month: [
          { required: true, validator: validFee_one, trigger: 'blur' },
          // { type: "number", message: "开户分成必须为数字" }
        ],
        //仨月会费80
        active_fee_three_month: [
          { required: true, validator: validFee_three, trigger: 'blur' },
        ],
        // 六月会费120
        active_fee_six_month: [
          { required: true, validator: validFee_six, trigger: 'blur' },
        ],
      },
      //审核
      detail_check_dialogVisible: false,
      detail_check_loading: false,
      check_dialog: false,
      check_loading: false,
      detail_check_form: {
        agent_accountid: '',
        // 审核类别
        merchant_checks: [
          {
            id: 1,
            txt: '待审核',
          },
          {
            id: 2,
            txt: '审核通过',
          },
          {
            id: 3,
            txt: '审核拒绝',
          },
        ],
        merchant_check: '3',
        // 审核说明
        // check_remark: '',
        // 用户id
        userid: '',
      },
      // 审核 规则
      detail_check_rules: {
        // 审核状态
        // merchant_check:[
        //     { required: true, message: '请选择审核状态', trigger: 'change' }
        // ],
        // check_remark: [
        //   { required: true, message: '请输入拒绝原因', trigger: 'blur' },
        // ],
      },
    }
  },
  created() {
    // 初始化 主列表数据
    this.getTableDataList(1)
    // 获取roleId
    this.roleId = this.$store.getters.roleId
    // 初始化 地图plugin
    this.initMap()
    // 初始化 省份
    this.initProvinces()
  },
  methods: {
    // 初始化 主列表数据
    getTableDataList(pageNum) {
      let param = {
        userid: this.queryForm.userid,
        nickName: this.queryForm.nickName,
        checkStatus: this.queryForm.checkStatus,
        userType: this.queryForm.userType,
        page_num: pageNum,
        page_count: 10,
        // data: {
        //   // signInUserId: this.$store.getters.userId,
        //   // signInRoleId: this.$store.getters.roleId,
        //   // 用户id
        //   userid: this.queryForm.userid,
        //   nickName: this.queryForm.nickName,
        //   checkStatus: this.queryForm.checkStatus,
        //   userType: this.queryForm.userType,
        //   page_num: pageNum,
        //   page_count: 10,
        //   // phone: this.queryForm.phone,
        //   // agent_name: this.queryForm.agent_name,
        //   // up_customname: this.queryForm.up_customname,
        //   // sex: this.queryForm.sex,
        //   // lowMoney:
        //   //   this.queryForm.lowMoney == ""
        //   //     ? this.queryForm.lowMoney
        //   //     : this.queryForm.lowMoney * 100,
        //   // highMoney:
        //   //   this.queryForm.highMoney == ""
        //   //     ? this.queryForm.highMoney
        //   //     : this.queryForm.highMoney * 100,

        //   // province_code:this.queryForm.province_code,
        //   // city_code:this.queryForm.city_code,
        //   // 注册时间
        //   // startTime:this.queryForm.startTime,
        //   // endTime:this.queryForm.endTime,
        // },
      }

      this.tableLoading = true
      this.$http
        .post(`${commonUrl.baseUrl}/manage/custom/searchCustomUser`, param)
        .then((res) => {
          if (res.data.code == '0000') {
            this.tableLoading = false
            this.tableData = res.data.data.userList
            // 分页 总数
            this.pageTotal = res.data.page.page_total
          }
        })
        .catch((err) => {})
    },
    // 人工认证/取消人工认证
    handle_identify(row) {
      let _flag = ''
      let _flag_title = ''
      let _flag_txt = ''
      if (row.authentication_type == 1) {
        //取消人工
        _flag = 0
        _flag_title = '取消人工认证'
        _flag_txt = '是否取消人工认证?'
      } else {
        _flag = 1
        _flag_title = '人工认证'
        _flag_txt = '是否人工认证?'
      }
      this.$confirm(_flag_txt, _flag_title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        size: 'mini',
        center: true,
      }).then(() => {
        let param = {
          data: {
            identityid: row.identityid,
            authentication_type: _flag,
          },
        }
        this.$http
          .post(
            `${commonUrl.baseUrl}/identityInfo/updateCheckAuthentication`,
            param,
          )
          .then((res) => {
            if (res.data.code == '0000') {
              this.m_message(res.data.msg, 'success')

              // 刷新
              this.handle_refresh()
            } else {
              this.m_message(res.data.msg, 'warning')
            }
          })
          .catch((err) => {})
      })
    },
    // 操作设置站长
    handle_vip(row) {
      // 获取站点的下拉数据
      let param = {
        page_num: 1,
        page_count: 100000,
      }

      this.vip_loading = true
      this.$http
        .post(`${commonUrl.baseUrl}/manage/site/searchSite`, param)
        .then((res) => {
          console.log(res)
          if (res.data.code == '0000') {
            // 处理数据
            this.vipForm.sites = res.data.data.siteList

            this.vip_loading = false

            console.log(res)
          }
        })
        .catch((err) => {})
      // 开弹框
      this.dialogVisible_vip = true
      this.title = `将用户（${row.nickname}）设置为站长`
      this.vipForm.userid = row.userid
      // 加载中
      // this.vip_loading = true;
    },
    // 保存站长设置
    save_vip() {
      if (this.m_valid_addForm('vip_form')) {
        // 提交
        let param = {
          // date: this.vipForm.vip_date,
          siteid: this.vipForm.site,
          userid: this.vipForm.userid,
        }
        this.vip_loading = true
        this.$http
          .post(
            `${commonUrl.baseUrl}/manage/custom/setCustomUserToSiteManager`,
            param,
          )
          .then((res) => {
            if (res.data.code == '0000') {
              this.vip_loading = false
              this.m_message(res.data.msg, 'success')
              this.resetData('vip_form')
              this.dialogVisible_vip = false
              // 刷新
              this.handle_refresh()
            } else {
              this.vip_loading = false
              this.m_message(res.data.msg, 'warning')
              this.resetData('vip_form')
            }
          })
          .catch((err) => {})
      }
    },
    // 调整角色
    modi_role(row) {
      // 开弹框
      this.modi_rate_dialogVisible = true
      this.modi_rate_form.userid = row.userid
      // 初始化数据.......custom_type：0机构 1 合伙人2 业务员
      // 根据当前登陆者角色 显示角色类:roleId:2机构3合伙人
      // 机构可以调整普通用户=>业务员、合伙人
      // 合伙人可以调整普通用户=>业务员
      if (this.roleId == 6) {
        //机构
        this.modi_rate_form.custom_types = [
          {
            id: 1,
            value: '合伙人',
          },
          {
            id: 2,
            value: '业务员',
          },
        ]
      } else if (this.roleId == 14) {
        // 合伙人
        this.modi_rate_form.custom_types = [
          {
            id: 2,
            value: '业务员',
          },
        ]
      }
    },
    // 保存调整角色
    save_modi_role() {
      if (this.m_valid_addForm('modi_rate_form')) {
        // 修正小数位数
        // this.modi_rate_form.virtual_rate = getFloat(this.modi_rate_form.virtual_rate,1);
        let param = {
          data: {
            signInUserId: this.$store.getters.userId,
            signInRoleId: this.$store.getters.roleId,
            userid: this.modi_rate_form.userid,
            custom_type: this.modi_rate_form.custom_type,

            virtual_rate: this.modi_rate_form.virtual_rate,
            recharge_bonus: this.modi_rate_form.recharge_bonus,
            active_fee_month: this.modi_rate_form.active_fee_month * 100,
            active_fee_three_month:
              this.modi_rate_form.active_fee_three_month * 100,
            active_fee_six_month:
              this.modi_rate_form.active_fee_six_month * 100,
          },
        }
        // console.log(param.data)
        // debugger

        this.modi_rate_loading = true
        this.$http
          .post(`${commonUrl.baseUrl}/agent/saveParterOrSalerOrAgent`, param)
          .then((res) => {
            if (res.data.code == '0000') {
              // 处理数据。。。。
              this.modi_rate_loading = false
              this.m_message(res.data.msg, 'success')
              this.modi_rate_dialogVisible = false
              // 更新数据
              this.handle_refresh()
            } else {
              this.modi_rate_loading = false
              this.m_message(res.data.msg, 'warning')
            }
          })
          .catch((err) => {})
      }
    },
    // 查询按钮
    queryData() {
      if (this.queryForm.times.length > 0) {
        // 修正 开始 和结束 时间
        this.queryForm.startTime = this.queryForm.times[0]
        this.queryForm.endTime = this.queryForm.times[1]
      }
      // 参数
      let param = {
        userType: this.queryForm.userType,
        nickName: this.queryForm.nickName,
      }
      // console.log(param);
      // console.log(this.queryForm)
      this.getTableDataList(1)
      this.currentPage = 1
    },
    // 重置按钮
    resetData(formName) {
      // this.queryForm.nickName = "";
      // this.queryForm.userType = "";
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields()
      }

      // 对于queryForm 下拉
      // this.queryForm.startTime = ''
      // this.queryForm.endTime = ''
    },
    // 刷新按钮
    handle_refresh() {
      this.getTableDataList(this.currentPage)
      // this.currentPage = 1;
    },
    // 冻结/解冻 解冻1 冻结2
    handle_frozen(row) {
      let tip_txt = row.custom_status == 1 ? '冻结成功' : '解冻成功'
      let param = {
        data: {
          // 公有
          signInUserId: this.$store.getters.userId,
          signInRole: this.$store.getters.roleId,
          // 参数 私有
          custom_status: row.custom_status == 1 ? 2 : 1,
          userid: row.userid,
        },
      }
      this.tableLoading = true
      this.$http
        .post(`${commonUrl.baseUrl}/customInfo/updateStatus`, param)
        .then((res) => {
          if (res.data.code == '0000') {
            this.tableLoading = false
            this.m_message(tip_txt, 'success')
            this.handle_refresh()
          }
        })
        .catch((err) => {})
    },
    // 详情操作 @params:row:当前行数据；type:当前查询的id：eg:推荐人；推荐人上级，本人
    handle_detail(row, type) {
      // 参数
      let param = {
        userid: row.userid,
      }
      // 开弹框
      this.dialogVisible_detail = true
      // 加载中
      this.add_loading = true
      this.$http
        .post(`${commonUrl.baseUrl}/manage/custom/getCustomDetail`, param)
        .then((res) => {
          console.log(res)
          if (res.data.code == '0000') {
            // 数据赋值
            let result = res.data.data.userInfo
            // 昵称 logo  注册时间 是否会员 审核状态 上级昵称
            let {
              nickname,
              avatarurl,
              createtime,
              user_type,
              user_check_status,
              up_nickname,
            } = result

            this.detailForm = {
              nickname,
              avatarurl,
              createtime,
              user_type,
              user_check_status,
              up_nickname,
            }
            this.detailForm.user_type = user_type == 2 ? '会员' : '普通'
            switch (user_check_status) {
              // 0不申请  1申请 2申请通过  3审核不通过
              case 0:
                this.detailForm.user_check_status = '未申请'
                break
              case 1:
                this.detailForm.user_check_status = '申请中'
                break
              case 2:
                this.detailForm.user_check_status = '申请通过'
                break
              case 3:
                this.detailForm.user_check_status = '申请拒绝'
                break
            }
            // 加载完
            this.add_loading = false
          }
        })
        .catch((err) => {})
    },
    // 机构状态change事件
    changeOption_vip(e) {
      // console.log(e);
    },

    // 审核操作
    handle_check(row) {
      // this.detail_check_form.agent_accountid = row.agent_accountid
      this.detail_check_form.userid = row.userid
      // 清空数据

      this.detail_check_dialogVisible = true
      this.resetData('detail_check_form')
    },
    // 选中审核状态
    selectedAgentCheck(e) {
      // if (e == '2') {
      //   // 通过
      //   this.detail_check_rules.check_remark = null
      // } else {
      //   this.detail_check_rules.check_remark = [
      //     { required: true, message: '请输入审核说明', trigger: 'blur' },
      //   ]
      // }
    },
    // 保存审核
    save_check() {
      if (this.m_valid_addForm('detail_check_form')) {
        let param = {
          userInfo: {
            // 公参
            // signInUserId: this.$store.getters.userId,
            // signInRoleId: this.$store.getters.roleId,
            userid: this.detail_check_form.userid,
            user_check_status: this.detail_check_form.merchant_check,
            // 私参
            // agent_accountid: this.detail_check_form.agent_accountid,

            // check_remark: this.detail_check_form.check_remark,
          },
        }
        this.detail_check_loading = true
        this.$http
          .post(`${commonUrl.baseUrl}/manage/custom/editCustomUser`, param)
          .then((res) => {
            console.log(res)
            if (res.data.code == '0000') {
              this.detail_check_loading = false
              this.detail_check_dialogVisible = false
              this.m_message(res.data.msg, 'success')
              this.handle_refresh(1)
            }
          })
          .catch((err) => {})
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val
      // 获取单前页数据列表
      this.getTableDataList(val)
      //console.log(`当前页: ${val}`);
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
    // 提示信息 message:提示信息   type 提示类型
    m_message(message, type) {
      this.$message({
        message,
        type,
      })
    },
    // 省份change事件
    changeOption_province(e) {
      // 参数收集
      this.queryForm.province_param = {
        adcode: e,
        txt: provinces.province_list[e],
      }
      // console.log(e)
      // console.log(provinces.province_list[e])
      // 赋值cities (先清理 后赋值)
      this.queryForm.cities = []
      this.queryForm.city_code = ''
      this.queryCity(provinces.province_list[e], 'queryForm')
    },
    // 查 市区 txt: String 省份名,dataOrigin 是指 add_form  或是queryeForm 这种 父级数据源
    queryCity(txt, dataOrigin) {
      let vm = this
      // 搜索所有省/直辖市信息

      this.districtSearch.search(txt, function (status, result) {
        // console.log(result)
        // 查询成功时，result即为对应的行政区信息
        for (let item of result.districtList[0].districtList) {
          vm[dataOrigin].cities.push({
            adcode: item.adcode,
            city: item.name,
          })
        }
      })
    },
    // 市区change事件
    changeOption_city(e) {},
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
      // 详情
      //this.detail_form.regions = this.detail_form.account_regions = arr;
      // 详情并修改
      //this.agent_detail_form.regions = this.agent_detail_form.account_regions = arr;
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
  },
}
</script>
<style>
.modi_role .el-dialog__body {
  height: 60vh;
}
</style>
