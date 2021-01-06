<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu  @open="handleOpen"
                  @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>城市管理</template>
            <el-submenu index="finds">
              <template slot="title" index="1-1">查看城市</template>

            </el-submenu>
            <el-submenu index="insert">
              <template slot="title" index="1-2">添加城市</template>

            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>用户管理</template>
            <el-submenu index="find">
              <template slot="title" index="2-1">查看用户</template>

            </el-submenu>
            <el-submenu index="inserts">
              <template slot="title" index="2-2">添加用户</template>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "",
    data(){
      return{
        booklist:[]
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(keyPath);
        if (keyPath[1]=="finds"){
          this.$router.push("/citylist")
        }
        if (keyPath[1]=="insert"){
          this.$router.push("/insertOrUpdate")
        }
        if (keyPath[1]=="find"){
          this.$router.push("/userlist")
        }
        if (keyPath[1]=="inserts"){
          this.$router.push("/insertOrUpdatePerson")
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }

    }
  }
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
