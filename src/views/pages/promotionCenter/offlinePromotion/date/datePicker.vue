<template>
  <div class="ff-date--picker">
    <div class="ff-date--picker-head">
      <span class="ff-active--border" :style="{width: `${width}px`,transform: `translate(${width * sub}px)`}"></span>
      <ul ref="pickerUl">
        <li
          v-for="(list, index) of lists"
          class="ff-date--picker-li"
          :class="{'ff-label--active': sub === index}"
          @click="active(index)"
        >
          {{list.label}}
        </li>
      </ul>
      <div class="ff-date--time">
        <el-time-select
          placeholder="起始时间"
          v-model="startDate"
          size="mini"
          :editable="true"
          popper-class="ff-date--time-items"
          class="ff-date--time-picker"
          @change="dataChange"
          :picker-options="pickerOptions">
        </el-time-select>
        <span class="ff-date--time-span">至</span>
        <el-time-select
          placeholder="结束时间"
          v-model="endDate"
          size="mini"
          :editable="true"
          popper-class="ff-date--time-items"
          class="ff-date--time-picker"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '23:59',
            minTime: startDate
          }">
        </el-time-select>
      </div>
    </div>
    <div class="ff-date--picker-content">
      <div class="ff-date--picker--week" v-show="sub === 0">
        <ul class="ff-week--ul">
          <li
            v-for="(list, index) of week"
            class="ff-week--li"
            :class="{'ff-week--active': inputData.week.includes(list)}"
            @click="weekActive(list,index)"
          >{{list}}</li>
        </ul>
      </div>
      <div class="ff-date--picker--day" v-show="sub === 1">
        <ul class="ff-day--ul">
          <li
            v-for="(list, index) of day"
            class="ff-day--li"
            :class="{'ff-day--active': inputData.day.includes(list)}"
            @click="dayActive(list)"
          >{{list}}</li>
        </ul>
      </div>
    </div>
    <div class="ff-date--picker-footer">
      <div class="ff-date--choose" v-show="sub === 0">
        <label>
          <input type="radio" name="check" class="ff-date--choose-first" value="first" v-model="radio" />
          <span class="ff-date--choose-allSpan"></span>全选
        </label>
        <label>
          <input type="radio" name="check" class="ff-date--choose-second" value="second" v-model="radio" />
          <span class="ff-date--choose-allSpan"></span>反选
        </label>
      </div>
      <div class="ff-date--choose--day" v-show="sub === 1">
        <label>
          <input type="radio" name="checkDay" class="ff-date--choose-first" value="firstDay" v-model="radioDay" />
          <span class="ff-date--choose-allSpan"></span>全选
        </label>
        <label>
          <input type="radio" name="checkDay" class="ff-date--choose-second" value="secondDay" v-model="radioDay" />
          <span class="ff-date--choose-allSpan"></span>反选
        </label>
      </div>
      <button class="ff-date--picker-btn" @click="confirm">
        <span>确定</span>
      </button>
    </div>
  </div>
</template>
<style lang="less" scoped type="text/less">
  @active: #FD6442;
  @border-color: #D8D8D8;
  @bc-color: #FE6846;
  .ff-date--picker {
    font-size: 12px;
    color: #575757;
    .ff-date--picker-head {
      position: relative;
      box-sizing: border-box;
      padding-bottom: 2px;
      border-bottom: 1px solid @border-color;
      display: flex;
      height: 27px;
      .ff-label--active {
        color: @active;
      }
      .ff-active--border {
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 2px;
        background-color: @active;
        transition: transform .3s ease;
      }
      ul {
        flex: 2;
        align-items: center;
        display: flex;
        .ff-date--picker-li {
          flex: 1;
          text-align: center;
          cursor: pointer;
        }
      }
      .ff-date--time {
        flex: 3;
        margin-left: 37px;
        align-items: center;
        display: flex;
        .ff-date--time-span {
          margin: 0 8px;
          text-align: center;
        }
        .ff-date--time-picker {
          flex: 1;
          width: inherit;
        }
      }
    }
    .ff-date--picker-content {
      box-sizing: border-box;
      padding: 12px 0;
      height: 128px;
      .ff-day--ul, .ff-week--ul {
        display: flex;
        flex-wrap: wrap;
      }
      .ff-date--picker--week {
        .ff-week--li {
          margin-bottom: 8px;
          border-radius: 4px;
          cursor: pointer;
          padding: 3px;
          &:not(:nth-child(4n+0)) {
            margin-right: 36px;
          }
        }
      }
      .ff-date--picker--day {
        .ff-day--li {
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          width: 21px;
          margin-bottom: 8px;
          line-height: 20px;
          height: 20px;
          &:not(:nth-child(10n+0)) {
            margin-right: 4px;
          }
        }
      }
      .ff-day--active, .ff-week--active {
        background-color: @bc-color;
        color: #fff;
      }
    }
    .ff-date--picker-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .ff-date--choose, .ff-date--choose--day {
        display: flex;
        label {
          display: flex;
          align-items: center;
          &:first-child {
            margin-right: 16px;
          }
        }
        .ff-date--choose-first, .ff-date--choose-second {
          display: none;
        }
        .ff-date--choose-allSpan {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 4px;
          border-radius: 100%;
          border: 1px solid #D2D2D2;
          box-sizing: border-box;
          cursor: pointer;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            left: 2px;
            top: 2px;
            border-radius: 100%;
            background-color: #FE6846;
            transform: scale(0);
            transition: transform .2s ease;
          }
        }
        .ff-date--choose-first:checked + .ff-date--choose-allSpan, .ff-date--choose-second:checked + .ff-date--choose-allSpan{
          &::before {
            transform: scale(1);
          }
        }
      }
      .ff-date--picker-btn {
        outline: none;
        padding: 3px 7px;
        font-size: 12px;
        border-radius: 2px;
        color: @active;
        background-color: #fff;
        border: 1px solid @active;
        &:hover {
          opacity: .6;
          cursor: pointer;
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .ff-date--time-items {
    .time-select-item {
      font-size: 12px;
      padding: 8px 4px;
    }
  }
  .ff-date--time {
    .el-input--mini span{
      display: none;
    }
    .el-input--mini .el-input__inner {
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      padding-left: 0;
      padding-right: 0;
      text-align: center;
    }
    .el-input--mini .el-input__icon {
      line-height: 24px;
    }
  }
</style>
<script>
  export default {
    props: {
      inputData: Object,
      showPopover: Boolean,
      clear: Boolean,
      initialData: Object
    },
    data () {
      let day = [];
      for(let i = 1; i < 32; i++) {
        day.push(i)
      }
      return {
        pickerOptions: {
          start: '00:00',
          step: '00:15',
          end: '23:59'
        },//时间配置
        lists: [
          {
            label: '按周',
            type: 1
          },
          {
            label: '按天',
            type: 2
          },
        ],//lab列表
        sub: 0,//默认高亮下标
        width: 0,//高亮线的宽度
        startDate: '00:00',//开始时间
        endDate: '23:59',//结束事件
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        day: day,
        radio: '',//week默认选中
        radioDay: '',//day默认选中
      }
    },
    watch: {
      /*计算label的宽度*/
      showPopover (val) {
        if(val) {
          let width = this.$refs['pickerUl'].querySelectorAll('li')[0].clientWidth;
          this.width = width;
        }
      },
      /*week全选反选的控制*/
      radio (val) {
        let arr = [];
        let weekIndex=[];
        /*全选*/
        if(val === 'first') {
          /*刷选出没选中的*/
          this.inputData.week = [...this.week];
          this.inputData.weekIndex = [...this.week.map((obj,index) => index + 1)];
        }
        /*反选*/
        if(val === 'second') {
          arr = this.week.filter(n => !this.inputData.week.includes(n));
          weekIndex = this.week.map((obj,index) => {
            if(!this.inputData.week.includes(obj)) return index + 1;
            return false;
          }).filter(_ => _ !== false);
          this.inputData.week = [...arr];
          this.inputData.weekIndex = [...weekIndex];
        }
      },
      /*day全选反选的控制*/
      radioDay (val) {
        let arr = [];
        if(val === 'firstDay') {
          /*刷选出没选中的*/
          this.inputData.day = [...this.day];
        }
        if(val === 'secondDay') {
          arr = this.day.filter(n => !this.inputData.day.includes(n));
          this.inputData.day = [...arr];
        }
      },
      /*初始化*/
      clear (val) {
        if(val) {
          this.inputData.type = 1;
          this.inputData.day = [];
          this.inputData.week = [];
          this.inputData.weekIndex = [];
          this.startDate = '00:00';
          this.endDate = '23:59';
          this.radio = '';
          this.radioDay = '';
          this.$emit('update:clear', false);
        }
      },
      initialData (val) {
        this.startDate = val.Time.startDate;
        this.endDate = val.Time.endDate;
        this.sub = val.type - 1;
      }
    },
    methods: {
      /*tab高亮*/
      active (index) {
        this.sub = index;
        this.inputData.type = index + 1;
      },
      /*week点击高亮*/
      weekActive (list,index) {
        if(this.inputData.week.includes(list)) {
          this.inputData.week.splice(this.inputData.week.indexOf(list), 1);
          this.inputData.weekIndex.splice(this.inputData.weekIndex.indexOf(index + 1), 1);
        }else {
          this.inputData.week.push(list);
          this.inputData.weekIndex.push(index+1);
        }
        if(this.inputData.week.length !== this.week.length) this.radio = '';
      },
      /*day点击高亮*/
      dayActive (list) {
        if(this.inputData.day.includes(list)) {
          this.inputData.day.splice(this.inputData.day.indexOf(list), 1);
        }else {
          this.inputData.day.push(list);
        }
        if(this.inputData.day.length !== this.day.length) this.radioDay = '';
      },
      /*确认时间*/
      confirm () {
        let str = '';
        this.$emit('returnTime', {
          startDate: this.startDate,
          endDate: this.endDate
        })
        if(this.startDate === '00:00' && this.endDate === '23:59') {
          /*时间不变全选*/
          if(this.sub === 0) {
            if(this.inputData.week.length === this.week.length) {
              str = '每天';
              return this.$emit('confirm', str);
            }
            if(this.inputData.week.length > 0) {
              str = `每${this.inputData.week.join('、')}`;
              return this.$emit('confirm', str);
            }
          }
          if(this.sub === 1) {
            if(this.inputData.day.length === this.day.length) {
              str = '每天';
              return this.$emit('confirm', str);
            }
            if(this.inputData.day.length > 0) {
              str = `每月${this.inputData.day.join('、')}日`;
              return this.$emit('confirm', str);
            }
          }
        }else {
          /*时间变化全选*/
          if(this.sub === 0) {
            if(this.inputData.week.length === this.week.length) {
              str = `${this.startDate}至${this.endDate}`;
              return this.$emit('confirm', str);
            }
            if(this.inputData.week.length > 0) {
              str = `每${this.inputData.week.join('、')}${this.startDate}至${this.endDate}`;
              return this.$emit('confirm', str);
            }
          }
          if(this.sub === 1) {
            if(this.inputData.day.length === this.day.length) {
              str = `${this.startDate}至${this.endDate}`;
              return this.$emit('confirm', str);
            }
            if(this.inputData.day.length > 0) {
              str = `每月${this.inputData.day.join('、')}日${this.startDate}至${this.endDate}`;
              return this.$emit('confirm', str);
            }
          }
        }
        this.$emit('confirm', str);
      },
      /*当结束时间大于开始时间时,让结束时间等于开始时间*/
      dataChange (val) {
        if(val > this.endDate) {
          this.endDate = this.startDate;
        }
      },
    },
    mounted () {
    }
  }
</script>
