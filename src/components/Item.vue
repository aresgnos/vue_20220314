<template>
    <div>
        <h3>물품관리</h3>
        
        <div>
            코드 : <input type="text" v-model="state.code" placeholder="000-000-000" /><br />
            이름 : <input type="text" v-model="state.name" placeholder="" /><br />
            가격 : <input type="text" v-model="state.price" placeholder="숫자만" /><br />
            수량 : <input type="text" v-model="state.quantity" placeholder="숫자만" /><br />
            <button @click="handleInsert">물품등록</button>
        </div>
        <hr />

        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>대분류</th>
                    <th>중분류</th>
                    <th>소분류</th>
                    <th>이름</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>등록일</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.code1}}</td>
                    <td>{{tmp.code2}}</td>
                    <td>{{tmp.code3}}</td>
                    <td>{{tmp.name}}</td>
                    <td>{{tmp.price}}</td>
                    <td>{{tmp.quantity}}</td>
                    <td>{{tmp.regdate}}</td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { getCurrentInstance } from '@vue/runtime-core'

export default {
    setup () {
        // main.js에 등록했던 변수 가져오기
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);

        const state = reactive ({
            code : '',
            name : '',
            price : 0,
            quantity : 0,
        });

        // 물품 등록
        const handleInsert = async() => {
            const url = `/item/insert`;
            const headers = {"Content-Type":"application/json"};

            // 현재 state.code => 010-001-002
            const tmp = state.code.split("-");
            console.log(tmp); //코드분할 => tmp[0], tmp[1], tmp[2] 에 담겨있는거 꺼내기
            // 합치기 => tmp[0] + "-" + tmp[1] + "-" + tmp[2]

            const body = {
                code1 : tmp[0],
                code2 : tmp[1],
                code3 : tmp[2],
                name : state.name,
                price : state.price,
                quantity : state.quantity,
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                // alert('물품등록 되었습니다.');
                // 이 위치에서 등록했음을 통지(신호를 줌)
                socket.emit('publish', {data : {userid:'aaa', username:'insert'}});
                handleData(); // 목록 갱신, 목록을 가져와서 state.items에 추가
            }
        };

        // 물품 목록 받아오기
        const handleData = async() => { // f5
            const url = `/item/select`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if(response.data.status === 200 ){
                state.items = response.data.result;
            }
        };

        onMounted( () => { 
            handleData();

        });
        
        return {state, handleInsert}
    }
}
</script>

<style lang="scss" scoped>

</style>