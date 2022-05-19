<template>
  <div class="ShowTableData">
    <div v-if="id_name === 'first'" class="table-list">
      <table>
        <thead>
        <tr class="head-tr">
          <th>{{$t('tips.number')}}</th>
          <th v-for="(value,key,index) in table_head" v-if="key !== 'ID'">{{value}}</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(list,index) in table_data"
          :key="list.ID"
          @click="singleClick(list,list.ID,index)"
          @dblclick="check_change(list)"
          :class="{'ic-bc': l_sub.indexOf(list.ID) !== -1 }"
          @click.ctrl="CtrlClick(list,list.ID,index)"
          @click.shift="ShiftClick(list,list.ID,index)"
          v-if="validataOS() === 1"
        >
          <td>
            <!--<label :for="id_name+'-'+list.ID">
              <input type="checkbox" :id="id_name+'-'+list.ID" @change="check_change($event,list)" v-model="arr" :value="id_name+'-'+list.ID" />
              <span class="checked-box"></span>
              <span>{{index+1}}</span>
            </label>-->
            <span>{{currentPage*sizePage+index+1}}</span>
          </td>
          <td v-for="(value,key,index) in table_head" v-if="key !== 'ID'">{{list[key]}}</td>
        </tr>
        <tr
          v-for="(list,index) in table_data"
          :key="list.ID"
          @click="singleClick(list,list.ID,index)"
          :class="{'ic-bc': l_sub.indexOf(list.ID) !== -1}"
          @click.91="CtrlClick(list,list.ID,index)"
          @click.shift="ShiftClick(list,list.ID)"
          v-if="validataOS() === 2"
        >
          <td>
            <!--<label :for="id_name+'-'+list.ID">
              <input type="checkbox" :id="id_name+'-'+list.ID" @change="check_change($event,list)" v-model="arr" :value="id_name+'-'+list.ID" />
              <span class="checked-box"></span>
              <span>{{index+1}}</span>
            </label>-->
            <span>{{index+1}}</span>
          </td>
          <td v-for="(value,key,index) in table_head" v-if="key !== 'ID'">{{list[key]}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div @mouseout="r_sub=-1" v-if="id_name !== 'first'" class="table-list">
      <table>
        <thead>
        <tr class="head-tr">
          <th>{{$t('tips.number')}}</th>
          <th v-for="(value,key,index) in table_head" v-if="key !== 'ID'">{{value}}</th>
        </tr>
        </thead>
        <tbody key="seconds">
        <tr
          v-for="(list,index) in table_data"
          :key="list.ID"
          @mousemove="r_sub = list.ID"
          :class="{'ic-bc': r_sub == list.ID}"
        >
          <td>
            <!--<label :for="id_name+'-'+list.ID">
              <input type="checkbox" :id="id_name+'-'+list.ID" @change="check_change($event,list)" v-model="arr" :value="id_name+'-'+list.ID" />
              <span class="checked-box"></span>
              <span>{{index+1}}</span>
            </label>-->
            {{currentPage*sizePage+index+1}}
          </td>
          <td v-for="(value,key,index) in table_head" v-if="key !== 'ID'">{{list[key]}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="table-exclude" @mouseout="r_sub=-1" v-if="id_name !== 'first'"
         :style="{right: !table_data? '0px':table_data.length>14? '15px': '0px' }"> -->
      <!--<ul>
        <li v-for="(list,index) in table_data"
            :class="{'ic-bc': r_sub == table_data[index].ID}"
            @mousemove="r_sub = table_data[index].ID">
          <i class="iconfont" v-if="r_sub != table_data[index].ID">&#xe638;</i>
          <i class="iconfont icon-color" v-if="r_sub == table_data[index].ID" @click="excludeItems(table_data[index])">&#xe6b4;</i>
        </li>
      </ul>-->
      <!-- <table>
        <thead>
        <tr>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(list,index) in table_data"
          :class="{'ic-bc': r_sub == table_data[index].ID}"
          @mousemove="r_sub = table_data[index].ID"
          @mouseenter="r_sub = table_data[index].ID"
        >
          <td>
            <i class="iconfont" v-if="r_sub != table_data[index].ID">&#xe638;</i>
            <i class="iconfont icon-color" v-if="r_sub == table_data[index].ID"
               @click="excludeItems(table_data[index])">&#xe6b4;</i>
          </td>
        </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ShowTableData {
    width: 100%;
    font-size: 12px;
    overflow: auto;
    user-select: none;
    color: #575757;
    .table-list {
      height: 370px;
    }
    .table-list table {
      min-width: 100%;
    }
    .table-list td, .table-list th {
      border-bottom: 1px solid #d8d8d8;
      min-width: 100px;
      font-weight: normal;
      vertical-align: middle;
      text-align: left;
      padding: 0 10px;
      white-space: nowrap;
    }
    .table-list th {
      /*line-height: 26px;*/
      height: 26px;
      background-color: #F5F6FA;
    }
    .table-list td {
      height: 23px;
    }
    tbody tr:hover {
      background-color: #F8F7F7;
    }
    /*input[type=checkbox] {
      display: none;
    }*/
    /*.checked-box {
      display: inline-block;
      width: 12px;
      height: 12px;
      box-sizing: border-box;
      border-radius: 2px;
      margin-top: -3px;
      color: #D8D8D8;
      border: 1px solid;
      transition: color .25s cubic-bezier(.71,-.46,.88,.6),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
      vertical-align: middle;
      &::after {
         display: inline-block;
         box-sizing: content-box;
         content: "";
         border: 1px solid #fff;
         border-left: 0;
         border-top: 0;
         height: 6px;
         left: 3px;
         position: absolute;
         top: 1px;
         transform: rotate(45deg) scaleY(0);
         width: 3px;
         transition: transform .25s cubic-bezier(.71,-.46,.88,.6);
         transform-origin: center;
      }
    }*/
    /*input[type=checkbox]:checked+.checked-box {
      color: #0F8EE9;
      background-color: #0F8EE9;
      position: relative;
      &::after {
         transform: rotate(45deg) scaleY(1);
      }
    }*/
    .table-exclude {
      position: absolute;
      overflow: hidden;
      width: 30px;
      background-clip: content-box;
      height: 370px;
      right: 16px;
      top: 34px;
      table {
        width: 100%;
      }
      td, th {
        border-bottom: 1px solid #d8d8d8;
        font-weight: normal;
        vertical-align: middle;
        text-align: center;
        padding: 0 10px;
      }
      th {
        height: 26px;
      }
      td {
        height: 23px;
      }
      i {
        cursor: pointer;
        font-size: 14px;
      }
      .icon-color {
        color: #e6502f;
      }
      /*li {
        line-height: 24px;
        height: 24px;
        font-size: 12px;
        box-sizing: border-box;
        border-bottom: 1px solid #D8D8D8;
        text-align: center;

      }*/
    }
    tbody tr {
      background-color: #fff;
    }
    .ic-bc {
      background-color: #F8F7F7;
    }
  }
</style>
<script>
  import i18n from '../../../assets/js/i18n'

  export default {
    name: 'ShowTableData',
    props: {
      table_head: Object,
      table_data: Array,
      id_name: String,
      table_checked: Array,
      currentPage: [Number, String],
      sizePage: [Number, String]
    },
    data() {
      return {
        arr: [],
        r_sub: -1,//鼠标移动高亮下标
        r_click_id: 0,//点击id
        l_sub: [],//鼠标移动高亮下标
        val_arr: [],//保存单击和ctrl+click多选的列表
        ctrl: false,//初始化可以单击事件
        shift: false,//只有按住shift时才激活
      }
    },
    methods: {
      check_change(list) {
        console.log(2222)
        this.$emit('center_change', list);
        /*console.log(e.target.checked)
        this.$emit('checked_change',this.arr);*/
        /*if(this.id_name === 'first'){
          if(e.target.checked)this.$emit('center_change',list);
        }*/
      },//双击
      singleClick(val, id, index) {
        if (this.ctrl || this.shift) return //为true表示不执行
        console.log('click')
        this.r_click_id = index;
        this.$set(this, 'l_sub', []);
        this.$set(this, 'val_arr', []);
        this.$nextTick(() => {
          this.l_sub.push(id);
          this.val_arr.push(val);
          this.$emit('single', this.val_arr);
        })
        console.log(this.l_sub, this.val_arr)
      },//单个点击
      CtrlClick(val, id, index) {
        console.log('ctrl || shift')
        if (!this.ctrl || this.shift) return
        this.r_click_id = index;
        if (this.l_sub.includes(id)) {//如果已经存在则不用push,相反取消
          let a = this.l_sub.findIndex(n => n === id);
          let b = this.val_arr.findIndex(n => n.ID === id);
          this.l_sub.splice(a, 1);
          this.val_arr.splice(b, 1);
        } else {
          this.l_sub.push(id);
          this.val_arr.push(val);
        }
        this.$emit('single', this.val_arr);
      },//ctrl+click
      ShiftClick(val, id) {
        let _this = this;
        if (this.ctrl || !this.shift) return
        this.$set(this, 'l_sub', []);
        this.$set(this, 'val_arr', []);
        let a = this.table_data.findIndex(n => n.ID === id);//找出点击的这个在列表中的位置
        let b = _this.r_click_id;//上一个点击的这个在列表中的位置
        if (a < b) {
          for (let i = a; i <= b; i++) {
            if (!this.l_sub.includes(this.table_data[i].ID)) {//如果已经存在则不用push,相反取消
              this.l_sub.push(this.table_data[i].ID);
              this.val_arr.push(this.table_data[i]);
            }
          }
        } else if (a > b) {
          for (let i = b; i <= a; i++) {
            if (!this.l_sub.includes(this.table_data[i].ID)) {//如果已经存在则不用push,相反取消
              this.l_sub.push(this.table_data[i].ID);
              this.val_arr.push(this.table_data[i]);
            }
          }
        } else {
          this.l_sub.push(id);
          this.val_arr.push(val);
        }
        /*this.r_click_id = id;*/
        this.$emit('single', this.val_arr);
      },
      excludeItems(val) {
        /*this.r_click_sub = val.ID;//高亮*/
        this.$emit('center_change', val);
      },//确定排除项
      validataOS() {
        if (navigator.userAgent.indexOf("Windows") > 0) {
          return 1;
        } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {
          return 2;
        } else if (navigator.userAgent.indexOf("Linux") > 0) {
          return 3;
        } else {
          return false;
        }
      }
    },
    watch: {
      table_data(a, b) {
        this.r_click_id = 0;//初始化点击
      }
    },

    beforeCreate() {
      this.$t = i18n.t.bind(i18n)
    },

    mounted() {
      let _this = this;
      let systemOs = this.validataOS();
      this.$el.addEventListener('scroll', () => {
        let scrolltop = _this.$el.scrollTop;
        _this.$el.children[1].scrollTop = scrolltop;
      })
      if (systemOs === 1) {
        window.addEventListener('keydown', function (event) {
          let ev = event;
//          console.log(ev.keyCode)
          if (ev.keyCode === 17) {
            _this.ctrl = true;//不做单击事件
          } else if (ev.keyCode === 16) {
            _this.shift = true;
          }
        })
        window.addEventListener('keyup', function (event) {
          let ev = event;
          if (ev.keyCode === 17) {
            _this.ctrl = false;//可以做单击事件
          } else if (ev.keyCode === 16) {
            _this.shift = false;
          }
        })
      } else if (systemOs === 2) {
        window.addEventListener('keydown', function (event) {
          let ev = event;
//          console.log(ev.keyCode)
          if (ev.keyCode === 91) {
            _this.ctrl = true;//不做单击事件
          } else if (ev.keyCode === 16) {
            _this.shift = true;
          }
        })
        window.addEventListener('keyup', function (event) {
          let ev = event;
          if (ev.keyCode === 91) {
            _this.ctrl = false;//可以做单击事件
          } else if (ev.keyCode === 16) {
            _this.shift = false;
          }
        })
      }
      //console.log(this.$el.children[1])
    }
  }
</script>
