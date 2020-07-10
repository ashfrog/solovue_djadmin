// 点击下载文件
export function downloadfile(src, fileName) {
  const x = new XMLHttpRequest()
  x.open('GET', src, true)
  x.responseType = 'blob'
  x.onload = function(e) {
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }
  x.send()
}
