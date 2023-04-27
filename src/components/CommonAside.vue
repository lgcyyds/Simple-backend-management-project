<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen()" @close="handleClose()"
    :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <h3>{{!isCollapse?`通用后台管理系统`:`后台`}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group  v-for="subitem in item.children" :key="subitem.name">
        <el-menu-item @click="clickMenu(subitem)" :index="subitem.name">{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>


<script>
import Cookie from 'js-cookie'
export default {
  name: 'CommonAside',
  data() {
    return {
      // menuData: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 's-goods',
      //     url: 'MallManage/MallManage'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: 'UserManage/UserManage'
      //   },
      //   {
      //     label: '其他',
      //     icon: 'coin',
      //     children: [
      //       {
      //         path: '/page1',
      //         name: 'page1',
      //         label: '页面1',
      //         icon: 'setting',
      //         url: 'Other/PageOne'
      //       },
      //       {
      //         path: '/page2',
      //         name: 'page2',
      //         label: '页面2',
      //         icon: 'setting',
      //         url: 'Other/PageTwo'
      //       }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      //当页面的路由和跳转的路由不一致的时候才允许跳转
      if(this.$route.path!==item.path&&!(this.$route.path==='/home'&&(item.path==='/'))){
      this.$router.push(item.path);
      }
      //点击将所点的按钮信息传到vuex
      this.$store.commit('selectMenu' , item);
    },

  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse;//获取Vuex中的isCollapse数据
    },
    menuData(){
      return JSON.parse(Cookie.get('Menu')) || this.$store.state.tab.Menu;
    }
  }
}
</script>
<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
ul.el-menu-vertical-demo.el-menu {
    height: 100%;
    
}
.el-submenu .el-menu-item {
    min-width: 144px;
  }
.el-menu {
  height: 100vh;

  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
.el-table .el-table__cell{
      padding: 10px;
    }

</style>