import Vue from 'vue/dist/vue.esm'
import moment from 'moment'
// import TurbolinksAdapter from 'vue-turbolinks'

// Vue.use(TurbolinksAdapter)

document.addEventListener('DOMContentLoaded', function(){
var element = document.getElementById("order-state")
if (element != undefined) {
  var state = element.dataset.state

  new Vue({
    el: element,
    data: {
      selectedOptions: {}
    },
    computed: {
      state(){
        var stateId = this.selectedOptions.state == undefined ? state : this.selectedOptions.state[1]
        return stateId
      }
    }
  })
}
})
