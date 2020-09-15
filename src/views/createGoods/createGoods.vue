<template>
  <div class="main-wrapper">
    <!-- 文件上传 -->
    <div class="upload_wrap">
      <div class="upload_item">
        <el-button type="primary" @click="toggleUploadImg(1)">上传商品LOGO</el-button>
        <el-button type="primary" @click="toggleUploadImg(2)">上传商品banner图</el-button>
        <el-button type="primary" @click="toggleUploadImg(3)">上传商品详情图</el-button>
        <p>{{ imgTypeTxt }}</p>
        <el-upload action="" :auto-upload="true" accept="jpg,jpeg,png,PNG" list-type="picture-card" :file-list="files" :before-upload="beforeUpload"
          :http-request="handlePost" :on-preview="handlePreview" :on-change="changeImage" :on-remove="handleRemove" :on-exceed="extendLength">
          <i class="el-icon-plus"></i>
          <div slot="tip">最多可上传5张jpg/png图片，并且每张图片大小不超过500kb</div>
        </el-upload>
        <ul v-if="listImgs.length">
          <li v-for="(item,index) in listImgs" :key="index" class="img_item">
            <p>{{ item.imgTitle }}</p>
            <img style="width:50px;height:50px;" :src="item.previewUrl" alt="">
          </li>
        </ul>
      </div>
    </div>

    <!-- 商品添加 -->
    <div style="padding:30px 50px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="ruleForm.goods_name" placeholder="请选择商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="typeid">
          <el-select v-model="ruleForm.typeid" placeholder="请选择商品类别">
            <el-option v-for="item in goodsTypes" :label="item.type_name"  :key="item.typeid" :value="item.typeid"></el-option>            
          </el-select>
        </el-form-item>
        <el-form-item label="商品现价" prop="price">
          <el-input v-model="ruleForm.price" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="src_price">
          <el-input v-model="ruleForm.src_price" placeholder="请输入商品原价"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动单价" prop="active_price">
          <el-input v-model.number="ruleForm.active_price" placeholder="请输入活动单价"></el-input>
        </el-form-item> -->
        
        <!-- <el-form-item label="商品总销量" prop="total_count"> 
          <el-input v-model.number="ruleForm.total_count" placeholder="请输入商品总销量"></el-input>
        </el-form-item>
        <el-form-item label="商品当前销量" prop="current_count">
          <el-input v-model.number="ruleForm.current_count" placeholder="请输入商品当前销量"></el-input>
        </el-form-item> -->
        <el-form-item label="商品库存" prop="stock">
          <el-input v-model="ruleForm.stock" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品产地" prop="made_place">
          <el-input v-model="ruleForm.made_place" placeholder="请输入商品产地"></el-input>
        </el-form-item>
        <el-form-item label="商品供应商" prop="supplier">
          <el-input v-model="ruleForm.supplier" placeholder="请输入商品产地"></el-input>
        </el-form-item>
        <el-form-item label="商品权重" prop="goods_order">
          <el-input v-model.number="ruleForm.goods_order" placeholder="请输入商品权重"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="unit">
          <el-select v-model="ruleForm.unit" placeholder="请选择商品规格">
            <el-option label="kg" value="1"></el-option>
            <el-option label="个" value="2"></el-option>          
            <el-option label="盒" value="3"></el-option>          
            <el-option label="袋" value="4"></el-option>          
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="goods_desc">
          <el-input type="textarea" v-model="ruleForm.goods_desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import commonUrl from '../../utils/common';
import { formData ,getGoodsCatogory} from '../../utils/formData.js';
import {PositiveInt} from '../../utils/validate'
export default {
  data () {
    let validateZNum = (rule, value, callback) => {
      if (!PositiveInt(value)) {
        callback(new Error("请输入大于0的整数"));
      } else {
        callback();
      }
    };
    let validatePrice = (rule,value,callback)=>{
      let reg= /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if(!reg.test(value)){
        callback(new Error('最多两位小数'))
      }else{
        callback();
      }
    }
    return {
      listImgs: [],
      imgType: 1,
      imgTitle:'商品LOGO',
      imgTypeTxt: '请上传商品LOGO',
      
      goodsTypes:[],
      files: [],
      dialogImageUrl: '',
      ruleForm: {
        goods_name: '',
        goods_img:'',
        typeid: '',
        price:'',
        active_price:0,
        src_price:'',
        total_count:0,
        current_count:0,
        stock:'',
        made_place:'',
        supplier:'',
        recommend:1,
        goods_order:1, 
        unit:'',
        goods_desc: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        type_name: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        price:[
          {required:true,validator:validatePrice,trigger:'blur'},
          { type: "string", message: "请输入商品单价" }
        ],
        // active_price:[
        //   {required:true,validator:validatePrice,trigger:'blur'},
        //   { type: "number", message: "请输入活动单价" }
        // ],
        src_price:[
          {required:true,validator:validatePrice,trigger:'blur'},
          { type: "string", message: "请输入商品原价" }
        ],
        stock:[
          {required:true,validator:validateZNum,trigger:'blur'},
          { type: "string", message: "请输入库存" }
        ],
        made_place:[
           { required: true, message: '请输入商品产地', trigger: 'blur' },
        ],
        supplier:[
           { required: true, message: '请输入商品供应商', trigger: 'blur' },
        ],
        goods_order:[
          {required:true,validator:validateZNum,trigger:'blur'},
          { type: "number", message: "请输入商品权重" }
        ],
        unit: [
          { required: true, message: '请选择商品规格', trigger: 'change' }
        ],
        goods_desc: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ]
      },
    }
  },
  created(){
    this.getGoodsCatogory()
  },
  methods: {
    // 获取商品分类
    async getGoodsCatogory(){
        let param = {}
        this.$http.post(`${commonUrl.baseUrl}/manage/goods/getGoodsType`,param).then(res=>{
          this.goodsTypes = res.data.data.goodsType
          console.log(this.goodsTypes)
        }).catch(err=>{})
    },
    // 创建商品
    submitForm (formName) {
      console.log(this.$refs.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
         
          if(!this.ruleForm.goods_img)return this.$message.error('请上商品logo')
         
          let { goods_name,goods_img,typeid,price,active_price,src_price,total_count,current_count,stock,made_place,supplier,recommend,goods_order,unit,goods_desc} = this.ruleForm
          price*=100
          active_price*=100
          src_price*=100
          let goodsInfo = {
            goods_name,goods_img,typeid,price,active_price,src_price,total_count,current_count,stock,made_place,supplier,recommend,goods_order,unit,goods_desc
          }
          let param ={
            goodsFiles:this.listImgs,
            goodsInfo
          }
          
          this.$http.post(`${commonUrl.baseUrl}/manage/goods/createGoods`,param).then(res=>{
            res = res.data
            if(res.code==='0000') return this.$message.success(res.msg)
            this.$message.error(res.msg)
          }).catch(err=>{

          })
        } else {
          
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },

    handlePost (content) {
      console.log(arguments)
      var uploadData = new FormData()
      
      let file = content.file
      uploadData.append('file',file)
      
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      formData(uploadData).then(res => {       
        res = res.data
        if (res.code === '0000') {
          // 成功之后处理数据          
          this.listImgs.push({ 
            fileid: res.data.fileid,
            file_url:res.data.fileUrl,
            goods_file_type:this.imgType,
            imgTitle:this.imgTitle,
            previewUrl:res.data.previewUrl,
            uid:file.uid
          })
          if(this.imgType == 1) this.ruleForm.goods_img = res.data.fileUrl
          console.log(this.ruleForm.goods_img)
          this.$message.success(res.msg)
          loading.close()
        }
      })

    },
    // 切换上传的图片
    toggleUploadImg (type) {
      switch (type) {
        case 1:
          this.imgTypeTxt = '请上传商品LOGO';
          this.imgTitle = 'LOGO'
          this.imgType = type
          break;
        case 2:
          this.imgTypeTxt = '请上传商品banner图';
          this.imgTitle = 'banner图'
          this.imgType = type
          break;
        case 3:
          this.imgTypeTxt = '请上传商品详情图';
          this.imgTitle = '详情图'
          this.imgType = type
          break;
      }
    },
    extendLength () {
    },
    changeImage (file, fileList) {

     
      this.files = fileList
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
    },
    handleRemove (file, fileList) {
      
      this.listImgs = this.listImgs.filter(item=> item.uid != file.uid)
    },
    beforeUpload (file) {
      if (this.files.length > 5) {
        this.$message.error('最多5张')
      }

      const isLt500K = file.size / 1024 < 500
      if (!isLt500K) {
        this.$message.error('图片不超过500K')
      }
      return isLt500K && this.files.length <= 5
    }

  }
}
</script>

<style lang="scss" scoped>
.upload_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-wrapper >>> .el-input__inner {
  height: 32px;
  line-height: 32px;
}
.img_item{
  float:left;
  margin-right:6px;
  margin-top:8px;
  list-style:none;  
}
.el-form-item{
  margin-bottom:22px;
}
.main-wrapper {
  width: 100%;
  overflow-x: auto;
  background: #fff;

  .bg_img {
    width: 284px;
    height: 216px;
  }
  .img-sty {
    margin-top: 40px;
    width: 40%;
    display: block;
  }
  .img-input-wrap {
    position: absolute;
    top: 112px;
    left: 55%;
    width: 50%;
    height: auto;
    .img-input-box {
      overflow: hidden;
      z-index: 0;
      background-color: #fff;
      border-radius: 6px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-top: 10px;
      height: 92px;
      line-height: 92px;
      label {
        margin-right: 20px;
        color: #606266;
      }
      input {
        height: 30px;
        line-height: 30px;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        padding-left: 4px;
        outline: none;
      }
    }
  }
}
</style>