module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
  return this.map((obj) => {
    if(obj[key]===val){
      return new_obj
    }else{
      return obj
    }
  })
}


Array.prototype.remove_obj_with_key = function (key, val) {
  return this.filter((obj) => {
    return obj[key] !== val
  })
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





Array.init_data = function (num, value) {
  return Array.from(new Array(num).keys()).map((val) => {
    if (typeof value === "function") {
      return value()
    } else {
      return value
    }

  })
}







/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_py__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_window_lib__ = __webpack_require__(3);
/**
 * Created by Admin on 2017/11/29.
 */



/* harmony default export */ __webpack_exports__["default"] = ({
  install_py: __WEBPACK_IMPORTED_MODULE_0__lib_py__["a" /* install_py */],
  install_utli: __WEBPACK_IMPORTED_MODULE_1__lib_window_lib__["a" /* install_utli */],
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = install_py;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__array_lib__);


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


function dict_get(obj, key = null, default_data = null) {
  try {
    if (obj === null || obj === undefined) {
      return default_data
    }
    if (key === null)
      return obj
    return (obj[key] !== undefined) ? obj[key] : default_data
  } catch (e) {
    return default_data
  }

}


let eval_get = function (obj, default_data = null) {
  debugger
  try {
    return eval(obj)
  } catch (e) {
    return default_data
  }
}


function dict(obj = {}) {
  const prevent_show = ["setdefault", "get", "has_key", "keys", "values", "items"]
  let dict_obj = {
    setdefault(key, default_val = null){
      if (!this.has_key(key)) {
        this[key] = default_val
      }
      return this[key]
    },
    get(key, default_val = null){
      if (this.has_key(key)) {
        return this[key]
      } else {
        return default_val
      }
    },
    has_key(key){
      if (prevent_show.in(key))
        return false
      return key in this

    },
    keys(){
      let result = []
      for (let key of Object.keys(this)) {
        if (this.has_key(key))
          result.append(key)
      }
      return result
    },
    values(){
      let result = []
      for (let key of this.keys()) {
        result.append(this[key])
      }
      return result
    },
    items(){
      return zip(this.keys(), this.values())
    },
  }
  return Object.assign(obj, dict_obj)
}


function print(...val) {
  console.log(...val)
}

let py_module = {
  print,
  zip,
  len,
  dict,
  dict_get,
  eval_get,
}

function install_py() {
  for (let key of Object.keys(py_module)) {
    window[key] = py_module[key]
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = install_utli;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_lib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_lib___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__array_lib__);


let VueAttrs = {
  watch_data: [],
  get_attr_data: [],
  __r: /\./,
  init(){
    this.watch_data = []
    this.get_attr_data = []
  },
  how_many_key(get_data = 'get_attr_data'){
    let counter = dict()
    for (let item of this[get_data]) {
      let index = counter.setdefault(item.key, 0)
      counter[item.key] = index + 1
    }
    for (let [key, val] of counter.items()) {
      console.log(`key: '${key}' count: ${val}`)
    }
    console.log("--------------------------------")
    console.log("total:", len(this[get_data]))
  },
  equal(vm1, vm1_attr, vm2, vm2_attr){
    let [deep_vm1, deep_attr1] = this.__deep_find(vm1, vm1_attr)
    let [deep_vm2, deep_attr2] = this.__deep_find(vm2, vm2_attr)

    deep_vm1[deep_attr1] = deep_vm2[deep_attr2]
  },
  equal_val(vm1, vm1_attr, val){
    let [deep_vm1, deep_attr1] = this.__deep_find(vm1, vm1_attr)

    deep_vm1[deep_attr1] = val
  },
  __deep_find(vm, attr){
    if (this.__r.test(attr)) {
      let attr_split = attr.split(".")
      let deep_obj = vm
      while (true) {
        if (len(attr_split) > 1) {
          let one_attr = attr_split.shift()
          deep_obj = deep_obj[one_attr]
        } else {
          let one_attr = attr_split.shift()
          return [deep_obj, one_attr]
        }
      }
    } else {
      return [vm, attr]
    }
  },
  watch(key, vm, attr){
    this.watch_data.append(dict({
      vm: vm,
      attr: attr,
      key: key,
    }))
    // first time
    for (let item of this.get_attr_data) {
      if (item.key === key) {
        if (item.attr === null)
          this.equal(item.vm, attr, vm, attr)
        else
          this.equal(item.vm, item.attr, vm, attr)
        if (item.sync) {
          let self = this
          if (item.attr === null)
            item.vm.$watch(attr, function (val) {
              self.equal_val(vm, attr, val)
            })
          else
            item.vm.$watch(item.attr, function (val) {
              self.equal_val(vm, attr, val)
            })
        }
      }
    }
    // 之後watch的時候
    let self = this
    vm.$watch(attr, function (val) {
      for (let item of self.get_attr_data) {
        if (item.key === key) {
          if (item.attr === null)
            self.equal_val(item.vm, attr, val)
          else
            self.equal_val(item.vm, item.attr, val)
        }
      }
    })
  },
  get_attr(key, vm, attr = null, call_triggered = false, one_key = false, sync = false){
    if (call_triggered) {
      for (let item of this.watch_data) {
        if (item.key === key) {
          if (attr === null)
            this.equal(vm, item.attr, item.vm, item.attr)
          else
            this.equal(vm, attr, item.vm, item.attr)
          break
        }
      }
    }
    if (one_key) {
      this.data = this.data.remove_obj_with_key("key", key)
    }
    this.get_attr_data.append(dict({
      vm: vm,
      attr: attr,
      key: key,
      sync: sync,
    }))
  },
  get_attr_sync(key, vm, attr = null, call_triggered = false, one_key = false){
    return this.get_attr(key, vm, attr, call_triggered, one_key, true)
  }

}

let Eventhelper = {
  data: [],
  trigger_data: [],
  remove(val){
    this.data = this.data.remove_obj_with_key("id", val)
  },
  init(){
    this.data = []
    this.trigger_data = []
  },
  listen(key, fn, call_triggered = false, one_key = false){
    if (typeof fn === "function") {
      let obj = {
        key: key,
        fn: fn,
        id: uuid(),
      }
      if (one_key) {
        this.data = this.data.remove_obj_with_key("key", key)
      }
      this.data.append(obj)
      if (call_triggered) {
        this._excute_in_trigger_data(obj)
      }
      return obj.id
    } else {
      console.log("need function")
    }
  },
  _excute_in_trigger_data(obj){
    let data = this.trigger_data.in_obj_with_key("key", obj.key)
    for (let item of data) {
      obj.fn(...item.arg)
    }
  },
  _in_trigger_data(key){
    let in_trigger = this.trigger_data.is_in_obj_with_key("key", key)
    return in_trigger

  },
  trigger(key, ...arg){
    let in_data = this._in_trigger_data(key)
    for (let item of this.data) {
      if (item.key === key) {
        item.fn(...arg)
      }
    }
    let trigger_obj = {
      key: key,
      arg: arg,
    }
    if (!in_data) {
      this.trigger_data.append(trigger_obj)
    } else {
      this.trigger_data = this.trigger_data.change_obj_with_key("key", key, trigger_obj)
    }
  }
}

let EZComponent = {
  get(self, channel = 'EZComponent_using'){
    Eventhelper.listen(channel, (key, _self) => {
      self[key] = _self
    }, true)
  },
  post(self, attr, channel = "EZComponent_using"){
    Eventhelper.trigger(channel, attr, self)
  }
}

const base_href = window.location.origin
function get_url(u) {
  return `${base_href}/api${u}`
}


function bytes_to_size(bytes, decimals) {
  if (bytes === 0) return '0 Bytes';
  let k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


function uuid() {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

let range = (num, start = 0) => {
  return Array.from(new Array(num).keys()).map((val) => {
    return val + start
  })
}
let utli_module = {
  Eventhelper,
  EZComponent,
  VueAttrs,
  uuid,
  bytes_to_size,
  get_url,
  range,
}


function install_utli(){
  for (let key of Object.keys(utli_module)) {
    window[key] = utli_module[key]
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map