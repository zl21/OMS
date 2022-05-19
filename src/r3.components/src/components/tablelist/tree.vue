<template>
  <div class="dislogtree">
  	<div class="node" v-for="(item, index) in tree_lists" :key="index">
  		<li class="title">
        <i class="iconfont" @click="nodeChange(index)">&#xe635;</i>
        <label>
          <input type="checkbox" @change="select_checked($event,index)" :checked="item.checked.length === item.VALUE.length && item.checked.length !== 0" />
          <span>{{item.NAME}}</span>
        </label>
      </li>
      <div v-if="item.show" class="dislogtreebox">
        <ul style="display: none">
          <li v-for="(temp, index2) in item.VALUE" :key="index2">
            <label :for="index+'-id-'+index2">
              <input type="checkbox" name="" :value="temp.ID" :data-id="temp.ID" :id="index+'-id-'+index2" @change="check_change(index,index2)" :checked="temp.ischecked" />
              <!--v-model="item.checked"-->
              <!--<span class="checked-box"></span>-->
              <span>{{temp.NAME}}</span>
            </label>
          </li>
        </ul>
      </div>
  	</div>
  </div>
</template>

<script>/*type="ecmascript-6"*/
import axios from 'axios'
    export default {
      props: {
        tree_lists: Array
      },
    	data () {
    		return {
    			resultObj: {}
    		}
    	},
    	methods: {
    		nodeChange (index) {
    			/*let _self = this
          this.tree_lists[index].show = true;
    			this.$nextTick(()=> {
            let flag = $('.dislogtree ul').eq(index).css('display')
            console.log($('.dislogtree ul').eq(index))
            if(flag == 'none'){
              $('.dislogtree ul').eq(index).slideDown()
              $('.dislogtree .title').eq(index).find('i').css('transform','rotate(90deg)')
            }else{
              $('.dislogtree ul').eq(index).slideUp()
              $('.dislogtree .title').eq(index).find('i').css('transform','rotate(0deg)')
            }
          })*/
          // console.log(flag)
          /*if(!this.tree_lists[index].show) $('.dislogtree ul').eq(index).css('display','none');*/
          this.tree_lists[index].show = true;
          this.$nextTick(() => {
            let flag = $(`.dislogtree .node:eq(${index}) .dislogtreebox ul`).css('display');
            if(flag == 'none'){
              $(`.dislogtree .node:eq(${index}) .dislogtreebox ul`).slideDown();
              $('.dislogtree .title').eq(index).find('i').css('transform','rotate(90deg)')
            }else{
              $(`.dislogtree .node:eq(${index}) .dislogtreebox ul`).slideUp();
              $('.dislogtree .title').eq(index).find('i').css('transform','rotate(0deg)')
            }
          })
    		},
        select_checked (e,index) {
          if(e.target.checked){
            this.tree_lists[index].checked = [...this.tree_lists[index]['VALUE'].map(obj => obj.ID)]
            this.tree_lists[index]['VALUE'].forEach((n) => {
              n.ischecked = true;
            })
          }else {
            this.tree_lists[index].checked = [];//先清空
            this.tree_lists[index]['VALUE'].forEach((n) => {
              n.ischecked = false;
            })
          }
          this.$emit('tree_change',this.tree_lists);
        },//全选这个类别下面的
        check_change (a,b) {
          this.tree_lists[a]['VALUE'][b].ischecked = !this.tree_lists[a]['VALUE'][b].ischecked;
          if(this.tree_lists[a]['VALUE'][b].ischecked){
            this.tree_lists[a].checked.push(this.tree_lists[a]['VALUE'][b].ID)
          }else {
            let index = this.tree_lists[a].checked.findIndex( n => n === this.tree_lists[a]['VALUE'][b].ID)//找到这个并删除
            this.tree_lists[a].checked.splice(index,1);
          }
    		  this.$emit('tree_change',this.tree_lists);
        },
    	}
    }
</script>

<style lang="less">
    .dislogtree{
      height: 100%;
      user-select: none;
    	.node{
    		font-size: 12px;
    		margin-bottom: 2px;
    		.title{
    			height: 24px;
    			line-height: 24px;
    			background-color: #f8f8f8;

    			i{
    				  font-size: 18px;
    					display: inline-block;
    			}

    			span{
    				display: inline-block;
            width: 100px;
    				height: 24px;
    				line-height: 24px;
				    vertical-align: top;
    			}

    			&:hover{
    				cursor: pointer;
    			}
    		}

    		ul{
    			li{
    				line-height: 18px;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
    				padding: 4px 0;
    				input[type=checkbox]{
              /*display: none;*/
    					margin-left: 21px;
    					margin-right: 2px;
              vertical-align: middle;
              margin-top: -2px;
    				}
            .checked-box {
              display: inline-block;
              width: 12px;
              height: 12px;
              box-sizing: border-box;
              border-radius: 2px;
              margin: -3px 6px 0 16px;
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
            }
            input[type=checkbox]:checked+.checked-box {
              color: #0F8EE9;
              background-color: #0F8EE9;
              position: relative;
              &::after {
                 transform: rotate(45deg) scaleY(1);
              }
            }
    			}
    		}
    	}
    }
</style>
