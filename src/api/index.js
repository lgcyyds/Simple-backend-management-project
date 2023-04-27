import http from "../utils/request";
//请求首页数据
export const getData =()=>{
    //返回一个promise对象
    return http.get('/home/getData');
}
export const getUserList =(params)=>{
    //返回用户列表
    return http.get('/home/getUser',params);
}
export const updateUser =(data)=>{
    return http.post('/home/edit',data);
}
export const deleteUser =(data)=>{
    return http.post('/home/del',data);
}
export const createUser =(data)=>{
    return http.post('/home/add',data);
}
export const getMenu =(data)=>{
    return http.post('/permission/getMenu',data);
}