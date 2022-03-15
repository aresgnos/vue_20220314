<template>
    <div>
        <el-form :inline="false" class="demo-form-inline" style="width:400px;margin-top:20px;" label-width="30%">
            <el-form-item label="현재 비밀번호">
            <el-input type="password" v-model="state.pw"></el-input>
            </el-form-item>
            <el-form-item label="변경할 비밀번호">
            <el-input type="password" v-model="state.newpw"></el-input>
            </el-form-item>
            <el-button type="primary" round style="float:right;" @click="handleUpdatePw">암호변경</el-button>
        </el-form>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
export default {
    setup () {

        const state = reactive ({
            token : sessionStorage.getItem("TOKEN"),
            pw : '',
            newpw : ''
        });

        const handleUpdatePw = async() => {
            const url = `/member/updatepw`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token
                };
            const body = {
                pw : state.pw,
                newpw : state.newpw
            }

            const response = await axios.put(url, body, {headers:headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('비밀번호 변경완료');
            }
        }

        return {state, handleUpdatePw}
    }
}
</script>

<style lang="scss" scoped>

</style>