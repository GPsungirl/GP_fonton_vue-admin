
<template>
  <div class="userPermission">
    <!--module1 功能区域 -->
    <div class="query_fields pad_b_no handle_timerange">
      <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" class="demo-form-inline">
        <el-form-item label="用户姓名" prop="sys_username" label-width="68px">
          <el-input v-model="queryForm.sys_username" placeholder="请输入用户姓名" class="wid_140"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size='mini' @click="resetForm('queryForm')">重置</el-button>
          <el-button type="primary" size="mini" @click="refreshData">刷新</el-button>
          <el-button type="primary" size='mini' @click="queryData">查询</el-button>

          <el-button type="success" size="mini" @click="handle_addUser">新增用户</el-button>
        </el-form-item>
      </el-form>

    </div>
    <!--module2 表格 -->
    <el-table :data="tableData" v-loading="tableLoading" border stripe style="width: 100%">
      <el-table-column prop="sys_username" label="登录账号" width></el-table-column>
      <!-- <el-table-column prop="sys_sys_password" label="密码" width></el-table-column> -->
      <!-- <el-table-column prop="user_name" label="登录账号" width></el-table-column> -->
      <!-- 所属角色 -->
      <!-- <el-table-column prop="rName" label="所属角色" width></el-table-column>
      <el-table-column prop="phone" label="电话" width></el-table-column>
      <el-table-column prop="sex" label="性别" width></el-table-column> -->
      <!-- 状态 sys_status 0可用 1不可用-->
      <el-table-column prop label="用户类别" width>
        <template slot-scope="scope">
          <span v-if="scope.row.sys_usertype == 1">管理员</span>
          <span v-else-if="scope.row.sys_usertype == 2">操作员</span>
        </template>
      </el-table-column>
      <el-table-column prop label="状态" width>
        <template slot-scope="scope">
          <span v-if="scope.row.sys_status == 0">不可用</span>
          <span v-else-if="scope.row.sys_status == 1">可用</span>
        </template>
      </el-table-column>

      <el-table-column prop label="操作" width>
        <template slot-scope="scope">
          <!-- 重置密码 admin有权限 -->
          <el-button v-if="userType == 1" @click="resetPsw(scope.row)" type="text" size="small">重置密码</el-button>
          <el-button @click="modi_permisson(scope.row)" type="text" size="small">修改</el-button>
          <!-- 冻结 -->
          <!-- 可用 -->
          <!-- <el-button
            v-if="scope.row.sys_status == 0"
            @click="handle_frozen(scope.row)"
            type="text"
            size="small"
          >解冻</el-button>

          <el-button
            v-if="scope.row.sys_status == 1"
            @click="handle_frozen(scope.row)"
            type="text"
            size="small"
          >冻结</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!--module3 分页 -->
    <div class="block mar_t10">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        background
        layout="total, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>

    <!--module4 调整权限 dialog1 -->
    <el-dialog
      :title="d_modi_userPermission.modi_title"
      :visible.sync="permission_dialogVisible"
      width="40%"
      center
      class="modiUsers_dialog"
      v-loading="modi_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <!--修改 body -->
      <div>
        <el-row>
          <!-- 左侧表单 -->
          <el-col :span="5">
            <div class="grid-content bg-purple-dark pad_t2"></div>
          </el-col>
          <!-- 右侧 tree -->
          <el-col :span="19">
            <div class="grid-content bg-purple-dark"></div>
          </el-col>
        </el-row>
      </div>
      <!--dialog footer  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="permission_dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="modiData_userPermission" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!--module5 新增 dialog2 -->
    <el-dialog
      :title="dialog_title"
      :visible.sync="addUsers_dialogVisible"
      width="42%"
      class="addUsers_dialog dialog_tip"
      center
      :close-on-click-modal="false"
      v-loading="add_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      >
      <!--新增 body -->
      <div class="dialogBody_addPermission">
        <!-- <el-row>
          <el-col :span="11"> -->
            <div class="grid-content bg-purple-dark pad_t2">
              <el-form
                :inline="true"
                :model="valid_addForm"
                :rules="add_rules"
                ref="valid_addForm"
                label-width="80px"
                class="demo-form-inline valid_form"
                >
                <el-form-item label="登录账号" prop="sys_username">
                  <el-input v-model="valid_addForm.sys_username" class="wid_140" placeholder="登录账号"></el-input>
                </el-form-item>
                <!-- <el-form-item label="性别" prop="sex">
                  <template>
                    <el-radio v-model="valid_addForm.sex" label="男">男</el-radio>
                    <el-radio v-model="valid_addForm.sex" label="女">女</el-radio>
                  </template>
                </el-form-item>-->
                <!-- <el-form-item label="手机号" prop="phone">
                  <el-input
                    v-model="valid_addForm.phone"
                    @blur="setUserName_add"
                    placeholder="请输入手机号"
                    class="wid_140"
                  ></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="邮箱" prop="email">
                  <el-input v-model="valid_addForm.email" placeholder="请输入邮箱" class="wid_140"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="生日" prop="birth">
                <el-date-picker
                  v-model="valid_addForm.birth_model"
                  type="date"
                  class="wid_140"
                  value-format="yyyyMMdd"
                  placeholder="选择生日">
                </el-date-picker>
                </el-form-item>-->
                <!-- <el-form-item label="地址" prop="address">
                <el-input v-model="valid_addForm.address" placeholder="请输入地址" class="wid_140"></el-input>
                </el-form-item>-->
                <!-- <el-form-item label="账号" prop="user_name">
                  <el-input
                    v-model="valid_addForm.phone"
                    :disabled="true"
                    placeholder="请输入账号"
                    class="wid_140"
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="密码" prop="sys_password">
                  <el-input v-model="valid_addForm.sys_password" placeholder="请输入密码" class="wid_140"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleid">
                  <el-select v-model="valid_addForm.roleid" placeholder="请选择角色" class="wid_140">
                    <el-option
                      v-for="(item, index) of valid_addForm.rolenames"
                      :key="index"
                      :label="item.rolename"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          <!-- </el-col> -->
          <!-- <el-col :span="13">
            <div class="grid-content bg-purple-dark pad_l34" >
              <el-tree
                :data="addDialog_tree"
                show-checkbox
                node-key="id"
                ref="addTree"
                highlight-current
                accordion
                >
              </el-tree>
            </div>
          </el-col>
        </el-row> -->

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="addUsers_dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save_addUser" size="mini">确 定</el-button>
      </span>
    </el-dialog>

    <!-- M6  修改 弹框 -->
    <el-dialog
      title="修改"
      :visible.sync="modiUsers_dialogVisible"
      :close-on-click-modal="false"
      width="42%"
      class="addUsers_dialog dialog_tip"
      center
      v-loading="modiUser_loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
     >
      <!--修改 body -->
      <div class="dialogBody_addPermission">
        <div class="grid-content bg-purple-dark pad_t2">
          <el-form
            :inline="true"
            :model="valid_modiForm"
            :rules="modi_rules"
            ref="valid_modiForm"
            label-width="80px"
            class="demo-form-inline valid_form"
          >
            <el-form-item label="登录账号" prop="sys_username">
              <el-input :disabled="true" v-model="valid_modiForm.sys_username" class="wid_140" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <!-- <el-form-item label="性别" prop="sex">
              <template>
                <el-radio v-model="valid_modiForm.sex" label="男">男</el-radio>
                <el-radio v-model="valid_modiForm.sex" label="女">女</el-radio>
              </template>
            </el-form-item>-->
            <!-- <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="valid_modiForm.phone"
                @blur="setUserName_modi"
                placeholder="请输入手机号"
                class="wid_140"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="valid_modiForm.email" placeholder="请输入邮箱" class="wid_140"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="生日" prop="birth">
            <el-date-picker
              v-model="valid_modiForm.birth_model"
              type="date"
              class="wid_140"
              value-format="yyyyMMdd"
              placeholder="选择生日">
            </el-date-picker>
            </el-form-item>-->
            <!-- <el-form-item label="地址" prop="address">
            <el-input v-model="valid_modiForm.address" placeholder="请输入地址" class="wid_140"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="账号" prop="user_name">
              <el-input
                v-model="valid_modiForm.phone"
                :disabled="true"
                placeholder="请输入账号"
                class="wid_140"
              ></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="密码" prop="sys_password">
              <el-input v-model="valid_modiForm.sys_password" placeholder="请输入密码" class="wid_140"></el-input>
            </el-form-item> -->
            <el-form-item label="角色" prop="roleid">
              <el-select v-model="valid_modiForm.roleid" placeholder="请选择角色名称" class="wid_140">
                <el-option
                  v-for="(item, index) of valid_modiForm.rolenames"
                  :key="index"
                  :label="item.rolename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="sys_status">
              <el-select v-model="valid_modiForm.sys_status" placeholder="请选择状态" class="wid_140">
                <el-option
                  v-for="(item, index) of valid_modiForm.sys_statuss"
                  :key="index"
                  :label="item.txt"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="modiUsers_dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save_modiUser" size="mini">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import commonUrl from "../../utils/common";
import gpCommonJs from "../../utils/functions";

export default {
  name: "userList",

  data() {
    let validMobile = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback();
      } else {
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确手机号"));
        } else {
          callback();
        }
      }
    };
    return {
      // 密码重置弹框、
      // 查询表单
      queryForm:{
        sys_username:'',
      },
      roleId: "",
      userType:'',
      //M1 主列表
      tableData: [],
      tableLoading: false,
      modi_loading: false,
      add_loading: false,
      //M2 分页
      pageTotal: 100,
      currentPage: 1,
      //M3 俩弹框
      permission_dialogVisible: false,
      addUsers_dialogVisible: false,
      // 修改弹框
      modiUsers_dialogVisible: false,
      modiUser_loading: false,
      dialog_title: "新增用户",
      modiSys_dialogTitle: "",
      //M4 添加用户的form
      form: {
        // 角色名称
        name: "",
        // 角色描述
        txt: "",
        // 角色权限
        permission: ""
      },
      formLabelWidth: "120px",
      // 新增 树的数据
      addDialog_tree: [],
      // 修改 树
      modiDialog_tree: [],
      // 默认展开 和 默认选中项
      modi_default_ids: [],
      // 新增 弹框规则 修改也用该弹框
      valid_addForm: {
        sys_username: "",
        sys_password: "",
        // 预固定
        rolename: "",
        roleid: "",
        role_name: "",
        rolenames:[],
        sex: "男",
        phone: "",
        address: "",
        birth: "",
        birth_model: "",
        email: "",
        user_name: "",

      },

      // 修改时的id
      modi_id: "",
      add_rules: {
        sys_username: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ],
        sys_password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // phone: [{ required: true, validator: validMobile, trigger: "blur" }],
        // user_name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        roleid: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      // 修改弹框
      valid_modiForm: {
        sys_username: "",
        sys_password: "",
        sys_userid:'',
        // 预固定
        rolenames:[],
        rolename: "",
        roleid: "",
        role_name: "",
        sys_statuss:[
          {
            id:'1',
            txt:'可用'
          },
          {
            id:'0',
            txt:'禁用'
          }
        ],
        sys_status:'',
        // 预固定
        rolename: "",
        // 修改时禁用 账号密码
        isModi: false,

        sex: "",
        phone: "",
        address: "",
        birth: "",
        birth_model: "",
        email: "",
        user_name: ""
      },
      modi_rules: {
        sys_username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        // sys_password: [
        //   { required: true, message: "请输入密码", trigger: "blur" }
        // ],
        // phone: [{ required: true, validator: validMobile, trigger: "blur" }],
        // user_name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        roleid: [{ required: true, message: "请选择角色", trigger: "change" }],
        sys_status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      // 待修改的 用户信息
      d_modi_userPermission: {
        modi_title: "",
        role_name: "",
        id: "",
        permission: "",
        role_describe: ""
      }
    };
  },
  created() {
    // 初始化数据列表
    this.getList_user(1);

    // 初始化roleId
    this.roleId = this.$store.getters.roleId;
    // console.log(this.roleId)
    this.userType = this.$store.getters.merchant_center_code

  },
  methods: {
    // 查询按钮
    queryData(){
      this.getList_user(1);
      this.currentPage = 1
    },
    // 主列表（获取所有用户信息列表)
    async getList_user(pageNum) {
      // 参数
      let param = {

        signInUserId: this.$store.getters.userId,
        roleid: this.$store.getters.roleId,
        pageNum: pageNum,
        pageSize: 10,
        sys_username:this.queryForm.sys_username,

      };
      this.tableLoading = true;
      const res = await this.$http.post(
        `${commonUrl.baseUrl}/manage/user/search`,
        param
      );
      if (res.data.code == "0000") {
        this.tableLoading = false;

        this.tableData = res.data.data.userList;
        // 分页 总数
        this.pageTotal = res.data.data.data_total;
      }else{
        this.m_message(res.data.msg,'error')
      }
    },
    // 重置密码操作
    resetPsw(row) {
      this.$confirm("是否重置密码", "重置密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        size: "mini",
        center: true
      }).then(() => {
        let param = {
          data: {
            // id: row.id,
            // signInRoleId:this.roleId
            userid:row.sys_userid,
          }
        };
        const loading = this.$loading({
          lock: true,
          text: 'Loading...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http
          .post(`${commonUrl.baseUrl}/manage/user/reset`, param.data)
          .then(res => {
            if (res.data.code == "0000") {
              loading.close();
              this.m_message(res.data.msg, "success");
              // 刷新
              this.refreshData();
            } else {
              this.m_message(res.data.msg, "warning");
            }
          })
          .catch(err => {});
      });
    },

    // 冻结操作
    handle_frozen(row) {
      console.log(row);
      let _flag = "";
      let _flag_txt = "";
      if (row.sys_status == 0) {
        _flag = 1;
        _flag_txt = "是否冻结?";
      } else {
        _flag = 0;
        _flag_txt = "是否解冻?";
      }
      this.$confirm(_flag_txt, "冻结", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        size: "mini",
        center: true
      }).then(() => {
        let param = {
          data: {
            // 用户 角色 id
            // signInUserId: this.$store.getters.userId,
            // signInRoleId: this.$store.getters.roleId,
            // 角色参数
            id: row.id,
            sys_status: _flag
          }
        };
        this.$http
          .post(`${commonUrl.baseUrl}/sysUser/updateDel`, param)
          .then(res => {
            if (res.data.code == "0000") {
              this.m_message(res.data.msg, "success");
              // 刷新
              this.refreshData();
            } else {
              this.m_message(res.data.msg, "warning");
            }
          })
          .catch(err => {});
      });
    },
    // 预获取新增所需数据
    get_addInfo() {
      let param = {
        data: {
          // 公参
          signInUserId: this.$store.getters.userId,
          signInRoleId: this.$store.getters.roleId
        }
      };
      this.$http
        .post(`${commonUrl.baseUrl}/sysUser/addSysUser`, param)
        .then(res => {
          let arr = [];
          if (res.data.code === "0000") {
            for (let item of res.data.data.sysRoleList) {
              arr.push({ id: item.id, role_name: item.role_describe });
            }
            this.valid_addForm.rolename = arr;
            this.valid_modiForm.rolename = arr;
          }
        })
        .catch(err => {});
    },
    // 刷新界面(目前刷新 数据列表)
    refreshData() {
      // 初始化数据列表
      this.getList_user(this.currentPage);
      // 分页 回到第一页
      // this.currentPage = 1;
    },
    // 新增按钮 (点击《新增用户权限》)
    async handle_addUser() {
      // 弹框
      this.addUsers_dialogVisible = true;
      this.dialog_title = "新增用户";
      // 清空
      this.valid_addForm.birth_model = "";
      this.valid_addForm.roleid = "";
      this.valid_addForm.sys_username = '';
      this.valid_addForm.sys_password = '';
      // 请求 登录者 用户权限
      this.add_loading = true;
      // let _param2 ={
      //   pageNum: 1,
      //   pageSize: 100,
      //   rolename:'',
      // }
      // Promise.all([
      //   this.$http.post(`${ commonUrl.baseUrl }/manage/role/authority`),
      //   this.$http.post(`${commonUrl.baseUrl}/manage/role/search`,_param2)
      // ])

      // .then(res=>{
      //   let [res1,res2] = res;
      //   if(res1.data.code === '0000' && res2.data.code === '0000'){
      //     // 赋值权限
      //     let _result = res1.data.data.authorities;
      //     let _menuList = gpCommonJs.designData_tree(_result);
      //     this.addDialog_tree = _menuList;
      //     // 获取后台角色列表
      //     let _result2 = res2.data.data.roleList;
      //     console.log(_result2)
      //     _result2.forEach(item=>{
      //       this.valid_addForm.rolenames.push({
      //         id:item.roleid,
      //         rolename:item.rolename
      //       })
      //     })
      //     this.add_loading = false;
      //   }else{
      //     this.add_loading = false;
      //     this.m_message(res.data.msg, 'error')
      //   }

      // })
      // .catch(err=>{})


      // 获取所有的角色
      let _param2 ={
        pageNum: 1,
        pageSize: 100,
        rolename:'',
      }
      this.$http.post(`${commonUrl.baseUrl}/manage/role/search`,_param2)
      .then(res2=>{
        if(res2.data.code === '0000'){
          let _result2 = res2.data.data.roleList;
          _result2.forEach(item=>{
            this.valid_addForm.rolenames.push({
              id:item.roleid,
              rolename:item.rolename
            })
          })
          this.add_loading = false;
        }else{
          this.add_loading = false;
          this.m_message(res2.data.msg, 'error')
        }
      })
      .catch(err=>{})
    },
    // 新增=保存按钮  (点击弹框中的《确定》)
    save_addUser() {
      // let  treeIds = this.$refs.addTree.getCheckedKeys()
      // // 半选
      // let  halfIds = this.$refs.addTree.getHalfCheckedKeys()
      // if(halfIds.length>0){
      //   treeIds = treeIds.concat(halfIds)
      // }
      // // 必须分配权限
      // if(treeIds.length == 0){
      //     this.m_message('请为该用户分配权限', 'warning')
      //     return ;
      // }

      // // 处理ids为后台所需数据格式
      // let _lists = treeIds.map(val=>{
      //   return { "authorityid":val,"roleid": this.valid_addForm.roleid }
      // })
      if (this.m_valid_addForm("valid_addForm")) {
        let param = {
          data: {
            // 用户 角色 id
            signInUserId: this.$store.getters.userId,
            signInRoleId: this.$store.getters.roleId,
            // 用户参数
            sys_username: this.valid_addForm.sys_username,
            // sex: this.valid_addForm.sex,
            // phone: this.valid_addForm.phone,
            // address: this.valid_addForm.address,
            // birth: this.valid_addForm.birth_model,
            // email: this.valid_addForm.email,
            // user_name: this.valid_addForm.phone,
            sys_password: this.valid_addForm.sys_password,//this.$md5(this.valid_addForm.sys_password),
            roleid:this.valid_addForm.roleid,
            // 角色参数
            // rid: this.valid_addForm.roleid
          }
        };
        // let param2 = {
        //   au:_lists
        // }
        this.add_loading = true;
        this.$http.post(`${commonUrl.baseUrl}/manage/user/create`,param.data)
        .then(res=>{
          if(res.data.code === '0000'){
            this.add_loading = false;
            this.m_message(res.data.msg, "success");
            this.getList_user(this.currentPage);
            this.addUsers_dialogVisible = false;
          }else{
            this.add_loading = false;
            this.m_message(res.data.msg, "warning");
          }
        })
        .catch(err=>{})
        // Promise.all([
        //   this.$http.post(`${commonUrl.baseUrl}/manage/user/create`,param.data),
        //   this.$http.post(`${ commonUrl.baseUrl }/manage/role/roleAu`, param2)
        // ])
        // .then(res=>{
        //   let [res1, res2] = res;

        //   if(res1.data.code == '0000'){
        //     if(res2.data.code == '0000'){

        //       this.add_loading = false;
        //       // 成功提示
        //       this.m_message(res2.data.msg, "success");
        //       // 重新初始化数据列表
        //       this.getList_user(this.currentPage);
        //       // 关闭 弹框
        //       this.addUsers_dialogVisible = false;

        //     }else{
        //       this.add_loading = false;
        //       this.m_message(res2.data.msg, "warning");
        //     }

        //   }else{
        //     this.add_loading = false;
        //     this.m_message(res1.data.msg,'error')
        //   }

        // })
        // .catch(err=>{})

      }
    },

    // 设置账号(新增弹框)
    setUserName_add() {
      this.valid_addForm.user_name = this.valid_addForm.phone;
    },
    // 设置账号(修改弹框)
    setUserName_modi() {
      this.valid_modiForm.user_name = this.valid_modiForm.phone;
    },
    // 获取选中菜单节点
    getTreeNode() {
      console.log(this.$refs.add_tree.getCheckedKeys());
    },
    // 修改用户 操作
    modi_permisson(row) {

      // 打开 弹框
      this.modiUsers_dialogVisible = true;
      this.add_loading = true;
      // 先清空
      this.resetForm('valid_modiForm');
      this.valid_modiForm.rolenames = [];
      // 保存修改时需要id
      this.modi_id = row.id;
      this.valid_modiForm.sys_username = row.sys_username;
      this.valid_modiForm.sys_password = row.sys_password;
      this.valid_modiForm.roleid = row.roleid;
      this.valid_modiForm.sys_userid = row.sys_userid;
      this.valid_modiForm.sys_status = String(row.sys_status);
      // 获取角色列表
       let _param2 ={
        pageNum: 1,
        pageSize: 100,
        rolename:'',
      }
      this.$http.post(`${commonUrl.baseUrl}/manage/role/search`,_param2)
      .then(res2=>{
        if(res2.data.code === '0000'){
          let _result2 = res2.data.data.roleList;
          _result2.forEach(item=>{
            this.valid_modiForm.rolenames.push({
              id:item.roleid,
              rolename:item.rolename
            })
          })

          this.add_loading = false;
        }else{
          this.add_loading = false;
          this.m_message(res2.data.msg, 'error')
        }
      })
      .catch(err=>{})

      // this.modiUser_loading = true;
      // 获取所有角色名称：作下拉项；
      // let p_add = this.$http.post(`${commonUrl.baseUrl}/sysUser/addSysUser`, {
      //   data: {
      //     // 公参
      //     signInUserId: this.$store.getters.userId,
      //     signInRoleId: this.$store.getters.roleId
      //   }
      // });
      // // 获取当前数据：作数据回显
      // let p_modi = this.$http.post(
      //   `${commonUrl.baseUrl}/sysUser/updateSysUser`,
      //   {
      //     data: {
      //       // 公参
      //       signInUserId: this.$store.getters.userId,
      //       signInRoleId: this.$store.getters.roleId,
      //       // 私参
      //       id: row.id
      //     }
      //   }
      // );
      // this.modiUser_loading = true;
      // 同时成功后处理数据
      // Promise.all([p_add, p_modi])
      //   .then(res => {
      //     let [res1, res2] = res;
      //     if (res1.data.code == "0000" && res2.data.code == "0000") {
      //       //&1 p_add 接口赋值下拉项
      //       // 角色名称
      //       let arr1 = [];
      //       for (let item of res1.data.data.sysRoleList) {
      //         arr1.push({ id: item.id, role_name: item.role_describe });
      //       }
      //       this.valid_modiForm.rolename = arr1;
      //       //&2 p_modi 数据回显
      //       let result = res2.data.data;
      //       this.modiSys_dialogTitle = "修改" + result.sysUser.sys_username;
      //       this.valid_modiForm.sys_username = result.sysUser.sys_username;
      //       this.valid_modiForm.roleid = result.sysUserRole.rid;
      //       this.valid_modiForm.sex = result.sysUser.sex;
      //       this.valid_modiForm.phone = result.sysUser.phone;
      //       this.valid_modiForm.address = result.sysUser.address;
      //       this.valid_modiForm.birth_model = result.sysUser.birth;
      //       this.valid_modiForm.email = result.sysUser.email;
      //       this.valid_modiForm.user_name = result.sysUser.user_name;
      //       this.valid_modiForm.sys_password = result.sysUser.sys_password;
      //       // 结束加载
      //       this.modiUser_loading = false;
      //     } else {
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    // 修改用户 保存
    save_modiUser() {
      if (this.m_valid_addForm("valid_modiForm")) {
        // 保存到 后台
        let param = {
          data: {
            // 用户 角色 id
            signInUserId: this.$store.getters.userId,
            signInRoleId: this.$store.getters.roleId,
            // 用户参数
            sys_userid: this.valid_modiForm.sys_userid,
            sys_username: this.valid_modiForm.sys_username,
            // sys_password: this.valid_modiForm.sys_password,
            sys_status:this.valid_modiForm.sys_status,
            roleid:this.valid_modiForm.roleid,
            // sex: this.valid_modiForm.sex,
            // phone: this.valid_modiForm.phone,
            // address: this.valid_modiForm.address,
            // birth: this.valid_modiForm.birth_model,
            // email: this.valid_modiForm.email,
            // user_name: this.valid_modiForm.phone,

            // 角色参数
            // rid: this.valid_modiForm.roleid,
            // id: this.modi_id
          }
        };
        this.modiUser_loading = true;
        this.$http
          .post(`${commonUrl.baseUrl}/manage/user/edit`, param.data)
          .then(res => {
            if (res.data.code == "0000") {
              this.modiUser_loading = false;
              // 成功提示
              this.m_message(res.data.msg, "success");
              // 重新初始化数据列表
              this.getList_user(1);
              // 关闭 弹框
              this.modiUsers_dialogVisible = false;
            } else {
              this.modiUser_loading = false;
              this.m_message(res.data.msg, "warning");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 保存 修改权限
    modiData_userPermission() {
      // console.log(this.d_modi_userPermission);
      // // valid  右侧必选！  左侧必填！   判断 树是否选了
      // let treeIds = this.$refs.modiTree.getCheckedKeys();
      // if(treeIds.length == 0){
      //     this.m_message('请为该用户分配权限', 'warning')
      //     return ;
      // }

      // 保存到 后台
      let param = {
        data: {
          // 用户 角色 id
          signInUserId: this.$store.getters.userId,
          signInRoleId: this.$store.getters.roleId,
          //  权限  介绍 名称
          id: this.d_modi_userPermission.id,
          mid: treeIds.join(","),
          permission: this.d_modi_userPermission.permission,
          role_describe: this.d_modi_userPermission.role_describe,
          role_name: this.d_modi_userPermission.role_name
        }
      };
      this.modi_loading = true;
      this.$http
        .post(`${commonUrl.baseUrl}/sysRole/saveSysRole`, param)
        .then(res => {
          if (res.data.code == "0000") {
            this.modi_loading = false;
            // 成功提示
            this.m_message(res.data.msg, "success");
            // 重新初始化数据列表
            this.getList_user(this.currentPage);
            // 关闭 弹框
            this.permission_dialogVisible = false;
          } else {
            this.m_message(res.data.msg, "success");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      // 获取单前页数据列表
      this.getList_user(val);

      //console.log(`当前页: ${val}`);
    },
    // 新增 校验规则
    m_valid_addForm(formName) {
      let flag = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          flag = true;
          return true;
        } else {
          flag = false;
          return false;
        }
      });
      return flag;
    },
    // 提示信息 message:提示信息   type 提示类型
    m_message(message, type) {
      this.$message({
        message,
        type
      });
    },
    // 重置
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    }
  }
};
</script>

<style lang="scss">
.userPermission {
  .mar_b10 {
    margin-bottom: 5px;
  }
  .mar_t10 {
    margin-top: 10px;
  }
  padding: 5px; // 功能区域0
  .query_field {
    padding: 12px 8px;
    background-color: #fff;
  }

  .addUsers_dialog .el-dialog__body,
  .modiUsers_dialog .el-dialog__body {
    height: 50vh;
    overflow: auto;
  }
}
</style>
