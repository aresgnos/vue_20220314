<template>
    <div>
        <vue3-chart-js v-bind="barChart" ref="chartRef"></vue3-chart-js>
    </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';
import { reactive, onMounted, ref } from 'vue';
import { getCurrentInstance } from '@vue/runtime-core'
import axios from 'axios';

export default {
    components:{
        Vue3ChartJs
    },

    setup () {
        const app = getCurrentInstance();
        const socket = app.appContext.config.globalProperties.$socket;

        // 빈 ref 변수를 생성 (focus)
        const chartRef = ref(0);

        const state = reactive({

        });

        // 차트 설정
        const barChart = reactive({
            type : "bar",
            option : {

            },
            data : {
                labels : [],
                datasets : [
                    {
                        label : "전체개수",
                        backgroundColor : ['#1abc9c'],
                        data : []
                    },
                    {
                        label : "가격합계",
                        backgroundColor : ['#FFE632'],
                        data : []
                    },
                    {  
                        label : "수량합계",
                        backgroundColor : ['#E62622'],
                        data : []
                    }
                ]
            }
        });

        const handleData = async() => {
            const url = `/item/groupcode1`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);

            // [{},{},{}] => []
            // labels 부분을 바꾸기 위해 하는 것
            if(response.data.status === 200){
                // 변수 만들기, _id만 가져와서 보관하기 위해
                const arr1 = []; // ["001", "101", "102", "110", "111"]

                // 전체개수를 보관하기 위해
                const arr2 = []; // [2, 2, 2, 6, 1]
                const arr2color = [];

                // 가격합계를 보관하기 위해
                const arr3 = [];
                const arr3color  = [];

                // 수량합계를 보관하기 위해
                const arr4 = [];
                const arr4color = [];

                for(let tmp of response.data.result){
                    console.log(tmp);
                    arr1.push(tmp._id);

                    arr2.push(tmp.count);
                    arr2color.push('#9DFFB0');

                    arr3.push(tmp.pricetotal);
                    arr3color.push('#D4A0EB');

                    arr4.push(tmp.quantitytotal);
                    arr4color.push('#B5E3FF');
                }
                console.log(arr1);
                console.log(arr2);
                console.log(arr3);
                console.log(arr4);

                // 라벨
                barChart.data.labels = arr1;

                // 전체 개수
                barChart.data.datasets[0].backgroundColor = arr2color;
                barChart.data.datasets[0].data = arr2;

                // 가격합계
                barChart.data.datasets[1].backgroundColor = arr3color;
                barChart.data.datasets[1].data = arr3;

                // 수량합계
                barChart.data.datasets[2].backgroundColor = arr4color;
                barChart.data.datasets[2].data = arr4;

                chartRef.value.update(200);
            }
        };

        onMounted( () => {
            handleData();
            socket.on('subscribe', (recv) => {
                console.log(recv);
                // {userid:'aaa', username:'insert'}
                if(recv.username === 'insert'){
                    handleData();
                }
            });
        });
        

        return {barChart, state, chartRef}
    }
}
</script>

<style lang="scss" scoped>

</style>