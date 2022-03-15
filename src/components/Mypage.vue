<template>
    <div style="padding:50px;">
        <h3>mypage</h3>

        <el-tabs
        type="card"
        class="demo-tabs"
        >

        <el-tab-pane label="정보수정">
            <menu-1></menu-1>
        </el-tab-pane>
        <el-tab-pane label="암호변경">
           <menu-2></menu-2>
        </el-tab-pane>
        <el-tab-pane label="회원탈퇴">
            <menu-3></menu-3>
        </el-tab-pane>
        
        </el-tabs>

    </div>
</template>

<script>
import { reactive } from 'vue';

import Menu1 from './mypage/Menu1.vue';
import Menu2 from './mypage/Menu2.vue';
import Menu3 from './mypage/Menu3.vue';

export default {
    components:{
        Menu1, Menu2, Menu3
    },

    setup () {

        const state = reactive({
            menu : 1,
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>
