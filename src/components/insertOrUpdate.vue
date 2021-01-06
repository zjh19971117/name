<template>

  <div>
    <el-form :model="city" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-upload
        class="avatar-uploader"
        action="api/city/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imgurl" :src="city.pic" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <!--<el-image-->
        <!--style="width: 100px; height: 100px"-->
        <!--:src="city.pic"-->
        <!--fit="fill" v-if="city.pic!=null && city.pic!=''"></el-image>-->
      <el-form-item label="城市名称" prop="ctname">
        <el-input  v-model="city.ctname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insertOrUpdate('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
    export default {
      name: "",
      data() {
        return {
          city: {
            ctname: '',
            pic:''
          },
          imgurl:'',
          rules: {
            ctname: [
              // {required: true, message: '请输入书籍名称', trigger: 'blur'},
              // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],

          }
        }
      },
      methods:{
        insertOrUpdate:function (formName) {
          console.log(formName)
          this.$refs[formName].validate((valid) => {
            console.log(valid);
            if (valid) {
              alert(11)
              axios.post("api/city/insertCity",this.city).then(res=>{
                console.log()
                if (res.data.code==200){
                  alert(456)
                  this.$router.push("/citylist")
                }else if(res.data.code==300){
                  alert("无权限快去充钱")
                  this.$router.push("/citylist")
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
          // alert(111)

        },

        findById:function (ctid) {
          axios.post("api/city/findById",{ctid:ctid}).then(res=>{
            if (res.data.code==200){
              this.city=res.data.data;
            }else if(res.data.code==300){
              this.$router.push("/citylist")
              alert(res.data.message)

            }
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
          //res代表上传完成后的返回值
          console.log(file)
          this.city.pic=res.data;
          this.imgurl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      },
      mounted(){
        var ctid = this.$route.params.ctid;
        if (ctid!=null){
          this.findById(ctid)
        }

      }
    }

</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
