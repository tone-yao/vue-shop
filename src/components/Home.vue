<template>
  <el-container>
    <el-header>
      <div id="home-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="menushow?'65px':'200px'">
        <div
          style="color:#fff; text-align:center;
        cursor: pointer;user-select: none;font-size: 12px;height:25px;line-height:25px;"
          @click="menushow=!menushow"
        >|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="menushow"
          :collapse-transition="false"
          :style="menushow?'width:65px;':'width:200px'"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu :index="item.id+''" v-for="(item,k) in menuList" :key="item.id">
            <template slot="title">
              <i :class="'iconfont'+' '+'icon-'+ iconlist[k]"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item :index="'/'+item2.path" v-for="item2 in item.children" :key="item2.id">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      // 左侧权限数据
      menuList: [],
      menushow: false,
      iconlist: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    // 退出系统
    logout() {
      // 确认
      // 清除token
      // 回到login页面
      this.$confirm('确认要退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出系统成功!'
          })
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 获取左侧列表数据
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    width: 100%;
    height: 60px;
    background-color: #373d41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    padding-right: 20px;
    #home-box {
      display: flex;
      align-items: center;
      user-select: none;
      font-size: 22px;
      color: #fff;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
