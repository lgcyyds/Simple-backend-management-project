<template>
    <div class="tabs">
        <el-tag v-for="tag in tags" :key="tag.name" :effect="effectChange(tag)" :closable="tag.name !== 'home'"
            size="mini" @close="closeTag(tag)" @click="changeMenu(tag)">
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: 'CommonTag',
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        effectChange(tag) {
            return tag.path === this.$route.path || (tag.path === '/' && this.$route.path === '/home') ? 'dark' : 'plain'
        },
        //点击tag跳转功能
        changeMenu(tag){
            this.$router.push(tag.path)
        },
        //点击tag删除功能
        closeTag(tag) {
            
            if (this.$route.path === this.tags.slice(-1)[0].path&&(tag===this.tags.slice(-1)[0])) {
                this.$router.push(this.tags[this.tags.indexOf(tag) - 1].path)
            }
            else if (this.$route.path === tag.path) {
                this.$router.push(this.tags[this.tags.indexOf(tag) + 1].path)
            }
            this.$store.commit('deleteMenu', tag);
        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding-left: 10px;
    .el-tag{
        margin-right: 10px;
        cursor: pointer;//鼠标经过有小手
    }
}
</style>