<template>
    <div style="padding:50px;">
       <h3>Login</h3>
       
        <el-form :inline="false" class="demo-form-inline" style="width:300px;" label-width="30%">
            <el-form-item label="아이디">
            <el-input></el-input>
            </el-form-item>
            <el-form-item label="암호">
            <el-input></el-input>
            </el-form-item>
            <el-button type="primary" round style="float:right;">로그인</el-button>
        </el-form>
        
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>