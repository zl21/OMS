<template>
  <div :class='prefixCls' >
    <div ref="box" :class="prefixClsValue + 'box'" :style="{'height':itemdata.height + 'px','width':width+20+'px'}">
      <div ref="container" :class="prefixClsValue+'container'" :style="{'width':width+'px'}">
        <div
          ref="sliderWrap"
          :class="prefixClsValue + 'slider-wrap'"
          :style="{'width':totalLength,'left':leftOffset,}"
        >
          <div
            v-for="(item,index) in slider_des"
            :key="index"
            :class="prefixClsValue + 'img'"
            :style="{'width':width+'px'}"
            @mouseenter="mousenter(item)"
            @mouseleave="mouseleave"
            @dblclick="dblclick(index)"
          >
            <div v-if="!itemdata.readonly">
              <Icon
                type="ios-close-circle-outline"
                ref="iconX"
                :class="prefixClsValue + 'iconX'"
                 v-if="deleteShow"
                :style="{'margin-left':width-25+'px'}"
                @click.stop="iconXclick(item,index)"
              ></Icon>
              <!-- v-show="iconX" -->
            </div>

            <img :style="{'width':width+'px'}" :src="item.URL"  alt>
          </div>
        </div>
        <div :class="prefixClsValue + 'bottom'" :style="{'width':width+'px'}">
          <div :class="prefixClsValue + 'click' + ' '+ prefixClsValue + 'pre'" @click="pre">&lt;</div>
          <div :class="prefixClsValue + 'bottomImage'" :style="{'width':bottomImage}">
            <ul
              ref="pointContainer"
              :class="prefixClsValue + 'pointContainer'"
              :style="{'width':itemImagNumber,'left':itemleftOffset}"
            >
              <li
                v-for="(point,index) in slider_des"
                ref="point"
                :key="index"
                :style="{'width':width/4+'px'}"
                :class="{point:true}"
                @click="changeIndex(index)"
                v-if="index+1 !== sliderLength"
              >
                <img :src="point.URL"  @error="imgError($event,point);" :class="{point:true,active:nowIndex===index}" alt>
              </li>
            </ul>
          </div>

          <div :class="prefixClsValue + 'click'+ ' '+  prefixClsValue + 'next'" @click="next">&gt;</div>
        </div>

      </div>
             <div v-if="!itemdata.readonly" :class="prefixClsValue + 'name'" style=" position: relative;top:0;width:20px;" :style="{'left':width+'px'}">
                        <label  ref="file" :class="prefixClsValue + 'fileContent'">
                         <input
                            type="file"
                            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                            style="filter:alpha(opacity=0);opacity:0;
                                    cursor: pointer;width: 20px;position: fixed;
                                    "
                            @change.stop="uploadFileChange(itemdata,$event)"
                            >

                            <!-- multiple="multiple" -->
                            <Icon type="md-cloud-upload"></Icon>
                                {{itemdata.name}}
                        </label>
            </div>

    </div>
      <!-- :style="{'left':bigImg+'px','right':rightImg+'px','top':previewTop+'px','position':'fixed','width':previewImgWidth+'px','height':previewImgHeight+'px'}" -->

    <div
      :class="prefixClsValue + 'popoverShow'"
      :style="{'left':bigImg+'px','right':rightImg+'px','top':previewTop+'px','position':'fixed','width':previewImgWidth+'px','height':previewImgHeight+'px','text-align': 'center'}"
       v-show="popoverShow"
    >
      <!-- @mouseenter="imgMousenter" -->
      <!-- @mouseleave="mouseleave" -->
      <img  :src="currentImagePath" v-show="popoverShow" alt>
    </div>
  </div>
</template>

<script>
import Upload from '../../utils/upload';
 import burgeonConfig from '../../assets/config';

const prefixCls = `${burgeonConfig.prefixCls}imageupload`;
const prefixClsValue = `${burgeonConfig.prefixCls}imageupload-`;


export default {
  props: {
    dataitem: {
      type: Object,
      default: () => ({})
    }
  },
  created() {},
  mounted() {
    if (!this.itemdata.readonly){
        this.width = this.itemdata.width-20;
          } else {
        this.width = this.itemdata.width;
          }
    if (this.dataitem.valuedata.length<1){
    this.deleteShow=false;
    }
    this.height = this.itemdata.height;
    // this.offset_left = -this.width;
    this.length = new Array(this.itemdata.valuedata.length);
    this.valueWidth = Number(this.itemdata.valuedata.length);
    this.wrap_width = this.width * (this.itemdata.valuedata.length + 2);
    this.wrap_height = this.height;
    this.offset_left = -this.width;
  },
  watch: {
    dataitem: {
      handler(val) {
          if (!this.itemdata.readonly){
             this.width = val.width-20;
          } else {
             this.width = val.width;
          }
          if (val.valuedata.length<1){
               this.deleteShow=false;
          } else {
               this.deleteShow=true;
          }
        this.height = val.height;
        // this.offset_left = -this.width;
        this.length = new Array(val.valuedata.length);
        this.valueWidth = Number(val.valuedata.length);
        this.wrap_width = this.width * (val.valuedata.length + 2);
        this.wrap_height = this.height;
        this.offset_left = -this.width;
      },
      deep: true
    }
  },
  data() {
    return {
         deleteShow:true,
      url: [],
      urlData: [],
      left: 0,
      length: [],
      valueWidth: 0,
      nowIndex: 1,
      wrap_width: 0,
      wrap_height: 0,
      offset_left: 0,
      isTransition: true,
      timer: null,
      animateFlag: true,
      timerAuto: null,
      deleteIcon: false,
      popoverShow: false,
      currentImagePath: '',
      isActive: false,
      width: 0,
      previewleft: '',
      previewTop: '',
      bigImg: '',
      iconX: false,
      imgSrcShow: true,
      rightImg: '',
      prefixCls: prefixCls,
      prefixClsValue:prefixClsValue,
      previewImgWidth:'',
      previewImgHeight:''
    };
  },
  computed: {
    itemdata() {
      let obj = {
        loadIconPosition: this.dataitem.loadIconPosition
          ? this.dataitem.loadIconPosition
          : false,
        url: this.dataitem.url ? this.dataitem.url : '',
        name: this.dataitem.name ? this.dataitem.name : '上传',
        sendData: this.dataitem.sendData ? this.dataitem.sendData : {},
        width: this.dataitem.width ? this.mainWidth : 200,
        height: this.dataitem.height ?this.mainHeight : 200,
        readonly: this.dataitem.readonly ? this.dataitem.readonly : false,
        valuedata:
          this.dataitem.valuedata.length > 0
            ? this.dataitem.valuedata
            : [
                {
                  NAME: '1.jpg',
                  URL:
                    'http://5b0988e595225.cdn.sohucs.com/images/20180118/a0163c6be9d247918669229bed6c7280.png'
                }
              ]
      };

      return obj;
    },
    mainWidth(){
        if (Number(this.dataitem.width)<50){
           return 50;
        } else {
        return this.dataitem.width;

        }
    },
    mainHeight(){
        if (Number(this.dataitem.height)<50 ){
            return 50;
        } else {
          return this.dataitem.height;
        }
    },
    slider_des() {
      if (this.itemdata.valuedata.length > 0) {
        const arr1 = [...this.itemdata.valuedata];
        arr1.push(this.itemdata.valuedata[0]);
        arr1.unshift(
          this.itemdata.valuedata[this.itemdata.valuedata.length - 1]
        );
        return arr1;
      } else {
        return this.itemdata.valuedata;
      }
    },
    sliderLength(){
         return this.slider_des.length;
    },
    totalLength() {
      return `${this.width * this.slider_des.length}px`;
    },
    itemImagNumber() {
      return `${(this.width / 4) * this.slider_des.length}px`;
    },
    bottomImage() {
      return `${this.width - 24}px`;
    },
    leftOffset() {
      return `${this.offset_left}px`;
    },
    itemleftOffset() {
      return `${this.offset_left / 4}px`;
    }

  },
  methods: {
    isIE(){
        if (window.navigator.userAgent.indexOf('MSIE')>=1) {
        return true;
        } else {
        return false;
        }
    },
    dblclick (index) { //双击预览
        if (!this.isIE()){
            this.$emit('dblclick', this.itemdata.valuedata,index);
        }

    },
    next() { //功能暂时去掉
      //点击切换下一个
      if (this.nowIndex === this.length.length) {
        if (!this.animateFlag) {
          this.animateFlag = true;
          clearInterval(this.timer);
          this.offset_left = -this.width;
        }
        this.animate(
          -this.length.length * this.width,
          -(this.length.length + 1) * this.width,
          that => {
            that.offset_left = -that.width;
          }
        );
        this.nowIndex = 1;
        return;
      }
      if (!this.animateFlag) {
        this.animateFlag = true;
        clearInterval(this.timer);
        this.offset_left = -this.nowIndex * this.width;
      }
      this.animate(
        -this.nowIndex * this.width,
        -(this.nowIndex + 1) * this.width
      );
      this.nowIndex += 1;
    },
    pre() {
      //点击切换上一个
      if (this.nowIndex === 1) {
        const imgNumber = this.length.length;
        if (!this.animateFlag) {
          clearInterval(this.timer);
          this.animateFlag = true;
          this.offset_left = -imgNumber * this.width;
        }
        this.animate(-this.width, 0, that => {
          that.offset_left = -imgNumber * that.width;
        });
        this.nowIndex = this.length.length;
        return;
      }
      if (!this.animateFlag) {
        this.animateFlag = true;
        clearInterval(this.timer);
        this.offset_left = -(this.nowIndex * this.width);
      }
      this.nowIndex -= 1;
      this.animate(
        -(this.nowIndex + 1) * this.width,
        -this.nowIndex * this.width
      );
    },
    animate(start, end, fuc) {
      const distance = end - start;
      const preDis = distance / 50;
      const that = this;
      this.timer = setInterval(() => {
        that.animateFlag = false;
        if (Math.abs(end - that.offset_left) <= Math.abs(preDis)) {
          that.offset_left = end;
          if (fuc) {
            fuc(that);
          }
          that.animateFlag = true;
          clearInterval(that.timer);
          that.timer = null;
          return;
        }
        that.offset_left += preDis;
      });
    },
    CheckImgExists(imgurl) {
     let ImgObj = new Image(); //判断图片是否存在
     ImgObj.src = imgurl;
     //存在图片
     if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
          return true;
     } else {
          return false;
      }
     },
     imgError($event, point) { // 图片地址错误时，执行轮询
        if (!this.CheckImgExists(point.URL)) {
          this.dataitem.valuedata.forEach((item, index) => {
            if (item.URL === point.URL) {
              this.dataitem.valuedata.splice(index, 1);
            }
          });
        }
        if (point && point.URL) {
          const interval = setInterval(() => {
            this.CheckImgExists(point.URL);
            if (this.CheckImgExists(point.URL)) {
              clearInterval(interval);
              this.dataitem.valuedata.push(point);
            }
          }, 200);
          setTimeout(() => {
            clearInterval(interval);
          }, 800);
        }
    },
    iconXclick(item, index) {
      this.$emit('deleteImg', item, index);
    },

    uploadFileChange(itemdata, e) {
      // 上传图片
      const fileInformationUploaded = e.target.files[0];
      const { url } = itemdata;
      const { sendData } = itemdata;
      const aUploadParame = Object.assign(
        {},
        {
          target: fileInformationUploaded,
          url,
          sendData,
          type:'Image',
          success: this.success,
          onerror: this.onerror,
          progress: this.progress,
          onload: this.onload,
          onloadstart: this.onloadstart,
          onloadend: this.onloadend
        }
      );
      const article = new Upload(aUploadParame);
    },

    success(result) {
      this.$emit('uploadFileChangeSuccess', result);
    },
    onerror(result) {
      this.$emit('uploadFileChangeOnerror', result);
    },
    progress(e) {
      // 上传进度
      this.$emit('uploadFileChangeProgress', e);
    },
    onload(e) {
      this.$emit('uploadFileChangeOnload', e);
    },
    onloadstart(e) {
      this.$emit('uploadFileChangeOnloadstart', e);
    },
    onloadend(e) {
      this.$emit('uploadFileChangeOnloadend', e);
    },

    mouseleave() {
      // 鼠标离开图片隐藏
      this.iconX = false;
      this.deleteIcon = false;
      this.popoverShow = false;
    },
    imgMousenter() {
      // 鼠标划入显示放大图片
      this.deleteIcon = true;
      this.popoverShow = true;
    },
    getPosition(){
         let browserWidth = document.body.clientWidth;
      let browserHeight = window.screen.availHeight;
    //   this.previewImgHeight = browserHeight - 200;
      const domBoxSize = this.$refs.box.getBoundingClientRect();
      const { left } = domBoxSize;
      const { right } = domBoxSize;
      const { top } = domBoxSize;

      const rightSize = browserWidth - this.width - left;
      if (left > rightSize) {
        this.rightImg = rightSize + this.width + 5;
        // this.previewImgWidth = left;
      } else {
        this.bigImg = left + this.width + 15;
        // this.previewImgWidth = rightSize - 50;
      }

    },
    mousenter(item) {
      if (this.dataitem){
          if (this.dataitem.hoverWidth){
          this.previewImgWidth=this.dataitem.hoverWidth;

          } else {
            this.previewImgWidth=500;
          }

          if (this.dataitem.hoverWidth){
          this.previewImgHeight=this.dataitem.hoverHeight;

          } else {
            this.previewImgHeight=500;
          }

      }
        //  previewImgWidth(){
        //   if (this.dataitem.hoverWidth){
        //      return this.dataitem.hoverWidth;
        //   } else {
        //       return 500;
        //   }
      // },
      // previewImgHeight(){
      //     if (this.dataitem.hoverHeight){
      //       return this.dataitem.hoverHeight;
      //     } else {
      //       return 500;
      //     }
      // }
      this.getPosition();
      const domBoxSize = this.$refs.box.getBoundingClientRect();
      const { top } = domBoxSize;
      this.previewTop = top/2;
      // 鼠标划入给定大图路径并显示大图
      this.iconX = true;
      this.deleteIcon = true;
      this.popoverShow = true;
      this.currentImagePath = item.URL;
    },

    changeIndex(index) {
      //   选中切换
      clearInterval(this.timer);
      this.animate(-this.nowIndex * this.width, -index * this.width);
      this.nowIndex = index;
    }
  }
};
</script>


<style lang="less" scoped>


</style>
