<template>
    <div v-if="state.item">
        <el-form :inline="false" class="demo-form-inline" style="width:300px;margin-top:20px;" label-width="30%">
            <el-form-item label="이름">
            <el-input v-model="state.item.name"></el-input>
            </el-form-item>
            <el-form-item label="나이">
            <el-input v-model="state.item.age"></el-input>
            </el-form-item>
            <el-button type="primary" round style="float:right;" @click="handleUpdate">정보수정</el-button>
        </el-form>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    setup () {

        const state = reactive ({
            token : sessionStorage.getItem("TOKEN"),
        });
        
        // 회원 정보 1개 읽기
        const handleData = async () => {
            const url = `/member/selectone`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token // 토큰 키 : auth
                }
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
        }

        onMounted ( () => {
            handleData();
        })

        const handleUpdate = async() => {
            const url = `/member/update`;
            const headers = {
                "Content-Type":"application/json",
                "auth" : state.token // 토큰 키 : auth
                }
            const body = {
                name : state.item.name,
                age : state.item.age
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                alert('회원정보 변경완료');
            }
        }            
    
    

        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>