// CROS domain => 같은 서버가 아니면 연동이 안됨.
// proxy를 설정하면 해결됨, 단, android등은 CORS를 반드시 설정해야함.
module.exports = {
    devServer:{
        proxy : {
            // socket.io, websocket => 문자나 파일을 통신
            // webrtc => 실시간 화상채팅
            
            '/socket' : { // socket용, 실시간
                target:'http://localhost:3001',
                ws:true,
                changeOrigin :true,
                logLevel : 'debug'
            },

            '/member' : { // rest용, 데이터를 호출하면 처리해주는
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },

            '/item' : { // rest용
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
        },
    },
}