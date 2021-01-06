<template>
  <div style="background-image: url('http://s02.ourgame.com.cn/g1/M00/24/4A/wKgCy1kOiT_wBNP7AAQTX1lVcRk137.jpg');width: 1511px; height: 750px;">
    <div style="height: 300px; width: 400px;position: absolute;top: 250px;left: 600px;">
      <el-form :model="user" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div style="height: 20px"><b style="font-size: large; margin-left: 32px;">管理员登录</b></div>
        <div style="height: 30px"></div>
        <el-form-item label="用户名" prop="adminname" style="width: 200px;">
          <el-input type="text" v-model="user.adminname" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminpassword"style="width: 200px">
          <el-input type="password" v-model="user.adminpassword" autocomplete="off" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="margin-left: -66px">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>

  import axios from 'axios';
  export default {
    data() {
      return {
        user: {
          adminname: '',
          adminpassword: '',
        },
      };
    },
    methods: {
      login:function(){
        axios.post("api/admin/login",this.user).then(res=>{
          if(res.data.code==200){
            alert("登陆成功")
            this.$router.push("/index")
          }else {
            alert("登录失败")
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
