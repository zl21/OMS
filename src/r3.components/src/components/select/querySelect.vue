<template>
  <div class="query-select">
    <label class="label" for="">{{itemdata.coldesc}}:</label>
    <div class="select-main" ref="combobox">
      <span class="selected-item">
        <i class="hidden">{{selectedValue}}</i>
        <em v-for="(item, index) in combobox" :key="index" v-if="item.value">
          {{item.limitdesc}}<i v-if="index < choosedNum - 0 - 1">,</i>
        </em>
        <em v-if="!hasChoosed">{{$t('tips.all')}}</em>
        <i @click="chooseAll()" class="clear-icon iconfont">&#xe6bb;</i>
        <i @click="dropMenu" :class="{'arrow-up':visible}" class="iconfont">&#xe616;</i>
      </span>
      <ul class="selected-box" :class="'selected-box'+itemdata.colname" v-show="visible">
        <li>
          <label @click="chooseAll()" for="">{{$t('tips.all')}}</label>
        </li>
        <li v-for="(item, index) in combobox" :key="index">
          <input @click.stop="changeInputVal(combobox, item)" type="checkbox" name="" :id="itemdata.colname+item.limitval" >
          <label :for="itemdata.colname+item.limitval">{{item.limitdesc}}</label>
        </li>
      </ul>
    </div>
   
  </div>
</template>

<script>
// import i18n from '../../assets/js/i18n'

export default {
  name: 'querySelect',
  data() {
    return {
      selectedValue: '',
      combobox: [],
      visible: false,
      choosedNum: 0
    }
  },
  props: {
    itemdata: {
      type: Object
    }
  },
  computed: {
    hasChoosed: function() {
      let self = this
      let hasChoosed = false
      self.choosedNum = 0
      if(self.selectedValue) {//为同步
        for (let i = 0; i < this.combobox.length; i++) {
          const element = this.combobox[i];
          if(element.value) {
            hasChoosed = true
            self.choosedNum = self.choosedNum + 1
          }
        }
      }
      
      return hasChoosed
    }
  },

  beforeCreate() {
  this.$t = $i18n.t.bind($i18n)
  },

  mounted() {
    let self = this

    self.$nextTick(function(){
      self.initCombobox()
      setTimeout(function(){
        self.getParams()
      },100)
    })
    

  },
  methods: {
    dropMenu() {
      this.visible ? this.hide() : this.show()
    },
    show () {
      this.visible = true
      document.addEventListener('click', this.hidePanel, false)
    },

    hide () {
      this.visible = false
      document.removeEventListener('click', this.hidePanel, false)
    },
    hidePanel (e) {

      if (!this.$refs.combobox.contains(e.target)) {
        this.hide()
      }
    },
    chooseAll() {
      this.clearChoose()
      this.$emit('getSelectedOption',{colname:this.itemdata.colname,value:[]})
    },
    clearChoose() {
      let self = this
      for (let i = 0; i < this.combobox.length; i++) {
        const element = this.combobox[i];
        self.$set(element,'value',false)
      }

      $('.selected-box'+self.itemdata.colname).find('input').prop('checked',false)
      self.resetSelectVal()
    },
    changeInputVal(combobox, item) {
      let self = this
      item.value = event.target.checked

      for (let i = 0; i < this.combobox.length; i++) {
        const element = this.combobox[i];
        if(element.limitdesc == item.limitdesc) {
          self.$set(element,'value',item.value)
        }
      }
      self.resetSelectVal()
      setTimeout(function(){
        self.getParams()
      },100)
      
      
      //self.emit('getSelectedParams',)
    },
    getParams() {
      let self = this
      let params = {}
      params[self.itemdata.colname] = []
      for (let i = 0; i < this.combobox.length; i++) {
        const element = this.combobox[i];
        if(element.value) {
          params[self.itemdata.colname].push('='+element.limitval)
        }
      }
      //self.$emit('getSelectedParams',params)
      this.$emit('getSelectedOption',{colname:this.itemdata.colname,value:params[self.itemdata.colname]})
    },
    resetSelectVal() {
      let self = this
      self.selectedValue = Math.random() //强制刷新视图，解决vue二次生成数据变化监听不到的问题
    },
    initCombobox () {
      let self = this
      this.combobox = this.itemdata.combobox
      this.combobox.forEach(function(item,index){
       
        if(self.itemdata.default === item.limitval) {
          item.value = true


          self.$nextTick(function(){

            $('.selected-box'+self.itemdata.colname).find('li').eq(index+1).find('input').prop('checked',true)
          })
          
          
        } else {
          item.value = false
        }
      })
      self.selectedValue = Math.random()
    }
    
  }
}
</script>

<style lang="less" scoped>
.query-select {
  .label {
    width: 90px;
    min-width: 90px !important;
    display: inline-block;
    text-align: right;
    height: 24px;
    line-height: 24px;
    position: absolute;
  }
  .select-main {
    display: inline-block;
    width: calc(~'100% - 96px');
    position: absolute;
    left: 93px;
    .selected-item {
      height: 24px;
      width: 100%;
      display: block;
      box-sizing: border-box;
      font-size: 12px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(191, 203, 191);
      border-image: initial;
      border-radius: 2px;
      padding: 0px 4px;
      em {
        color: #000;
        font-style: normal;
        i {
          margin-left: 2px;
          font-style: normal;
        }
      }
      .iconfont {
        position: absolute;
        right: 1px;
        width: 20px;
        height: 22px;
        line-height: 22px;
        font-size: 22px;
        cursor: pointer;
        background: #fff;
        color: rgb(191, 203, 191);
      }
      .iconfont.arrow-up {
        transform: rotate(-180deg);
        //transition: .2s;
      }
      .iconfont.clear-icon {
        right: 21px;
        width: 15px;
        font-size: 15px;
        background: #918f8f;
        color: #fff;
        border-radius: 2px;
        display: none;
      }
    }
    .selected-item:hover {
      background: rgba(0, 0, 0, 0.1);
      cursor: text;
      .iconfont.clear-icon {
        display: inline-block;
      }
    }
    ul {
      z-index: 1000;
      position: absolute;
      background: #fff;
      width: calc(~'100% - 14px');
      padding: 3px 6px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.12) 0px 0px 6px;
      // top: 0px;
      // left: 0px;
      min-width: 100px;
      margin: 5px 0px;
      border-width: 1px;
      border-style: solid;
      border-color: rgb(209, 219, 229);
      border-image: initial;
      li {
        height: 25px;
        line-height: 25px;
        cursor: pointer;
        input {
          cursor: pointer;
        }
        label {
          width: calc(~'100% - 20px');
          display: inline-block;
          cursor: pointer;
        }
      }
    }
  }
}
</style>


