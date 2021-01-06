<template>
  <div>

    <el-table :data="citylist">
      <el-table-column prop="ctid" label="编号">
      </el-table-column>
      <el-table-column prop="ctname" label="城市名称">
      </el-table-column>
      <el-table-column prop="pic" label="城市图片">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.pic"
            fit="fill"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="updateCity(scope.row.ctid)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteCity(scope.row.ctid)"  type="text" size="small">删除</el-button>
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

<script>
  import axios from 'axios'
  export default {
    name: "",
    data(){
      return{
       citylist:[],
        params:{
          size:10,
          page:1,
          pageSizes:[1,2,3,4]
        },
        total:100
      }
    },
    methods:{
      handleSizeChange(val) {
        this.params.size=val;
        this.findAll();
      },
      handleCurrentChange(val) {
        this.params.page=val;
        this.findAll();
      },
      findAll:function () {
        axios.get("api/city/findAll/"+this.params.page+"/"+this.params.size).then(res=>{
          if (res.data.code==200){
            this.citylist=res.data.data;
          }else if(res.data.code==300) {
            alert(res.data.message)
          }else{
            this.$router.push("/")
            alert("请先登录")
          }
        })
      },
      updateCity:function (ctid) {
        alert(ctid)
        this.$router.push({name:'insertOrUpdate',params:{ctid:ctid}})
      },
      deleteCity:function (ctid) {
        axios.post("api/city/deleteById",{ctid:ctid}).then(res=>{
          if (res.data.code==200){
            this.findAll();
          }else if(res.data.code==300){
            alert("你没有此权限请充钱!!!")
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
