import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,//控制菜单是否收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],//面包屑数据
        Menu:[]
    },
    mutations: {
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state,val){
            if(val.name!=='home'){
                const index = state.tabsList.findIndex(item=>item.name===val.name)
                if(index === -1){
                    state.tabsList.push(val)
                }
                
            }
        },
        deleteMenu(state,val){
            //splice删除
            state.tabsList.splice(state.tabsList.indexOf(val),1);
            //filter删除
            // state.tabsList = state.tabsList.filter(item=>item!==val);
        },
        clearMenu(state,val){
            state.tabsList=[
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                }
            ]
        },
        SetMenu(state,val){
            state.Menu=val
            Cookie.set('Menu',JSON.stringify(val))
        },
        addMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('Menu')) return
            const menu =JSON.parse(Cookie.get('Menu'))
            state.menu =menu
            const menuArray=[]
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item=>{
                        item.component=()=>import (`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component=()=>import (`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray);
            //路由的动态添加
            menuArray.forEach(item =>{
                router.addRoute('Main',item)
            })
            
        }
    }
}