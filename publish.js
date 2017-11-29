let fs = require('fs')
let cmd = require("node-cmd")
cmd.run('npm run build')


let add_version = (obj) => {
  let version = obj.version.split(".")
  version[2] = parseInt(version[2]) + 1
  version = version.join(".")
  obj.version = version
}

setTimeout(() => {
  let obj = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  add_version(obj)
  fs.writeFileSync("package.json", JSON.stringify(obj, null, '\t'))
  cmd.get("npm publish", (err, data) => {
    console.log("finish")
    process.exit()
  })

}, 2000)


