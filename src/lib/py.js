function len(obj) {
  return obj.length
}

function* zip(arr1, arr2) {
  let min = Math.min(
    len(arr1),
    len(arr2)
  )
  for (let i = 0; i < min; i++) {
    yield [arr1[i], arr2[i]]
  }
}
//
//
// function dict_get(obj, key = null, default_data = null) {
//   try {
//     if (obj === null || obj === undefined) {
//       return default_data
//     }
//     if (key === null)
//       return obj
//     return (obj[key] !== undefined) ? obj[key] : default_data
//   } catch (e) {
//     return default_data
//   }
//
// }
//
//
// let eval_get = function (obj, default_data = null) {
//   debugger
//   try {
//     return eval(obj)
//   } catch (e) {
//     return default_data
//   }
// }
//
//
// function dict(obj = {}) {
//   const prevent_show = ["setdefault", "get", "has_key", "keys", "values", "items"]
//   let dict_obj = {
//     setdefault(key, default_val = null){
//       if (!this.has_key(key)) {
//         this[key] = default_val
//       }
//       return this[key]
//     },
//     get(key, default_val = null){
//       if (this.has_key(key)) {
//         return this[key]
//       } else {
//         return default_val
//       }
//     },
//     has_key(key){
//       if (prevent_show.in(key))
//         return false
//       return key in this
//
//     },
//     keys(){
//       let result = []
//       for (let key of Object.keys(this)) {
//         if (this.has_key(key))
//           result.append(key)
//       }
//       return result
//     },
//     values(){
//       let result = []
//       for (let key of this.keys()) {
//         result.append(this[key])
//       }
//       return result
//     },
//     items(){
//       return zip(this.keys(), this.values())
//     },
//   }
//   return Object.assign(obj, dict_obj)
// }
//
//
// function print(...val) {
//   console.log(...val)
// }

let py_module = {
  // print,
  zip,
  len,
  // dict,
  // dict_get,
  // eval_get,
}

exports.install_py = () => {
  // for (let key of Object.keys(py_module)) {
  //   window[key] = py_module[key]
  // }
  console.log("install py")
}