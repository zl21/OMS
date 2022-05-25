<template>
  <div class="config-items clearfix">
      <!-- {{selectConfigList}} -->
      <div class="input-item" v-for="(item, index) in selectConfigList" :key="index">

				<!-- <dialog-input
				v-if="item.display === 'OBJ_FK'"
				:item="item"
				v-on:getFkChooseItem="getFkChooseItem"
				v-on:deleteSelectParams="deleteSelectParams"
				v-on:getInputParams="getInputParams"
				v-on:selectConfigBlur="selectConfigBlur">

				</dialog-input> -->
				<!-- <div class="input-text"  v-if="item.display === 'OBJ_FK'">
					<label for="">{{item.coldesc}}:</label>
          <input type="text" v-model="item.value">
					<svg v-if="item.display === 'OBJ_FK'" class="ffish-icon more-items-icon" aria-hidden="true">
						<use xlink:href="#icon-danchuangduoxuan"></use>
					</svg>
				</div> -->
				<div class="input-checkbox" v-if="item.display === 'OBJ_CHECK'">
					<label for="">{{item.coldesc}}:</label>
          <input type="checkbox" v-model="item.value">
				</div>

				<div class="input-checkbox" v-else-if="item.display === 'OBJ_SELECT'">
					<my-select :itemdata="item" v-on:getSelectedParams="getSelectedParams" v-on:getSelectedOption="getSelectedOption"></my-select>
				</div>

				<dialog-input
				v-else
				:item="item"
				v-on:configInputEnter="configInputEnter"
				v-on:getFkChooseItem="getFkChooseItem"
				v-on:deleteSelectInput="deleteSelectInput"
				v-on:deleteSelectParams="deleteSelectParams"
				v-on:getInputParams="getInputParams"
				v-on:selectConfigBlur="selectConfigBlur">

				</dialog-input>

				<!-- <div class="input-text"  v-else>
					<label for="">{{item.coldesc}}:</label>
          <input @keyup="inputKeyUp(item,$event)" @keyup.enter="configInputEnter(item)" type="text" v-model="item.value">

				</div> -->

      </div>
  </div>
</template>

<script>

import mySelect from '../select/querySelect.vue'
import DialogInput from '../input/dialogInput.vue'


export default {
	data() {
		return {
			selectParams: ''
		}
	},
  props: {
    selectConfigList: {
      type: Array
    }
	},
	components: {
		mySelect,
		DialogInput
	},
	mounted() {
		// console.log('mounted')
		this.$emit('getSelectedOption',this.selectParams)
	},
	methods: {
		getSelectedParams(val) {
			this.selectParams = val
		},
		getFkChooseItem(val) {
			this.$emit('getFkChooseItem',val)
		},
		deleteSelectInput(val) {
			this.$emit('deleteSelectInput',val)
		},
		deleteSelectParams(val) {
			this.$emit('deleteSelectParams',val)
		},
		getInputParams(val) {

			this.$emit('getInputParams',val)
		},
		selectConfigBlur(){
			this.$emit('selectConfigBlur')
		},
		configInputEnter(item) {
			this.$emit('configInputEnter',item)
		},
		getSelectedOption(val) {
			this.$emit('getSelectedOption',val)
		},
		inputKeyUp(item) {
			// console.log('inputKeyUp')
      if(!item.value) {
        this.$emit('deleteSelectParams',item)
      }
    },

	}
}
</script>

<style lang="less" scoped>
.config-items {
	border: solid 1px #d8d8d8;
	margin-bottom: 10px;
	padding: 5px 0;
	font-size: 12px;
  .input-item {
    float: left;
    margin: 4px 0;
    height: 20px;
    line-height: 20px;
    position: relative;
    width: 32%;
		.popover-icon {
			right: 16px;
		}
		label {
			width: 90px;
			display: inline-block;
			text-align: right;
		}
		input {
			width: 140px;
			height: 18px;
			border-radius: 2px;
			border: 1px solid #bfcbd9;
			background: #fff;
		}
		input[type="checkbox"] {
			cursor: pointer;
		}
	}
	.more-items-icon {
		width: 14px;
		height: 14px;
	}
}
</style>

<style lang="less">
.config-items {
	.input-item {
		label.title {
			width:90px;
			display: inline-block;
      text-align: right;
		}
		.el-autocomplete {
			/*width: calc(~"100% - 10px") !important;*/
      width: 100%;
		}
	}
}
</style>

