export default {
  data () {
    return {
      window__width:null,
    }
  },
  computed:{
    window_size(){
      let w = parseInt(this.window__width)
      if (w < 600) {
        return 'xs'
      } else if (w < 960 && w >= 600) {
        return 'sm'
      } else if (w < 1264 && w >= 960) {
        return 'md'
      } else if (w <1904 && w >= 1264) {
        return 'lg'
      } else if (1904 < w) {
        return 'xl'
      } else {
        return null
      }
    }
  },
  methods: {
  },
  mounted(){
    this.window__width = window.innerWidth
    $(window).on("resize",()=>{
      this.window__width = window.innerWidth
    })
  }
}
