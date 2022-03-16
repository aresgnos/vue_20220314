<template>
    <div>
        <h3>관리자</h3>

        <p>대분류 통계</p>
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>대분류코드</th>
                    <th>전체개수</th>
                    <th>가격합계</th>
                    <th>수량합계</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tmp,idx) in state.items" :key="tmp">
                    <td>{{ idx }}</td>
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.count}}</td>
                    <td>{{tmp.pricetotal}}</td>
                    <td>{{tmp.quantitytotal}}</td>
                </tr>
            </tbody>
        </table>
        <hr/>

        <p>중분류 통계</p>
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>중분류코드</th>
                    <th>전체개수</th>
                    <th>가격합계</th>
                    <th>수량합계</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tmp,idx) in state.items2" :key="tmp">
                    <td>{{ idx }}</td>
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.count}}</td>
                    <td>{{tmp.pricetotal}}</td>
                    <td>{{tmp.quantitytotal}}</td>
                </tr>
            </tbody>
        </table>
        <hr />

        <p>소분류 통계</p>
        <table border="1">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>소분류코드</th>
                    <th>전체개수</th>
                    <th>가격합계</th>
                    <th>수량합계</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tmp,idx) in state.items3" :key="tmp">
                    <td>{{ idx }}</td>
                    <td>{{tmp._id}}</td>
                    <td>{{tmp.count}}</td>
                    <td>{{tmp.pricetotal}}</td>
                    <td>{{tmp.quantitytotal}}</td>
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
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;
        console.log(socket);
        const state = reactive ({

        });
        
        const handleData = async() => {
            const url = `/item/groupcode1`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
            }
        };

        const handleData2 = async() => {
            const url = `/item/groupcode2`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items2 = response.data.result;
            }
        };

        const handleData3 = async() => {
            const url = `/item/groupcode3`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items3 = response.data.result;
            }
        };

        onMounted( () => {
            handleData();
            handleData2();
            handleData3();
            socket.on('subscribe', (recv) => {
                console.log(recv);
                // {userid:'aaa', username:'insert'}
                if(recv.username === 'insert'){
                    handleData();
                }
            });
        });
        

        return {state, handleData, handleData2, handleData3}
    }
}
</script>

<style lang="scss" scoped>

</style>