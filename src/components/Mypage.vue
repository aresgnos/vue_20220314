<template>
    <div style="padding:50px;">
        <h3>Mypage</h3>

        <el-tabs
        type="card"
        class="demo-tabs"
        >
        <el-tab-pane label="정보수정" @click="handleMenu(1)">정보수정</el-tab-pane>
        <el-tab-pane label="암호변경" @click="handleMenu(2)">암호변경</el-tab-pane>
        <el-tab-pane label="회원탈퇴" @click="handleMenu(3)">회원탈퇴</el-tab-pane>
        <menu-1 v-if="state.menu === 1"></menu-1>
        <menu-2 v-if="state.menu === 2"></menu-2>
        <menu-3 v-if="state.menu === 3"></menu-3>
        </el-tabs>

    </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { reactive } from 'vue';
import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';
export default {
     components:{
            Menu1, Menu2, Menu3
        },

    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
                menu :  Number(route.query.menu)
            });

        const handleMenu = (idx) =>{
                router.push({name:"Mypage", query:{menu:idx}});
                state.menu = idx;
            }
        

        return {state, handleMenu}
    }
}
</script>

<style lang="scss" scoped>

</style>