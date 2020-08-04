module.exports = {
  /**
   * 通过配置nginx转发 配合前端解决跨域问题
   */
  // host: 'https://www.crazysolo.com',

  // host: 'https://www.bilitty.cn',
  // host: 'http://124.70.24.202:8083', // 本地连接服务器不经过nginx反向代理
  host: 'http://localhost:8083',
  // host: 'http://117.78.27.73:8082',
  /**
   * tomcat服务器ip 上传大文件不通过nginx转发 由于cdn不能配置端口,只能通过指定ip上传
   */
  filehost: 'https://124.70.24.202'
}
