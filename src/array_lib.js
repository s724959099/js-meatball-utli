Array.prototype.in = function (val) {
  return this.includes(val)
}

Array.prototype.not_in = function (val) {
  return !this.in(val)

}

Array.prototype.append = function (...val) {
  return this.push(...val)

}

Array.prototype.remove = function (val) {
  if (Array.isArray(val)) {
    for (let item of val) {
      this.remove(item)
    }
    return this
  }
  let index = this.indexOf(val)
  if (index !== -1)
    this.splice(index, 1)
  return this

}
Array.prototype.remove_by_index =function (index) {
  if (index !== -1)
    this.splice(index, 1)
  return this

}

Array.prototype.change = function (old_val, new_val) {
  let index = this.indexOf(old_val)
  if (index !== -1)
    this[index] = new_val
  return this

}

Array.prototype.change_obj_with_key = function (key, val,new_obj) {
  let result = this.in_obj_with_key(key,val)
  result.map(obj=>{
    obj=Object.assign(obj,new_obj)
  })
  return this
}


Array.prototype.remove_obj_with_key = function (key, val) {
  let result=  this.filter((obj) => {
    return obj[key] === val
  })
  return this.remove(result)
}
Array.prototype.is_in_obj_with_key = function (key, val) {
  let data = this.filter((obj) => {
    return obj[key] === val
  })
  if(data.length){
    return true
  }else{
    return false
  }
}

Array.prototype.in_obj_with_key = function (key, val) {
  let data = this.filter((obj) => {
    return obj[key] === val
  })
  return data
}

Array.prototype.get_obj = function (key, val, single = false) {
  let f = this.filter((item) => item[key] === val)
  if (single && f.length > 1) {
    throw "more than one"
  }
  return f.length ? f[0] : null
}

/**
 * example:
 * let a=[{a:3},{a:3},{a:3},{a:3}]
 * a.all_exist('a') // true
 * a.all_exist('a',3) // true
 * a.all_exist('a',4) // false
 *
 * let a=[{a:3},{a:3},{a:3},{a:4}]
 * a.all_exist('a',3) // false
 * */
Array.prototype.all_exist = function(key, val = undefined){
  let result = true
  this.map(item => {
    if (!(key in item) || (val !== undefined && item[key] !== val)) {
      result = false
    }
  })
  return result

}




Array.init_data = function (num, value) {
  return Array.from(new Array(num).keys()).map((val) => {
    if (typeof value === "function") {
      return value()
    } else {
      return value
    }

  })
}





