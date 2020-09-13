<template>
  <div class="main-wrapper">
    <!-- 文件上传 -->
    <div class="upload_wrap">
      <div class="upload_item">
        <el-button type="primary" @click="toggleUploadImg(1)">上传商品缩略图</el-button>
        <el-button type="primary" @click="toggleUploadImg(2)">上传商品banner图</el-button>
        <el-button type="primary" @click="toggleUploadImg(3)">上传商品详情图</el-button>
        <p>{{ imgTypeTxt }}</p>
        <el-upload action="" :auto-upload="true" accept="jpg,jpeg,png,PNG" list-type="picture-card" :file-list="files" :before-upload="beforeUpload"
          :http-request="handlePost" :on-preview="handlePreview" :on-change="changeImage" :on-remove="handleRemove" :on-exceed="extendLength">
          <i class="el-icon-plus"></i>
          <div slot="tip">最多可上传5张jpg/png图片，并且每张图片大小不超过500kb</div>
        </el-upload>
        <ul v-if="listImgs.length">
          <li v-for="(item,index) in listImgs" :key="index">
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
          <el-input v-model="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="type_name">
          <el-select v-model="ruleForm.type_name" placeholder="请选择商品类别">
            <el-option v-for="item in goodsTypes" :label="item.type_name"  :key="item.typeid" :value="item.typeid">{{ item.type_name }}</el-option>            
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格" prop="unit">
          <el-select v-model="ruleForm.unit" placeholder="请选择商品规格">
            <el-option label="kg" value="1"></el-option>
            <el-option label="个" value="2"></el-option>          
            <el-option label="盒" value="3"></el-option>          
            <el-option label="袋" value="4"></el-option>          
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" goods_name="type"></el-checkbox>
            <el-checkbox label="地推活动" goods_name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" goods_name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" goods_name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
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
export default {
  data () {
    return {
      listImgs: [],
      imgType: 1,
      imgTitle:'缩略图',
      imgTypeTxt: '请上传商品缩略图',

      goodsTypes:[],
      files: [],
      dialogImageUrl: '',
      ruleForm: {
        goods_name: '',
        typeid: '',
        type_name:'',
        unit:'',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        goods_desc: ''
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type_name: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
         unit: [
          { required: true, message: '请选择商品规格', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        goods_desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
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
        }).catch(err=>{})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
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

      for (var item of this.files) {
        if (!item.raw && item.url.indexOf('blob') === -1) {
        } else {
          uploadData.append('file', item.raw)
        }
      }
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
            previewUrl:res.data.previewUrl
          })
          console.log( this.listImgs)
          this.$message.success(res.msg)
          loading.close()
        }
      })

    },
    // 切换上传的图片
    toggleUploadImg (type) {
      
      switch (type) {
        case 1:
          this.imgTypeTxt = '请上传商品缩略图';
          this.imgTitle = '缩略图'
          break;
        case 2:
          this.imgTypeTxt = '请上传商品banner图';
          this.imgTitle = 'banner图'
          break;
        case 3:
          this.imgTypeTxt = '请上传商品详情图';
          this.imgTitle = '详情图'
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

      this.files = fileList
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