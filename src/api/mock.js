import  Mock  from "mockjs";
import  homeApi  from "../api/mockServeData/home";
import user from "../api/mockServeData/user";
import permission from '../api/mockServeData/permission'
//定义Mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
//定义Mock模拟的列表
Mock.mock('/api/home/edit','post', user.updateUser)
Mock.mock('/api/home/del','post', user.deleteUser)
Mock.mock('/api/home/add','post', user.createUser)
Mock.mock(/api\/home\/getUser/,'get', user.getUserList)

Mock.mock(/api\/permission\/getMenu/,'post', permission.getMenu)