### 简单扫码登录逻辑梳理
1. 生成status https接口二维码
2. 页面长轮询status接口(如果返回true,则直接进入登录页,然后请求change接口改变登录态)
3. 微信扫描二维码跳转该连接,然后请求status接口,改变为true
