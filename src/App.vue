<template>
  <div>
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    >
    <el-menu-item @click="handleMenu('home')">Home</el-menu-item>
    <el-menu-item v-if="!logged" @click="handleMenu('login')">Login</el-menu-item>
    <el-menu-item v-if="logged" @click="handleMenu('logout')">Logout</el-menu-item>
    <el-menu-item v-if="logged === false" @click="handleMenu('join')">Join</el-menu-item>
    <el-menu-item v-if="logged === true" @click="handleMenu('mypage')">Mypage</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  setup () {

    const router = useRouter();
    const store = useStore();
    
    // stores의 getters 호출
    const logged = computed( () => store.getters.getLogged )
   
    const handleMenu = (menu) => {
      console.log('App.vue => handleMenu => ', menu);
      router.push(menu);
    }

    // 생명주기 (F5를 눌러야 수행, 새로고침이 수행됨, 한번만 가능)
    onMounted( () => {
      console.log(sessionStorage.getItem("TOKEN"));
      if(sessionStorage.getItem("TOKEN") !== null){
        store.commit('setLogged', true);
      }
      else {
        store.commit('setLogged', false);
      }
    });
    

    return {handleMenu, logged}
  }
}
</script>

<style lang="scss" scoped>

</style>