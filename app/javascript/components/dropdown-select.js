import Vue from 'vue/dist/vue.esm'
// import ClickOutside from '../vue-click-outside'

// Vue.use(vClickOutside)

Vue.component('dropdown-select', {
  data: function () {
    return {
      show: false,
      selected: { img: null, option: []},
      defaultDropdownSize: 0,
      search: '',
      showSelectedContent: true,
      defaultIndex: 0,
      currentIndex: 0
    }
  },
  methods: {
    close: function() {
      this.show = false
      this.showSelectedContent = true
      this.search = ''
      this.currentIndex = this.indexByOption(this.selected.option)
      var scroll = this.$refs.dropdownContent
      scroll.scrollTop = this.$refs.options[this.currentIndex].offsetTop
    },
    selectOption(index){
      this.$set(this.selected, "img", this.image_paths[index])
      this.$set(this.selected, "option", this.options[index])
      this.currentIndex = index
      this.search = ''
      this.showSelectedContent = true
      Vue.set(this.$root.selectedOptions, this.name, this.selected.option)
    },
    selectOptionEvent(){
      var option = this.filterItems[this.currentIndex]
      this.selectOption(this.indexByOption(option))
      this.show = false
    },
    indexByOption(option){
      if(!option) return -1
      return this.options.findIndex((o) => o[1] == option[1])
    },
    idealWidth(){
      var baseSize = 0
      this.options.forEach(element => {
        if (element[0].length > baseSize) {
          baseSize = element[0].length
        }
      })
      this.defaultDropdownSize = `${baseSize * 8}px`;
    },
    imagePathByOption(option){
      var imagePath = this.image_paths[this.indexByOption(option)]
      return imagePath != undefined ? `assets/${imagePath}` : ""
    },
    nextOption() {
      var scroll = this.$refs.dropdownContent

    	if (event.keyCode == 38 && this.currentIndex > 0) {
      	this.currentIndex--
        scroll.scrollTop -= this.$refs.options[this.currentIndex].offsetHeight
      } else if (event.keyCode == 40 && this.currentIndex < this.filterItems.length - 1) {
        this.currentIndex++
        scroll.scrollTop += this.$refs.options[this.currentIndex].offsetHeight
      }
    },
    handlePageScroll(){
      var keyCode = event.keyCode
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

      window.onscroll = () => {
        if ((keyCode == 38 || keyCode == 40) && this.show) {
          window.scrollTo(scrollLeft, scrollTop);
        }
      };
    },
    addFocus(){
      this.$refs.search.focus()
    }
  },
  computed: {
    filterItems: function(){
      var app = this;
      if (this.search == '') {
        return this.options;
      }
      var filterOptions = this.options.filter(function(option) {
        let regex = new RegExp('(' + app.search + ')', 'i');
        return option[0].match(regex);
      })
      var optionIndex = this.indexByOption(filterOptions[0])
      if(optionIndex != -1) this.currentIndex = 0
      return filterOptions
    }
  }
  ,
  mounted() {
    this.$nextTick(() => {
      this.idealWidth()
      if(this.default)this.selectOption(this.defaultIndexProp ? this.defaultIndexProp : this.defaultIndex)
      document.addEventListener("keyup", this.handlePageScroll);
    })
  },
  directives: {
    // ClickOutside
  },
  props: ['options','image_paths', 'name', 'default', 'defaultIndexProp'],
  template: `
  <div class="flex flex-wrap w-full">
    <div
      class="flex flex-wrap border border-gray-400 bg-white border-gray-200 rounded w-full font-medium text-base text-gray-800 items-center py-2 relative"
      id="dropdown"
      v-on:click="show = !show"
      @keyup.enter="selectOptionEvent"
    >
      <div class="flex w-full items-center px-3" @click="addFocus">
        <div class="flex w-6 mr-2" v-if="image_paths.length > 0">
          <img class="w-6" :src="imagePathByOption(selected.option)" v-show="showSelectedContent">
        </div>
        <div class="flex w-full mr-5" :style="{'min-width': defaultDropdownSize}">
          <div class="relative" :style="{'min-width': defaultDropdownSize}">
            <input
              type="text"
              v-model="search"
              @keyup="showSelectedContent = false, show = true, nextOption()"
              ref="search"
              class=" flex w-auto"
            />
            <span
              class="absolute left-0 pointer-events-none top-0"
              :style="{'min-width': defaultDropdownSize}"
              v-show="showSelectedContent"
            >
              {{selected.option[0]}}
            </span>
          </div>
        </div>
        <div class="flex absolute right-0 justify-end items-center align-middle border-l border-gray-400 pl-2 text-5px text-gray-400 h-5 mr-3">
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <div
        class="flex overflow-auto flex-wrap border bg-white border-gray-200 rounded w-full font-medium text-base text-gray-800 items-center py-1 absolute top-0 left-0 mt-12 z-50"
        v-show="show"
        ref="dropdownContent"
        style="max-height: 11rem;"
      >
        <div
          class="flex w-full py-1 text-gray-200 px-3"
          v-show="filterItems.length == 0"
        >
          <div class="flex w-full justify-center">
            No options
          </div>
        </div>
        <div
          class="flex w-full py-1 hover:bg-gray-200 px-3"
          :class="{'bg-gray-200': currentIndex == index}" @click="selectOption(indexByOption(option))"
          @mousemove="currentIndex = index"
          v-for="(option, index) in filterItems"
          ref="options"
        >
          <div class="flex w-6 mr-2" v-if="image_paths.length">
            <img class="w-6" :src="imagePathByOption(option)">
          </div>
          <div class="flex w-auto mr-5">
            {{option[0]}}
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})

document.addEventListener('turbolinks:load', function(){
  var element2 = document.querySelector('#dropdown2')
  if (element2 != undefined) {
    new Vue({
      el: element2,
      data: {
        option: []
      }
    })
  }
})
