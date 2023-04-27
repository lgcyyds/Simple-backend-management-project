<template>
  <el-container>
    <el-aside style="width:auto">
      <common-aside />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <CommonTag></CommonTag>
      <el-main>
        <!--        路由出口-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from '@/components/CommonHeader'
import CommonTag from "@/components/CommonTag.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
}

.el-menu-vertical-demo[data-v-a28ad4e6]:not(.el-menu--collapse) {
  width: 150px;
  min-height: 608px;

}

.el-menu {
  border-right: solid 0px #e6e6e6;
}
.el-container{
  background-color: #f6fafa;
}
</style>