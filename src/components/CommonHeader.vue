<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu()" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path }">
                    {{item.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown size="mini" @command="logout">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/QQ图片20210517210158.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command='a'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from 'js-cookie'
export default {
    name: 'CommonHeader',
    methods: {
        handleMenu() {
            this.$store.commit('CollapseMenu');
        },
        logout(command){
            if(command=='a')
            Cookie.remove('token')
            Cookie.remove('menu')
            this.$router.push('/login')
            this.$store.commit('clearMenu');
        }
    },
    computed: {
        // tags(){
        //     return this.$store.state.tab.tabsList;
        // }
        ...mapState({//ES6的语法
            tags: state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
.header-container {
    background-color: #333;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .l-content {
        padding: 0 20px;
    }

    .text {
        color: #fff;
        font-size: 10px;
        margin-left: 10px;
    }

    .r-content {
        margin-right: 10px;

        .user {
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 15px;
    }

    .el-breadcrumb__item::v-deep {
        .el-breadcrumb__inner {
            font-weight: normal;
            color: #666;

            &:hover {
                color: #fff
            }
        }
    }
}
</style>