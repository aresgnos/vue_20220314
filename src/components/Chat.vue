<template>
    <div>
        <h3>채팅</h3>
        <hr />

        <input type="text" v-model="state.userid">
        <input type="text" v-model="state.message" @keyup.enter="handleSendMessage" />

        <table border="1">
            <tr v-for="tmp in state.list" :key="tmp">
                <td>{{tmp.userid}}</td>
                <td>{{tmp.username}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive } from '@vue/runtime-core';

export default {
    setup () {
        const state = reactive ({
            message : '',
            userid : '',
            list : []
        });

        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;        
        console.log(socket);

        const handleSendMessage = () => { // emit : 보내겠다.
            // 서버로 보내기 publish는 임의로 정한 키 이름
            socket.emit('publish', {
                data : { userid:state.userid, username:state.message }});
        }

        onMounted( () => {
            // 서버에서 오는 값 받기, subscribe는 임의로 정한 키 이름
            socket.on('subscribe', (recv) => {
                console.log(recv);
                state.list.push(recv);
            });
        });

        return {state, handleSendMessage}
    }
}
</script>

<style lang="scss" scoped>

</style>