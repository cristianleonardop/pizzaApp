import Vue from 'vue/dist/vue.esm'
import moment from 'moment'
// import TurbolinksAdapter from 'vue-turbolinks'

// Vue.use(TurbolinksAdapter)

document.addEventListener('DOMContentLoaded', function(){
var element = document.getElementById("product-orders")
if (element != undefined) {
  var productValues= JSON.parse(element.dataset.productValues)

  new Vue({
    el: element,
    data: {
      product_orders_attributes: [],
      selectedOptions: {},
      total: 0
    },
    methods: {
      addProductOrder(){
        var index = this.product_orders_attributes.findIndex( po => po.product_id == this.selectedOptions.product)
        if(index != -1) return;

        this.product_orders_attributes.push(this.productOrder())
      },
      productOrder(){
        var product_id = this.selectedOptions.product[1]
        return { quantity: 1, total: this.valuesById(product_id), product_id: product_id, product_name: this.selectedOptions.product[0] }
      },
      valuesById(id){
        return productValues.find((product) => { return product[1] == id })[0]
      },
      sumValues(){
        this.total = 0
        this.product_orders_attributes.forEach( po => this.total += parseFloat(po.total))
      },
      setTotalProductOrder(product){
        product.total = parseInt(product.quantity, 10) * this.valuesById(product.product_id)
        this.sumValues()
      },
      removeProductOrder(product){
        var index = this.product_orders_attributes.findIndex( po => po == product)

        this.product_orders_attributes.splice(index, 1)
        this.sumValues()
      }
    },
    watch: {
      selectedOptions: {
        handler(){
          this.addProductOrder()
          this.sumValues()
        },
        deep: true
      }
    },
    computed:{
      today(){
        return moment().format()
      },
      productOrdersAttributes(){
        return JSON.stringify(this.product_orders_attributes)
      }
    }
  })
}
})
