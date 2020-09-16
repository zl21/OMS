<!--选择标签弹框-->
<template>
  <div class="ff-guide-tag-pop">
    <div class="ff-tag-pop-choose-box">
      <h5 class="ff-tag-pop-title">
        标签分类
      </h5>
      <div class="ff-tag-pop--choose">
        <div class="ff-tag-pop--choose-summarize">
          <ul>
            <li
              v-for="(list, index) in tagSums"
              v-show="list.isShow"
              :class="{ 'ff-tag-pop--choose-active': index === sub }"
              @click="scrollTag(index)"
            >
              {{ list.title }}
            </li>
          </ul>
        </div>
        <div class="ff-tag-pop--choose-lists">
          <div
            ref="chooseBox"
            class="ff-tag-pop--choose-lists-scroll-box"
          >
            <ul>
              <li
                v-for="(list, index) in tagSums"
                v-show="list.isShow"
                :key="index"
                :ref="'chooseScroll' + index"
                class="ff-tag-pop--choose-lists-some"
              >
                <h5>{{ list.title }}</h5>
                <ul>
                  <li
                    v-for="(tag, sub) in list.tags"
                    v-show="tag.isShow"
                    :class="{ 'ff-tag-pop--active-some': tag.checked }"
                    @click="chooseTag(tag, index)"
                  >
                    {{ tag.label }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="ff-tag-pop--choose-lists-search">
            <div class="ff-guide-tag-autocomplete-box">
              <el-autocomplete
                ref="autocompleteBox"
                v-model="searchResult"
                size="mini"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @keyup.enter.native="searchTag($event)"
                @select="handleSelect"
              >
                <template slot="prepend">
                  搜索
                </template>
                <i
                  slot="suffix"
                  class="el-icon-search el-input__icon"
                  @click="searchTag"
                />
              </el-autocomplete>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ff-tag-pop-lists-box">
      <div class="ff-tag-pop-lists--title">
        <span>已选中 (
          <i class="ff-tag-pop-lists--count">{{ lists.length }}</i> )</span>
        <i
          class="iconfont ff-tag-pop-lists--clear"
          @click="clearList"
        >&#xe61e;</i>
      </div>
      <div class="ff-tag-pop-lists--tags">
        <ul>
          <li v-for="(list, index) in lists">
            <span class="ff-tag-pop-lists--tags--name">{{ list.label }}</span>
            <span
              class="ff-tag-pop-lists--tags-hover"
              @click="deleteOne(list, index)"
            >
              <i class="iconfont">&#xe9f5;</i>
              <i class="iconfont">&#xe80b;</i>
            </span>
          </li>
        </ul>
      </div>
      <div class="ff-tag-pop-lists-btns">
        <button
          class="ff-tag-pop-lists--confirm ff-tag-pop-lists--btn"
          @click="confirm"
        >
          确定
        </button>
        <button
          class="ff-tag-pop-lists--cancel ff-tag-pop-lists--btn"
          @click="cancel"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped type="text/less">
@border-color: #dedede;
@font-color: #575757;
@active-color: #ff623f;
.box () {
  border: 1px solid @border-color;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 5px 10px 0;
}
.ff-guide-tag-pop {
  width: 770px;
  color: @font-color;
  display: flex;
  .ff-tag-pop-choose-box {
    .box();
    margin-right: 10px;
    .ff-tag-pop-title {
      padding: 8px 0;
      border-bottom: 1px solid @border-color;
    }
    .ff-tag-pop--choose {
      height: 427px;
      display: flex;
      .ff-tag-pop--choose-summarize {
        min-width: 120px;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        border-right: 1px solid @border-color;
        padding: 10px 10px 0 0;
        li {
          min-width: 90px;
          padding: 8px 17px;
          box-sizing: border-box;
          margin-bottom: 2px;
          cursor: pointer;
        }
        .ff-tag-pop--choose-active {
          color: #fff;
          background-color: @active-color;
        }
      }
      .ff-tag-pop--choose-lists {
        height: 100%;
        min-width: 408px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .ff-tag-pop--choose-lists-scroll-box {
          padding: 10px 0 0 10px;
          overflow-y: auto;
          border-bottom: 1px solid #dcdcdc;
          flex: 1;
        }
        .ff-tag-pop--choose-lists-some {
          h5 {
            padding: 7px 0 4px 9px;
            background-color: #f5f6fa;
            /*width: 306px;*/
            box-sizing: border-box;
          }
          ul {
            padding: 15px 0 5px;
            overflow: hidden;
            li {
              width: 80px;
              border-radius: 2px;
              box-sizing: border-box;
              border: 1px solid #dcdcdc;
              text-align: center;
              float: left;
              padding: 6px 0;
              margin: 0 10px 10px 0;
              cursor: default;
              &:hover {
                opacity: 0.7;
              }
            }
            .ff-tag-pop--active-some {
              color: @active-color;
              border-color: @active-color;
              &:hover {
                opacity: 1;
              }
            }
          }
        }
        .ff-tag-pop--choose-lists-search {
          position: relative;
          height: 44px;
          padding: 10px 0 10px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
  .ff-tag-pop-lists-box {
    .box();
    min-width: 210px;
    .ff-tag-pop-lists--title {
      border-bottom: 1px solid @border-color;
      padding: 8px 0 4px;
      span {
        display: inline-block;
        padding-bottom: 5px;
      }
      .ff-tag-pop-lists--count {
        font-style: normal;
        color: @active-color;
      }
      .ff-tag-pop-lists--clear {
        color: @active-color;
        font-size: 15px;
        float: right;
        cursor: pointer;
      }
    }
    .ff-tag-pop-lists--tags {
      overflow-y: auto;
      height: 381px;
      li {
        line-height: 24px;
        padding: 0 10px;
        display: flex;
        background-color: #f5f6fa;
        justify-content: space-between;
        margin-top: 6px;
        &:last-child {
          margin-bottom: 6px;
        }
        .ff-tag-pop-lists--tags--name {
          color: #34a5ed;
        }
        .ff-tag-pop-lists--tags-hover {
          .iconfont {
            font-size: 14px;
            cursor: default;
          }
          .iconfont:first-child {
            color: #dedede;
          }
          .iconfont:last-child {
            display: none;
          }
          &:hover {
            .iconfont:last-child {
              color: #e80000;
              display: inherit;
            }
            .iconfont:first-child {
              display: none;
            }
          }
        }
      }
    }
    .ff-tag-pop-lists-btns {
      border-top: 1px solid @border-color;
      padding: 10px 0;
      text-align: right;
      .ff-tag-pop-lists--btn {
        padding: 3px 8px;
        border-radius: 2px;
        border: 1px solid #fd6442;
        &:hover {
          opacity: 0.6;
        }
      }
      .ff-tag-pop-lists--confirm {
        color: #fff;
        background-color: #fd6442;
      }
      .ff-tag-pop-lists--cancel {
        color: #fd6442;
        background-color: #fff;
      }
    }
  }
}
</style>
<style lang="less" type="text/less">
.ff-guide-tag-pop {
  .ff-tag-pop--choose-lists-search {
    .el-input--mini .el-input__inner {
      height: 24px;
      line-height: 24px;
    }
    .el-input--mini .el-input__icon {
      line-height: 24px;
    }
    .el-input-group--prepend .el-input__inner,
    .el-input-group__append {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .ff-guide-tag-autocomplete-box {
    width: 100%;
    box-sizing: border-box;
    .el-autocomplete {
      width: 100%;
      .el-input-group__prepend {
        background-color: #fff;
      }
    }
  }
}
</style>
<script>
  /* 已选子标签之间通过数据获取不通过父组件传递 */
  import $http from 'framework/__utils__/request';
  import store from '@/config/store/store';

  export default {
    props: {
      /* tagList: Array,//已选标签组数据 */
      rowArr: {
        type: Array,
        default: () => []
      }, // 列表界面明细
      objid: {
        default: ''
      },
      idArr: {
        type: Array,
        default: () => []
      },
      tablename:'' ,
      hasRequest: {
        type: Boolean,
        default: true
      }, // 点确定是否需要调用接口
      vipId: {}, // 会员id
      accId: {}, // 会员卡id
      tagLists: {
        type: Array,
        default: () => []
      }, // 选中的列表(只在没有保存接口的时候有)
      noPort: {
        type: Boolean,
        default: false
      }// 表示没有保存接口，直接将选中值往上抛
    },
    data() {
      return {
        tagSums: [], // 总标签结合
        sub: 0, // 选中的标签分组
        lists: [], // 标签集合
        searchResult: '', // 搜索字段
        VP_C_VIP_ID: '', // 会员ID
        VP_C_VIP_ACC_ID: '', // 会员卡ID
      };
    },
    methods: {
      /* 选择模糊值 */
      handleSelect(val) {
        this.searchResult = val.value;
      },
      /* 模糊搜索 */
      querySearchAsync(string, cb) {
        const arr = [];
        if (string.trim() === '') return cb(arr);
        this.tagSums.map((obj) => {
          obj.tags.map((data) => {
            if (data.label.includes(string.trim())) { 
              arr.push({
                value: data.label
              }); 
            }
          });
        });
        cb(arr);
      },
      /* 选择标签 */
      chooseTag(item, index) {
        item.checked = !item.checked;
        if (item.checked) {
          if (!this.lists.find(data => data.label === item.label)) { 
            this.lists.push({
              tagId: item.tagId, // 子标签ID
              titleID: this.tagSums[index].titleId, // 标签组ID
              label: item.label // 子标签名
            }); 
          }
        } else {
          this.lists = this.lists.filter(n => n.label !== item.label);
        }
      },
      /* 删除某一个 */
      deleteOne(item, index) {
        let i = 0;
        this.lists.splice(index, 1);
        while (i < this.tagSums.length) {
          console.log(i);
          const tags = this.tagSums[i].tags;
          for (let j = 0; j < tags.length; j++) {
            if (tags[j].label === item.label) return this.$set(tags[j], 'checked', false);
          }
          i++;
        }
      },
      /* 清空选中标签 */
      clearList() {
        this.lists = [];
        const arr = this.tagSums.map((obj) => {
          const data = obj.tags.map(tag => Object.assign(tag, {
            checked: false
          }));
          return Object.assign(obj, {
            tags: data
          });
        });
        this.tagSums = arr;
      },
      /* 搜索标签 */
      searchTag(event) {
        if (event) this.$refs.autocompleteBox.$refs.suggestions.showPopper = false;
        const empty = this.searchResult.trim() === ''; // 判断是否为空
        const arr = this.tagSums.map((obj) => {
          let isShow = false;
          const data = obj.tags.map((tag) => {
            let bl;
            // 搜索字段不为空
            if (!empty) {
              bl = tag.label.includes(this.searchResult); // 根据字标签名称匹配
              if (bl) isShow = true; // 判断标签组不隐藏
            }
            return Object.assign({}, tag, {
              isShow: !!(empty || bl) // 与搜索的不匹配隐藏
            });
          });
          return Object.assign({}, obj, {
            isShow: !!(empty || isShow), // 搜索字段为空则全部显示否则根据isShow来判断是否要显示
            tags: data
          });
        });
        this.tagSums = arr;
        if (empty) { 
          this.$nextTick().then(() => {
            this.scrollTag(this.sub);
          }); 
        }
      },
      /* 选择标签组 */
      scrollTag(index) {
        this.sub = index;
        const chooseBox = this.$refs.chooseBox;
        let scrollTop;
        let timer;
        const scrollAnimation = function () {
          cancelAnimationFrame(timer);
          scrollTop += (0 - scrollTop) / 2;
          // 临界判断，终止动画
          if (Math.abs(scrollTop) < 1) return;
          chooseBox.scrollTop += scrollTop;
          timer = requestAnimationFrame(scrollAnimation);
        };
        const top = this.$refs[`chooseScroll${index}`][0].offsetTop - this.$refs.chooseBox.offsetTop;
        scrollTop = top - chooseBox.scrollTop;
        scrollAnimation();
      },
      /* 确定 */
      confirm() {
        const arr = this.lists.map(obj => obj.label);// 已选子标签集合
        if (this.noPort) return this.$emit('tag-confirm', arr);
        $http({
          url: '/p/cs/cvipTagStickSave',
          method: 'post',
          data: {
            param: JSON.stringify({
              isSingle: this.idArr.length === 0 ? 1 : 0, // 单对象还是列表
              VP_C_VIP_ID: this.VP_C_VIP_ID, // 会员id或id集合
              VP_C_VIP_ACC_ID: this.VP_C_VIP_ACC_ID, // 会员卡id或id集合
              VP_C_TAG_ID: arr.join(',')// 已选子标签ID集合
            })
          }
        }).then((res) => {
          const data = res.data;
          if (data.code === 0) {
            this.$message({
              message: '贴标签成功！',
              center: true,
              type: 'success'
            });
            this.$emit('tag-confirm');// 关闭自定义弹框
          } else {
            // 用于列表报错
            this.$emit('uploadError', data.data);
            store.commit('errorDialog', { // 其它报错
              message: data.message
            });
            this.$emit('tag-cancel');
          }
          this.$emit('closeActionDialog'); // 标准列表界面和单对象界面关闭弹框
          this.$emit('refreshData');// 刷新列表和单对象界面
        }).catch(() => {
          this.$emit('closeActionDialog'); // 标准列表界面和单对象界面关闭弹框
          this.$emit('refreshData');// 刷新列表和单对象界面
          this.$emit('tag-cancel');
        });
      },
      /* 取消 */
      cancel() {
        this.$emit('tag-cancel'); // 自定义组件关闭弹框
        this.$emit('closeActionDialog'); // 关闭动作定义弹框
      },
      /* 获取标签组信息和已选标签 */
      getTags() {
        $http({
          url: '/p/cs/vipTagSearch',
          method: 'post',
          data: {
            param: JSON.stringify({
              isSingle: this.idArr.length === 0 ? 1 : 0, // 单对象还是列表
              VP_C_VIP_ID: this.VP_C_VIP_ID, // 会员ID
              VP_C_VIP_ACC_ID: this.VP_C_VIP_ACC_ID, // 会员卡ID
            })
          }
        }).then((res) => {
          const data = res.data;
          if (data.code === 0) {
            // 批量修改或只获取标签集合不显示已选的字标签
            let selectArr = []; let
              showArr = [];
            if (this.noPort) showArr = this.tagLists.slice();
            // 列表和高级搜索不需要显示通过接口返回的已选标签列表
            if (!(this.idArr.length > 0 || this.noPort)) {
              selectArr = data.isSelectedList ? data.isSelectedList.map((obj) => {
                showArr.push(obj);
                return Object.assign({
                  label: obj, // 子标签名称
                });
              }) : [];
              this.lists = selectArr;
            }
            const arr = data.dataList.map((obj) => {
              const childArr = obj.childList.map(child => Object.assign({
                label: child.ENAME, // 标签名
                tagId: child.VP_C_TAG_ID, // 标签ID
                checked: showArr.includes(child.ENAME), // 是否选中
                isShow: true // 是否显示
              }, child));
              return Object.assign({
                tags: childArr, // 子标签集合
                isShow: true, // 是否显示
                titleId: obj.ID, // 标签组ID
                title: obj.TAG_GROUP, // 标签组名称
              }, obj);
            });
            this.tagSums = arr;
          }
        });
      },
    },
    mounted() {
      if (this.idArr.length === 0) {
        this.VP_C_VIP_ID = [this.vipId];
        this.VP_C_VIP_ACC_ID = [this.accId];
        // 高级搜索功能特有
        if (this.noPort) this.lists = this.tagLists.slice().map(obj => ({ label: obj }));
      } else {
        // 批量贴标签获取id
        this.VP_C_VIP_ID = this.rowArr.map(obj => obj.VP_C_VIP_ID.val);
        this.VP_C_VIP_ACC_ID = this.rowArr.map(obj => obj.ID.val);
      }
      this.getTags();
    }
  };
</script>
