<template>
    <div>
        
        <el-button type="primary" round @click="handleDelete">회원탈퇴</el-button>
        
    </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios'
export default {
    setup () {

        const router = useRouter();

        const state = reactive ({
            token : sessionStorage.getItem("TOKEN"),
        })

        const handleDelete = async() => {
            if(confirm('탈퇴하시겠습니까?')){
                const url = `/member/delete`;
                const headers = {
                    "Content-Type":"application/json",
                    "auth" : state.token // 토큰 키 : auth
                }
                
                const response = await axios.delete(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('회원탈퇴 되었습니다.');
                    router.push({name:'Logout'}); // 로그아웃 페이지를 호출해야 토큰이 날라간다.
                }
            }
        }

        return {state, handleDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>