<template>
    <el-form ref="form" class="login-container" :model="form" :rules="rules" inline @keyup.enter.native="Submit()">
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:13px;" label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="login_submit" type="primary" @click="Submit()">登录</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from "../api";
export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]

            }
        }
    },
    methods: {
        Submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({data})=>{
                        if(data.code===20000){
                            Cookie.set('token',data.data.token)
                            //将菜单数据保存到store中
                            this.$store.commit('SetMenu',data.data.menu)
                            //将动态路由数据保存到store中
                            this.$store.commit('addMenu',this.$router)
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message);
                            
                        }
                        
                    })
                } else {
                    
                }

            });
        }
    }

}
</script>

<style lang="less" scoped>
.login-container {
    width: 340px;
    padding: 15px 2px 0px 35px;
    border: 1px solid #eaeaea;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    background-clip: padding-box;
    margin: 140px auto;
    box-sizing: border-box;

    .login_title {
        text-align: center;
        margin: 0px 40px 40px 20px;
        color: #505458;
    }

    .login_submit {
        margin: 10px auto 0px 105px;
    }
}
</style>