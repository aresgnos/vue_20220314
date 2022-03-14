<template>
  <div>
    <el-menu
    class="el-menu-demo"
    mode="horizontal"
    >
    <el-menu-item index="1" @click="handleMenu('home')">Home</el-menu-item>
    <el-menu-item index="2" @click="handleMenu('login')">Login</el-menu-item>
    <el-menu-item index="3" @click="handleMenu('join')">Join</el-menu-item>
    <el-menu-item index="4" @click="handleMenu('mypage')">Mypage</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup () {
    const router = useRouter();
    const handleMenu = (menu) => {
      router.push(menu);
    }
    

    return {handleMenu}
  }
}
</script>

<style lang="scss" scoped>

</style>