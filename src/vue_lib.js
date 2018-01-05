import mixin from "./mixin"
export function install_vue(Vue) {
  let MyPlugin = {}
  MyPlugin.install = function (Vue, options) {
    Vue.prototype.$dict_get = dict_get
    Vue.mixin(mixin.screen)

    Vue.directive('hover', {
      bind: function (el, binding, vnode) {
        $(el).mouseenter(() => {
          vnode.context[binding.expression] = true
        }).mouseleave(() => {
          vnode.context[binding.expression] = false
        })
      }
    })

  }

  Vue.use(MyPlugin)
}
