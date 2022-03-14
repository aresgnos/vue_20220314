// CROS domain => 같은 서버가 아니면 연동이 안됨.
// proxy를 설정하면 해결됨, 단, android등은 CORS를 반드시 설정해야함.
module.exports = {
    devServer:{
        proxy : {
            '/member' : {
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
        },
    }
}