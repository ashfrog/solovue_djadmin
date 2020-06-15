module.exports = {
  /**
   * nginx服务器 业务都通过nginx路径/prod-api/转发
   */
  // host: 'https://www.crazysolo.com',
  host: 'http://localhost:8083',
  /**
   * tomcat服务器ip 上传大文件不通过nginx转发 由于cdn不能配置端口,只能通过指定ip上传
   */
  uploadurl: 'https://117.78.27.73:8082'
}
