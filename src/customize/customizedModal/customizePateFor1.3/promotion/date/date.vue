<template>
  <div class="ff-date-component">
    <el-popover
      placement="bottom-end"
      :width="width"
      trigger="manual"
      :value="showPopover"
      :append-to-body="appendToBody"
    >
      <div class="ff-date-box" @click.stop="">
        <date-picker
          :input-data="inputData"
          :showPopover="showPopover"
          :clear.sync="clear"
          :initialData="initialData"
          @confirm="confirm"
          @returnTime="returnTime"
        >
        </date-picker>
      </div>
      <div
        class="ff-date-input-box"
        ref="dateBox"
        slot="reference"
      >
        <!--<label class="ff-date-label"><i class="ff-date-notNull">*</i>{{label}}:</label>-->
        <div
          class="ff-date--input-div"
          :class="inputValue && !disabled? 'ff-close-icon' : ''"
        >
          <input
            type="text"
            readonly
            class="ff-date-input"
            v-model="inputValue"
            @click.stop="popoverShow"
            :title="inputValue"
          />
          <i
            class="ff-date-icon el-icon-date"
            @click.stop="popoverShow"
          ></i>
          <i
            class="ff-date-icon el-icon-circle-close"
            @click="clearDate"
          ></i>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-date-component {
    width: 100%;
    .ff-date-input-box {
      font-size: 12px;
      color: #575757;
      height: 24px;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      display: flex;
      outline: none;
      .ff-date-notNull {
        color: #E80000;
        margin: -2px 1px 0 0;
      }
      .ff-date-label {
        width: 60px;
      }
      .ff-date--input-div {
        flex: 1;
        height: 100%;
      }
      .ff-date-input {
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px 0 5px;
        height: 100%;
        color: #575757;
        background:rgba(252, 247, 241, 1);
        border-radius: 2px;
        border:1px solid rgba(216, 216, 216, 1);
      }
      .ff-date-icon {
        position: absolute;
        width: 20px;
        height: 100%;
        font-size: 14px;
        cursor: pointer;
        color: #0F8EE9;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .el-icon-circle-close {
        display: none;
      }
      .ff-close-icon:hover .el-icon-date {
        display: none;
      }
      .ff-close-icon:hover .el-icon-circle-close {
        display: flex;
      }
    }
  }
</style>
<style lang="less" scoped type="text/less">
  .ff-date-box {
    width: 252px;
    padding: 12px;
  }
</style>
<script>
  /*v-model='XXXX'控制下拉框*/
  import DatePicker from './datePicker.vue'
  export default {
    props: {
      initialData: {},//初始input数据
      appendToBody: {
        type: Boolean,
        default: true
      },//控制内控插入的地方
      label: {
        type: String,
        default: () => ''
      },//label
      value: Boolean,//控制显示
      disabled: Boolean,//是否禁用
      activities: String,//默认在input中显示的时间
      /*inputData: {
        type: Array,
        default: () => []
      },//传给后端的值*/
    },
    components: {
      DatePicker
    },
    data () {
      return {
        value2: new Date(2016, 9, 10, 18, 40),
        showPopover: false,//控制显示
        inputValue: '',//显示在input中的内容
        inputData: {
          type: 1,//1、按周 2、按月
          day: [],//天
          week: [],//周
          weekIndex:[],
        },
        width: 0,//下拉框的宽度
        clear: false,//是否清空
      }
    },
    watch: {
      activities: {
        immediate: true,//侦听开始之后被立即调用
        handler(val) {
          this.inputValue = val;
          this.$emit('update:activities', val);
          this.$emit('change', val);
        }
      },
      inputValue (val) {
        this.$emit('update:activities', val);
        this.$emit('change', val);
      },
      value: {
        immediate: true,//侦听开始之后被立即调用
        handler(val) {
          this.showPopover = val;
          this.$emit('input', val);
        }
      },
      showPopover(val) {
        if (this.disabled) return;
        this.$emit('input', val);
      },
      initialData (val) {
        let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        let obj = {};
        Object.keys(val).map((data) => {
          if(data === 'time') return;
          if(data === 'week') return obj[data] = val.weekIndex.map((obj) => week[obj - 1]);
          return obj[data] = this.initialData[data]
        }).filter(_ => _);
        this.inputData = obj;
      }
    },
    methods: {
      /*控制date选择box显示*/
      popoverShow () {
        if(this.disabled) return;
        this.width = this.$refs['dateBox'].clientWidth < 330? 330 : this.$refs['dateBox'].clientWidth;
        this.showPopover = true;
      },
      /*关闭dateBox*/
      closePopover () {
        this.showPopover = false;
      },
      /*清空input数据*/
      clearDate () {
        this.inputValue = '';//清空值
        this.clear = true;
      },
      /*确定时间*/
      confirm (val) {
        this.showPopover = false;
        this.inputValue = val;
        this.$emit('saveData',this.inputData)
      },
      /*具体时间*/
      returnTime (val) {
        this.$emit('returnTime', val);
      }
    },
    mounted () {
      document.addEventListener('click', this.closePopover);
    },
    beforeDestroy () {
      document.removeEventListener('click', this.closePopover);
    }
  }
</script>
