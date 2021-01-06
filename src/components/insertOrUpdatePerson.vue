<template>
    <div>
      <el-form :model="person" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="ctname">
          <el-input  v-model="person.pname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="psex">
          <el-input  v-model="person.psex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker type="date" placeholder="选择日期" v-model="person.birthday" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="入职日期" prop="worktime">
          <el-date-picker type="date" placeholder="选择日期" v-model="person.worktime" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="学历" prop="status">
          <el-input  v-model="person.status" autocomplete="off"></el-input>
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
      data() {
        return {
          person: {
            pname: '',
            pname:'',
            psex:'',
            birthday:'',
            worktime:'',
            status:''
          },
          rules: {
            ctname: [
              // {required: true, message: '请输入书籍名称', trigger: 'blur'},
              // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
            ],
          },
        }
      },
      methods:{
        insertOrUpdate:function (formName) {
          console.log(formName)
          this.$refs[formName].validate((valid) => {
            console.log(valid);
            if (valid) {
              alert(11)
              axios.post("api/person/insertCity",this.person).then(res=>{
                if (res.data.code==200){
                  this.$router.push("/userlist")
                }else if(res.data.code==300){
                  alert("快去找苗老师充钱")
                  this.$router.push("/userlist")
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
          // alert(111)

        },

        findById:function (pid) {
          axios.post("api/person/findById",{pid:pid}).then(res=>{
            if (res.data.code==200){
              this.person=res.data.data;
            }else if(res.data.code==300){
              this.$router.push("/userlist")
              alert(res.data.message)

            }
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      },
      mounted(){
        var pid = this.$route.params.pid;
        if (pid!=null){
          this.findById(pid)
        }

      }
    }
</script>

<style scoped>

</style>
