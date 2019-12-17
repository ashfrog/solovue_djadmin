export function getsuffix(filename) {
  if (!filename || typeof filename !== 'string') {
    return false
  }
  const a = filename.split('').reverse().join('')
  const b = a.substring(0, a.search(/\./)).split('').reverse().join('')
  return b
}

export function readText(file) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = function() {
      resolve(this.result)
    }
  })
}
