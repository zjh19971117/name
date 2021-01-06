<template>
    <div>
      <el-table :data="personlist">
        <el-table-column
          prop="pname"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="psex"
          label="性别"
         >
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
        >
        </el-table-column>
        <el-table-column
          prop="worktime"
          label="入职时间"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="学历"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
         >
          <template slot-scope="scope">
            <el-button @click="updatePerson(scope.row.pid)" type="text" size="small">编辑</el-button>
            <el-button @click="deletePerson(scope.row.pid)"  type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="params.pageSizes"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script >
  import axios from 'axios'
export default {
  data() {
    return {
      personlist:[],
      params:{
        size:10,
        page:1,
        pageSizes:[1,2,3,4]
      },
      total:100
    }

  },
  methods: {

    handleSizeChange(val) {
      this.params.size=val;
      this.findAll();
    },
    handleCurrentChange(val) {
      this.params.page=val;
      this.findAll();
    },
    findAll:function () {
      axios.get("api/person/findAll/"+this.params.page+"/"+this.params.size).then(res=>{
        if (res.data.code==200){
          this.personlist=res.data.data;
        }else if(res.data.code==300){
        }else{
          alert("请先去登录")
          this.$router.push("/")
        }
      })
    },
    updatePerson:function (pid) {
      alert(pid)
      this.$router.push({name:'insertOrUpdatePerson',params:{pid:pid}})
    },
    deletePerson:function (pid) {
      axios.post("api/person/deleteById",{pid:pid}).then(res=>{
        if (res.data.code==200){
          this.findAll();
        }else if(res.data.code==300){
          alert("你没有此权限请找苗老师充钱!!!")
        }
      })
    }
  },
  mounted(){
    this.findAll();
  }
}
</script>

<style scoped>

</style>
