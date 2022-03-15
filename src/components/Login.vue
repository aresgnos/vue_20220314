<template>
    <div style="padding:50px;">
       <h3>Login</h3>
       
        <el-form :inline="false" class="demo-form-inline" style="width:300px;" label-width="30%">
            <el-form-item label="아이디">
            <el-input v-model="state.userid" ref="userid"></el-input>
            </el-form-item>
            <el-form-item label="암호">
            <el-input type="password" v-model="state.userpw" ref="userpw"></el-input>
            </el-form-item>
            <el-button type="primary" round style="float:right;" @click="handleLogin">로그인</el-button>
        </el-form>
        
    </div>
</template>

<script>
import { reactive,ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    setup () {

        const router = useRouter();
        const store = useStore();

        //  빈 ref객체 생성, 아래에서 return 해야함.
        const userid = ref(null);
        const userpw = ref(null);

        const state = reactive ({
            userid : '',
            userpw : ''
        });

        // 유효성 검사
        const handleLogin = async() => {
            if(state.userid === ''){
                alert('아이디를 입력하세요.');
                userid.value.focus();
                return false;
            }
            if(state.userpw === ''){
                alert('비밀번호를 입력하세요.');
                userpw.value.focus();
                return false;
            }

            const url = `/member/select`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                id : state.userid,
                pw : state.userpw
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);

            if(response.data.status === 200){
                sessionStorage.setItem("TOKEN", response.data.result);
                alert('로그인 되었습니다.');
                store.commit('setLogged', true); // ('메소드명', 변경할 값)
                router.push({name:'Home'});
            }
        }

        return {state, handleLogin, userid, userpw}
    }
}
</script>

<style lang="scss" scoped>

</style>