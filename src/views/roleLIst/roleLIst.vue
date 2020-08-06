
<template>
<!-- 权限管理页面 -->
<div class="userPermission">
  <!--module1 功能区域 -->
  <div class="query_fields pad_b_no handle_timerange">
    <el-form :inline="true" :model="queryForm" ref="queryForm" size="mini" class="demo-form-inline">
      <el-form-item label="角色名称" prop="rolename" label-width="68px">
        <el-input v-model="queryForm.rolename" placeholder="请输入角色名称" class="wid_140"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size='mini' @click="resetForm('queryForm')">重置</el-button>

        <el-button type="primary" size='mini' @click="refreshData">刷新</el-button>
        <el-button type="primary" size='mini' @click="queryData">查询</el-button>
        <el-button type="success" size='mini' @click="handle_addUserPermisson">新增角色</el-button>
      </el-form-item>
    </el-form>

  </div>

  <!--module2 表格 -->
  <el-table :data="tableData" v-loading="tableLoading" border stripe style="width: 100%">

    <el-table-column prop="rolename" label="角色名" width=""></el-table-column>
    <el-table-column prop="role" label="角色" width=""></el-table-column>
    <el-table-column prop="remarks" label="角色描述" width=""></el-table-column>
    <!-- <el-table-column prop="" label="权限" width="">
      <template slot-scope="scope">
        <span v-if="scope.row.permission.indexOf('view')>-1">查看</span>
        <span v-if="scope.row.permission.indexOf('edit')>-1">编辑</span>
      </template>
    </el-table-column> -->

    <el-table-column prop="" label="操作" width="">
      <template slot-scope="scope">
          <el-button @click="modi_permisson(scope.row)" type="text" size="small">调整权限</el-button>
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
      :total="pageTotal">
    </el-pagination>
  </div>

  <!--module4 调整权限 dialog1 -->
  <el-dialog
    :title="d_modi_userPermission.modi_title"
    :visible.sync="permission_dialogVisible"
    top="10vh"
    width="40%"
    center
    class="modiUsers_dialog dialog_tip modiPermission"
    :close-on-click-modal="false"
    v-loading="modi_loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
    <!--修改 body -->
    <div>
      <el-row>
        <!-- 左侧表单 -->
        <el-col :span="11">
          <div class="grid-content bg-purple-dark pad_t2">
            <el-form :model="valid_modiForm" :rules="modi_rules" ref="valid_modiForm" label-width="100px" class="demo-ruleForm valid_form">
              <el-form-item label="角色名" prop="rolename">
                <el-input :disabled="true" v-model="valid_modiForm.rolename"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-input v-model="valid_modiForm.role"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="remarks">
                <el-input  type="textarea" v-model="valid_modiForm.remarks"></el-input>
              </el-form-item>
              <!-- <el-form-item label="角色权限" prop="permission">
                <el-select v-model="valid_modiForm.permission" multiple="" placeholder="角色权限">
                  <el-option
                    v-for="(item, index) in valid_modiForm.permissions"
                    :key="index"
                    :label="item.txt"
                    :value="item.id"
                    ></el-option>
                </el-select>

              </el-form-item> -->
            </el-form>
          </div>
        </el-col>
        <!-- 右侧 tree -->
        <el-col :span="13">
          <div class="grid-content bg-purple-dark ">
            <!-- 修改 树 -->
            <el-tree
              :data="modiDialog_tree"
              show-checkbox
              node-key="id"
              ref="modiTree"
              :default-expanded-keys = "modi_default_ids"
              :default-checked-keys= "modi_default_ids"
              highlight-current
              accordion
              >
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--dialog footer  -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="permission_dialogVisible = false" size='mini'>取 消</el-button>
      <el-button type="primary" @click="modiData_userPermission" size='mini'>确 定</el-button>
    </span>
  </el-dialog>

  <!--module5 新增 dialog2 -->
  <el-dialog
    title="新增角色"
    :visible.sync="addUsers_dialogVisible"
    width="30%"
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
      <el-row>
        <!-- 左侧表单 -->
        <el-col :span="24">
          <div class="grid-content bg-purple-dark pad_t2">
            <el-form :model="valid_addForm" :rules="add_rules" ref="valid_addForm" label-width="100px" class="valid_form demo-ruleForm">
              <el-form-item label="角色名" prop="rolename">
                <el-input v-model="valid_addForm.rolename" placeholder="请输入角色名"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-input v-model="valid_addForm.role" placeholder="请输入角色"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="remarks">
                <el-input type="textarea" v-model="valid_addForm.remarks" placeholder="请输入角色描述"></el-input>
              </el-form-item>
              <!-- <el-form-item label="角色权限" prop="permission">
                <el-select v-model="valid_addForm.permission" multiple placeholder="选择角色权限">
                  <el-option
                    v-for="(item, index) in valid_addForm.permissions"
                    :key="index"
                    :label="item.txt"
                    :value="item.id"
                    ></el-option>
                </el-select>

              </el-form-item> -->
            </el-form>
          </div>
        </el-col>
        <!-- 右侧 树 -->
        <!-- <el-col :span="12">
          <div class="grid-content bg-purple-dark pad_l34" >

            <el-tree
              :data="addDialog_tree"
              show-checkbox
              node-key="id"
              ref="add_tree"
              highlight-current
              accordion
              >
            </el-tree>
          </div>
        </el-col> -->
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="addUsers_dialogVisible = false" size='mini'>取 消</el-button>
      <el-button type="primary" @click="save_addSysRole" size='mini'>确 定</el-button>
    </span>
  </el-dialog>



  </div>
</template>

<script>
import commonUrl from '../../utils/common';
import gpCommonJs from '../../utils/functions'
export default {
  name: 'roleLIst',
  data() {
    return {
      //M1 主列表
      tableData: [],
      tableLoading: false,
      //M2 分页
      pageTotal: 1,
      currentPage: 1,
      //M3 俩弹框
      permission_dialogVisible: false,
      addUsers_dialogVisible: false,
      // 查询
      queryForm:{
        rolename:'',
      },
      //M4 添加用户的form
      form: {
        // 角色名称
        name: '',
        // 角色描述
        txt: '',
        // 角色权限
        permission: ''
      },
      formLabelWidth: '120px',
      // 新增 树的数据
      addDialog_tree: [],
      // 修改 树
      modiDialog_tree: [],
      // 默认展开 和 默认选中项
      modi_default_ids: [],
      // 新增 弹框规则
      valid_addForm: {
        rolename: '',
        role:'',
        remarks: '',

        permission:[],
        // 角色权限
        permissions:[
          {
            id:'edit',
            txt:'编辑'
          },
          {
            id:'view',
            txt:'查看'
          }
        ],
      },
      add_rules: {
        rolename: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请输入角色', trigger: 'blur' },
        ],
        remarks: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
        // permission: [
        //   { required: true, message: '请选择角色权限', trigger: 'change' },
        // ],
      },
      // 修改权限
      valid_modiForm:{
        rolename: '',
        role: '',
        remarks:'',
        roleid:'',
        permission:[],
        permissions:[
          {
            id:'edit',
            txt:'编辑'
          },
          {
            id:'view',
            txt:'查看'
          }
        ],
      },
      modi_rules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        role: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
        remarks: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ],
        // permission: [
        //   { required: true, message: '请选择角色权限', trigger: 'change' },
        // ],

      },
      // 待修改的 用户信息
      d_modi_userPermission: {
        modi_title: '',
        id: '',
        permission:'',

        rolename: '',
        role:'',
        roleid:'',
        remarks: '',

      },
      modi_loading:false,
      add_loading: false,
    }
  },
  created() {
    // 初始化数据列表
    this.getList_userPermission(1);

  },
  methods: {
    // 查询按钮
    queryData(){
      this.getList_userPermission(1);
      this.currentPage = 1
    },

    // 刷新
    refreshData(){
      // 初始化数据列表
      this.getList_userPermission(this.currentPage);
      // 回到第一页数据
      // this.currentPage = 1
    },
    // 主列表（获取所有用户权限管理列表)
    async getList_userPermission(pageNum) {
      this.tableLoading = true
      // 参数
      let param = {

          signInUserId: this.$store.getters.userId,
          signInRoleId: this.$store.getters.roleId,
          pageNum: pageNum,
          pageSize: 10,
          rolename:this.queryForm.rolename,

      }
      const res = await this.$http.post(`${commonUrl.baseUrl}/manage/role/search`, param)
      if (res.data.code == '0000') {
        // console.log(res)
        let result = res.data.data.roleList
        // 隐藏管理员
        // for(let i=0;i<result.length;i++){
        //   if(result[i].id == 1){
        //     result.splice(i,1)
        //   }
        // }
        // console.log(result)
        this.tableData = result
        // 分页 总数
        this.pageTotal = res.data.data.data_total;
        this.tableLoading = false
      }else{
        this.m_message(res.data.msg,'error')
      }
    },
    // 新增按钮 (点击《新增用户权限》)
    async handle_addUserPermisson() {
      // 弹框
      this.addUsers_dialogVisible = true
      // 清空 值
      this.resetForm('valid_addForm')
      // 清空选中的权限
      // if(this.$refs.add_tree){
      //   this.$refs.add_tree.setCheckedKeys([]);
      // }
      //this.getData_onePermission(this.add_loading);

    },
    // 为新增获取某个 ：菜单权限
    async getData_onePermission(typeLoading) {
      let param = {
        data: {
          signInUserId: this.$store.getters.userId,
          roleid: this.$store.getters.roleId,
        }
      }
      typeLoading = true;
      const res = await this.$http.post(`${commonUrl.baseUrl}/manage/role/roleAuthority`, param)
      if (res.data.code == '0000') {
        // console.log(res)
        // debugger
        // 处理数据
        // let menuList = gpCommonJs.designData_tree(res.data.data.sysMenuList);
        // this.addDialog_tree = menuList
        // this.modiDialog_tree = menuList
        typeLoading = false;
      }
    },

    // 新增=保存按钮  (点击弹框中的《确定》)
    save_addSysRole(){
      // valid  右侧必选！  左侧必填！
      // 全选
      // let  treeIds = this.$refs.add_tree.getCheckedKeys()

      // // 半选
      // let  halfIds = this.$refs.add_tree.getHalfCheckedKeys()
      // if(halfIds.length>0){
      //   treeIds = treeIds.concat(halfIds)
      // }

      //   //判断 树是否选了
      // if(treeIds.length == 0){
      //   this.m_message('请为该用户分配权限', 'warning')
      //   return ;
      // }
      if(this.m_valid_addForm('valid_addForm')){

        // 保存到 后台
        let param = {
          data:{
            // 用户 角色 id
            // signInUserId: this.$store.getters.userId,
            // signInRoleId: this.$store.getters.roleId,
            //  权限  介绍 名称
            // mid:treeIds.join(','),
            // permission:this.valid_addForm.permission.join(','),
            remarks:this.valid_addForm.remarks,
            rolename:this.valid_addForm.rolename,
            role:this.valid_addForm.role
          }
        }
        let param1 = {
           remarks:this.valid_addForm.remarks,
            rolename:this.valid_addForm.rolename,
            role:this.valid_addForm.role
        }
        this.add_loading = true;
        this.$http.post(`${ commonUrl.baseUrl }/manage/role/create`, param1).then( res =>{
          if(res.data.code == '0000'){
            // 成功提示
            this.add_loading = false;
            this.m_message(res.data.msg, 'success')
            // 重新初始化数据列表
            this.getList_userPermission( this.currentPage );
            // 关闭 弹框
            this.addUsers_dialogVisible = false
          }else{
            this.add_loading = false;
            this.m_message(res.data.msg, 'success')
          }
        }).catch( err => {
          console.log(err)
        })

      }


    },
    // 获取选中菜单节点
    getTreeNode() {
      console.log(this.$refs.add_tree.getCheckedKeys());
    },
    // 调整权限 操作
    modi_permisson(row) {

      // 展开弹框
      this.permission_dialogVisible = true
      // 存储当前行数据
      // this.d_modi_userPermission.permission = row.permission;
      this.d_modi_userPermission.rolename = row.rolename;
      this.d_modi_userPermission.remarks = row.remarks;
      this.d_modi_userPermission.roleid = row.roleid;
      this.d_modi_userPermission.role = row.role;

      this.valid_modiForm.rolename = row.rolename;
      this.valid_modiForm.remarks = row.remarks;
      this.valid_modiForm.roleid = row.roleid;
      this.valid_modiForm.role = row.role;
      // 先清空  选中
      this.modi_default_ids = []
      this.d_modi_userPermission.modi_title ='调整'+ row.rolename + '的权限'
      // 获取当前待修改角色的权限菜单  和 总的角色菜单
      let _param_cur = { roleid: row.roleid };
      Promise.all(
        [
          this.$http.post(`${ commonUrl.baseUrl }/manage/role/authority`),
          this.$http.post(`${ commonUrl.baseUrl }/manage/role/roleAuthority`,_param_cur)
        ],
      ).then(res=>{
        let [res_all, res_curr] = res;
        if(res_all.data.code === '0000' && res_curr.data.code === '0000'){
          let res_all_data = res_all.data.data.authorities,
              ori_plat_data = res_all.data.data.authoritiesNoOrder,
              res_curr_data = res_curr.data.data.roleAuthorities;

          // 1赋值总体树
          // this.modifyTreeData()
          // =====开始处理
          let _menuList = gpCommonJs.designData_tree(res_all_data);
          this.modiDialog_tree = _menuList
          // 用来存返回的id组成的数组
          let ids2_arr = []
          // 2赋值当前待修改树
          this.modifyTreeData(res_curr_data,ids2_arr,_menuList,ori_plat_data);

          // 修复数据：去除那些半选中状态的id
          this.modi_default_ids = ids2_arr;
          if(this.$refs.modiTree){
            this.$refs.modiTree.setCheckedKeys(this.modi_default_ids);
          }

          // 加载完成
          this.modi_loading = false
        }

      }).catch(err=>{})


    },
    /**
     * 处理后台的tree数据
     * @params:dataTree是已勾选数据(扁平化)；
     *         storeArr是存储数据的数组;
     *  */
    modifyTreeData(dataTree,storeArr){
      if(dataTree.length > 0){
        for(var i = 0; i<dataTree.length;i++){
          var currentItem = dataTree[i];
          // 判断当前节点是否为菜单
          if(currentItem.ismenu == '0'){
            storeArr.push(Number(currentItem.authorityid))
          }
        }
      }

    },

    // 保存 修改权限
    modiData_userPermission(){

      let  treeIds = this.$refs.modiTree.getCheckedKeys()
      // 半选
      let  halfIds = this.$refs.modiTree.getHalfCheckedKeys()
      if(halfIds.length>0){
        treeIds = treeIds.concat(halfIds)
      }
      // 必须分配权限
      if(treeIds.length == 0){
          this.m_message('请为该用户分配权限', 'warning')
          return ;
      }
      console.log(`所有id:${treeIds}`)
      // 处理ids为后台所需数据格式
      let _lists = treeIds.map(val=>{
        return { "authorityid":val,"roleid": this.valid_modiForm.roleid }
      })
      console.log(`所有id树结构:${_lists}`)
      // 校验
      if(this.m_valid_addForm('valid_modiForm')){
        // 发送两个请求 调整权限  +  角色信息
        let param1 = {
          rolename:this.valid_modiForm.rolename,
          role:this.valid_modiForm.role,
          remarks:this.valid_modiForm.remarks,
          roleid:this.valid_modiForm.roleid,
        }
        let param2 = {
          au:_lists
        }
        this.modi_loading = true;
        Promise.all([
          this.$http.post(`${ commonUrl.baseUrl }/manage/role/edit`,param1),
          this.$http.post(`${ commonUrl.baseUrl }/manage/role/roleAu`, param2)
        ]).then(res=>{
          let [res1, res2] = res;
          if(res1.data.code == '0000'){
            if(res2.data.code == '0000'){
              this.modi_loading = false;
              this.permission_dialogVisible = false
              this.m_message('调整权限成功', 'success')
              this.getList_userPermission( this.currentPage );
            }
          }else{
            this.modi_loading = false;
            this.m_message(res1.data.msg, 'error')
          }
          // if(res1.data.code == '0000' && res2.data.code == '0000'){
          //   this.modi_loading = false;
          //   this.permission_dialogVisible = false
          //   this.m_message('权限调整成功', 'success')
          //   this.getList_userPermission( this.currentPage );
          // }else{
          //   this.modi_loading = false;
          //   this.m_message(res.data.msg, 'error')
          // }
        }).catch(err=>{

        })
        // 保存到 后台
        // let param = {
        //   // 用户 角色 id
        //   signInUserId: this.$store.getters.userId,
        //   signInRoleId: this.$store.getters.roleId,
        //   //  权限  介绍 名称
        //   // id:this.d_modi_userPermission.id,
        //   // mid:treeIds.join(','),
        //   // permission:this.valid_modiForm.permission.join(','),
        //   // remarks:this.valid_modiForm.remarks,
        //   // rolename:this.valid_modiForm.name,
        //   au:[]
        // }

        // this.$http.post(`${ commonUrl.baseUrl }/manage/role/roleAu`, param).then( res =>{
        //   if(res.data.code == '0000'){
        //     this.modi_loading = false;
        //     // 成功提示
        //     this.m_message(res.data.msg, 'success')
        //     // 重新初始化数据列表
        //     this.getList_userPermission( this.currentPage );
        //     // 关闭 弹框
        //     this.permission_dialogVisible = false
        //   }else{
        //     this.m_message(res.data.msg, 'success')
        //   }
        // }).catch( err => {
        //   console.log(err)
        // })
      }


    },
    handleCurrentChange(val) {
      this.currentPage = val
      // 获取单前页数据列表
      this.getList_userPermission(val);
      //console.log(`当前页: ${val}`);
    },
    // 新增 校验规则
    m_valid_addForm(formName) {
      let  flag  = false ;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          flag = true;
          return true
        } else {
          flag = false;
          return false;
        }
      });
      return flag;
    },
    // 提示信息 message:提示信息   type 提示类型
    m_message(message,type){
      this.$message({
        message,
        type
      })
    },
    // 重置
    resetForm(formName) {
      if(this.$refs[formName]){
        this.$refs[formName].resetFields();
      }
    },
    // 递归取 半选 的数据

    diguiquchu(datas, arr, v, i, needdelarr) {
      //递归找出半选中的数据
      arr.map((item, index) => {
        if (item.id == v && item.child) {
          // datas.splice(i, 1);//因为每次截取会改变原数组，所以不能这样
          needdelarr.push(v);
          this.diguiquchu(datas, item.child, v, i, needdelarr);
        } else if (item.id != v && item.child) {
          this.diguiquchu(datas, item.child, v, i, needdelarr);
        }
      });
    }



  },

}
</script>

<style lang="scss">
.userPermission {
  .mar_b10 {
    margin-bottom: 5px;
  }
  .mar_t10 {
    margin-top: 10px;
  }
  padding:5px; // 功能区域0
  .query_field {
    padding: 12px 8px;
    background-color: #fff;
  }

  .addUsers_dialog .el-dialog__body,
  .modiUsers_dialog .el-dialog__body{height: 50vh;overflow: auto;}

  .modiPermission .el-dialog__body{
    height: 60vh;overflow: auto;
  }
}
</style>
