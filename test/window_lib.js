import "test/array_lib"

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
let utli_module = {
  Eventhelper,
  EZComponent,
  VueAttrs,
  uuid,
  bytes_to_size,
  get_url,
}


exports.install_utli = () => {
  for (let key of Object.keys(utli_module)) {
    window[key] = utli_module[key]
  }
}