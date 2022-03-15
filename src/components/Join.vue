<template>
    <div style="padding:50px;">
        <h3>Join</h3>
        {{state}}
        
        <el-form :inline="false" class="demo-form-inline" style="width:300px;" label-width="30%">
            <el-form-item label="아이디">
            <el-input v-model="state.userid" @keyup="handleIdCheck"></el-input>
            <label>{{state.idcheck}}</label>
            </el-form-item>
            <el-form-item label="암호">
            <el-input type="password" v-model="state.userpw"></el-input>
            </el-form-item>
            <el-form-item label="암호확인">
            <el-input type="password" v-model="state.userpw1"></el-input>
            </el-form-item>
            <el-form-item label="이름">
            <el-input v-model="state.username"></el-input>
            </el-form-item>
            <el-form-item label="이메일">
            <el-input v-model="state.useremail"></el-input>
            </el-form-item>
            <el-form-item label="나이">
            <el-input v-model="state.userage"></el-input>
            </el-form-item>
            <el-button type="primary" round style="float:right;" @click="handleJoin">회원가입</el-button>
        </el-form>
        
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {

        const router = useRouter();

        const state = reactive ({
            idcheck : '중복확인',
            userid : '',
            userpw : '',
            userpw1 : '',
            username : '',
            useremail : '',
            userage : ''
        });

        const handleJoin = async() => {
            // 유효성 검사 통과 후
            // = if(state.userid.length <=0 ){ 아이디 길이가 0보다 작은 경우(=no 입력)
            if(state.userid === ''){
                alert('아이디를 입력하세요.');
                return false;
            }
            if(state.userpw === ''){
                alert('암호를 입력하세요.');
                return false;
            }
            if(state.userpw1 === ''){
                alert('암호를 한 번 더 입력하세요.');
                return false;
            }
            if(state.username === ''){
                alert('이름을 입력하세요.');
                return false;
            }
            if(state.useremail === ''){
                alert('이메일을 입력하세요.');
                return false;
            }
            if(state.userage === ''){
                alert('나이를 입력하세요.');
                return false;
            }

            const url = `/member/insert`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw,
                name : state.username,
                email : state.useremail,
                age : Number(state.userage)
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('회원가입 되었습니다.');
                router.push({name:'Home'});
            }
        }

        const handleIdCheck = async() => {
            // 0 => n자 이상이어야
            if(state.userid.length > 0){
                const url = `/member/idcheck?id=${state.userid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    if(response.data.result === 1){
                        state.idcheck = '사용불가';
                    }
                    else if(response.data.result === 0){
                        state.idcheck = '사용가능';
                    }
                }
            }
            else {
                state.idcheck = '중복확인';
            }
        }
        
        return {state, handleIdCheck, handleJoin}
    }
}
</script>

<style lang="css">

</style>