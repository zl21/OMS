<template>
  <div>
    <div class="editor"
         :class="{'hidden':getHideColumn(itemdata)}"
         :id="'editor'+itemdata.colid"></div>

  </div>
</template>
<script type="text/javascript">
  //	import wangEditor from "wangEditor"
  import axios from 'axios'
  import i18n from '../../assets/js/i18n'

  export default {
    name: 'wang-editor',
    data() {
      return {
        editor: {},
        ImgArray: [],
        IMGArray1: [],
        timertomUploadImg: false,
        Html: ""
      }
    },
    props: {
      itemdata: {//后台返回的数据，针对一个字段的
        type: Object
      },
      objList: {
        type: Array
      },
      configrow: {
        type: Number
      },
      isActive: {
        type: Boolean
      },
      isdisabled: {
        type: Boolean
      },
      tabAction: {},
      storageItem: {
        type: Object
      },
      refaddcol: null,
      isActives: true//是否可编辑
    },

    beforeCreate() {
      this.$t = i18n.t.bind(i18n)
    },

    mounted() {
      const lang = localStorage.getItem('r3-component-lang') || 'zh'
      let self = this;
      setTimeout(() => {
        this.tomUploadImg();
      }, 50)
      setTimeout(() => {
        this.uploadProgress()
      }, 50)
      //wangEditor.fullscreen.toggleFullscreen(\'' + editorSelector + '\')
      var E = window.wangEditor;
      this.editor = new E('#editor' + this.itemdata.colid);
      // 或者 let editor = new E(document.getElementById('#editor'))
      this.editor.customConfig.zIndex = 100;
      this.editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
      this.editor.customConfig.onchange = function (html) {// html 即变化之后的内容

        //$(".w-e-text").find("img").css("display","block")
        self.itemdata.valuedata = html == "<p><br></p>" ? null : html;
        self.$emit('getChangeItem', self.itemdata)
      };
      this.editor.customConfig.customUploadImg = function (files, insert) {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
        // $("#editor"+self.itemdata.colid).children("img").css("display","block")
        let inserts = insert;
        for (let i = 0; i < files.length; i++) {
          self.IMGArray1.push({file: files[i], insert});
        }
      };
      this.editor.customConfig.menus = [ // 自定义菜单配置
        'head',  // 标题
        'bold',  // 粗体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo',  // 重复
      ];

      this.editor.customConfig.lang = {
          '正文': lang === 'zh'? '正文': 'text',
          '链接文字': lang === 'zh'? '链接文字': 'link text',
          '插入': lang === 'zh'? '插入' : 'insert',
          '靠左': lang === 'zh'? '靠左' : 'left',
          '居中': lang === 'zh'? '居中' : 'center',
          '靠右': lang === 'zh'? '靠右' : 'right',
          '图片链接': lang === 'zh'? '图片链接' : 'image link',
          '行': lang === 'zh'? '行' : 'rows',
          '列': lang === 'zh'? '列' : 'columns',
          '的': lang === 'zh'? '的' : ' of ',
          '表格': lang === 'zh'? '表格' : 'table',
          '创建': lang === 'zh'? '创建' : 'create',
          '默认': lang === 'zh'? '默认' : 'default',
          '新浪': lang === 'zh'? '新浪' : 'sina',
          '链接': lang === 'zh'? '链接' : 'link',
          '插入代码': lang === 'zh'? '插入代码' : 'insert code',
          '插入表格': lang === 'zh'? '插入表格' : 'insert table',
          '编辑表格': lang === 'zh'? '编辑表格' : 'edit table',
          '插入视频': lang === 'zh'? '插入视频' : 'insert video',
          '编辑图片': lang === 'zh'? '编辑图片' : 'edit picture',
          '上传图片': lang === 'zh'? '上传图片' : 'upload image',
          '网络图片': lang === 'zh'? '网络图片' : 'web image',
          '请输入视频地址': lang === 'zh'? '请输入视频地址' : 'Please enter the video address',
          '设置标题': lang === 'zh'? '设置标题' : 'set title',
          '文字颜色': lang === 'zh'? '文字颜色' : 'text color',
          '背景色': lang === 'zh'? '背景色' : 'background color',
          '对齐方式': lang === 'zh'? '对齐方式' : 'alignment',
      },

      this.editor.create();  //初始化编辑器
      let editorSelector = '#editor' + this.itemdata.colid;
      this.$nextTick(() => { //设置内容初始化内容，需要在初始化之后
        let valuedata = this.itemdata.valuedata ? this.itemdata.valuedata : '';
        this.editor.txt.html(valuedata)

        this.editor.$textElem.attr('contenteditable', !this.tabAction) //是否可编辑，需要在初始化之后 true是可编辑，传过来的是false，取反
        let _block = !this.tabAction ? 'none' : 'block';
        let _html = '<div id="editor_layer" style="display:' + _block + '"></div>'
        let textArea = "<textarea id='textarea' style='display:none;width:100%;height:100%;resize:none;'></textarea>";
        $(editorSelector).append(_html)
        $(".w-e-text-container").append(textArea)
      })
      wangEditor.fullscreen = {
        // editor create之后调用
        //
        init: function (editorSelector) {
          $(editorSelector + " .w-e-toolbar").append(`<div class="w-e-menu" id="_wangEditor_btn_fullscreen"><a class="_wangEditor_btn_fullscreen" href="###">${this.$t('tips.fullscreen')}</a></div><div class="w-e-menu" id="_wangEditor_btn_html"><a class="_wangEditor_btn_html" href="###">html</a></div>`);
        },
      };
      E.fullscreen.init('#editor' + this.itemdata.colid);
      let id = '#editor' + this.itemdata.colid;
      $("#_wangEditor_btn_fullscreen").on('click', function () {
        self.toggleFullscreen(id)
      })
      $("#_wangEditor_btn_html").on("click", function () {
        self.toggleHtml(id)
      })
    },
    methods: {
      toggleFullscreen(editorSelector) {
        $(editorSelector).toggleClass('fullscreen-editor');
        if ($(editorSelector + ' ._wangEditor_btn_fullscreen').text() == this.$t('tips.fullscreen')) {
          $(editorSelector + ' ._wangEditor_btn_fullscreen').text(this.$t('tips.exitFullscreen'));
        } else {
          $(editorSelector + ' ._wangEditor_btn_fullscreen').text(this.$t('tips.fullscreen'));
        }
      },
      toggleHtml(editorSelector) {
        let self = this;
        $(editorSelector).toggleClass('html-editor');
        if ($(editorSelector + ' ._wangEditor_btn_html').text() == 'html') {
          $(editorSelector + ' ._wangEditor_btn_html').text(this.$t('buttons.exit'));
          document.getElementById('editor_layer').style.display = 'block';
          $("#textarea").show().val($(".w-e-text").hide().html())
        } else {
          $(editorSelector + ' ._wangEditor_btn_html').text('html');
          if (!this.tabAction) {
            document.getElementById('editor_layer').style.display = 'none';
          }
          $(".w-e-text").show().html($("#textarea").hide().val().replace(/<script/gi, "&lt;script").replace(/(on[a-z$_]+)\s*\=/gi, "$1"));
        }
      },
      tomUploadImg() {//上传图片方法
        if (this.timertomUploadImg == true) {
          return;
        }
        let self = this;
        let data = this.IMGArray1.shift();
        if (!data) {
          setTimeout(() => {
            this.tomUploadImg()
          }, 500)
          return
        }
        var customUploadImg = new FormData()
        let path = self.storageItem.name + '/' + self.storageItem.id + '/'
        customUploadImg.append('file', data.file)
        customUploadImg.append('path', path)
        self.httpForm({
          url: '/p/cs/upload2',
          method: 'POST',
          data: customUploadImg
        })
          .then((res) => {// 上传代码返回结果之后，将图片插入到编辑器中
            if (res.data.code == 0) {
              res.data.data.insert = data.insert
              self.ImgArray.push(res.data.data)
              //setTimeout(()=>{self.tomUploadImg()},500);
            }
            setTimeout(() => {
              self.tomUploadImg()
            }, 500);
          })
          .catch((error) => {
            setTimeout(() => {
              self.tomUploadImg()
            }, 500);
          })

      },
      uploadProgress() {
        if (this.timertomUploadImg == true) {
          return;
        }
        let upload = this.ImgArray.shift();
        if (!upload) {
          setTimeout(() => {
            this.uploadProgress()
          }, 500)
          return
        }
        let self = this
        this.axios({
          url: '/p/cs/uploadProgress',
          method: 'POST',
          data: {'uploadId': upload.UploadId}
        })
          .then((res) => {
            if (res.data.data == 100) {
              upload.insert(upload.Url)
              self.editor.customConfig.onchange = function (html) {// html 即变化之后的内容
                self.itemdata.valuedata = html == "<p><br></p>" ? null : html;
                self.$emit('getChangeItem', self.itemdata)
              };
            }
            setTimeout(function () {
              self.uploadProgress()
            }, 50)
          })
          .catch((error) => {
            setTimeout(() => {
              self.uploadProgress()
            }, 50);
          })
      },
      getData(val) {
        let self = this;

        this.editor.customConfig.customUploadImg = function (files, insert) {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法
          let inserts = insert;
          for (let i = 0; i < files.length; i++) {
            self.IMGArray1.push({file: files[i], insert});
          }
        };
        let id = '#editor' + this.itemdata.colid;
        this.$nextTick(() => { //设置内容初始化内容，需要在初始化之后
          let valuedata = val.valuedata ? val.valuedata : '';
          this.editor.txt.html(valuedata)

          this.editor.$textElem.attr('contenteditable', !this.tabAction) //是否可编辑，需要在初始化之后
          this.editor.customConfig.onchange = function (html) {// html 即变化之后的内容
            self.itemdata.valuedata = html == "<p><br></p>" ? null : html;
            self.$emit('getChangeItem', self.itemdata)
          };
          let _block = !this.tabAction ? 'none' : 'block';
          $(id + ' ._wangEditor_btn_html').text('html');
          $("#textarea").hide().val();
          $(".w-e-text").show().html(valuedata);
          //let _html='<div id="editor_layer" style="display:'+_block+'"></div>'
          document.getElementById('editor_layer').style.display = _block
        })
      },
      getHideColumn(itemdata) {
        let self = this
        let hidden = false
        if (itemdata.hidecolumn) {
          self.objList.forEach(function (item) {
            if (item.childs) {
              item.childs.forEach(function (child) {
                if (child.colname === itemdata.hidecolumn.refcolumn && child.valuedata !== itemdata.hidecolumn.refval) {
                  if(child.display === "OBJ_DATENUMBER") {
                    if(child.valuedata !== itemdata.hidecolumn.refval.replace(/-/g, '')) {
                      hidden = true
                    }
                  }else {
                    hidden = true
                  }
                }
              })
            } else {
              if (item.child.colname === itemdata.hidecolumn.refcolumn && item.child.valuedata !== itemdata.hidecolumn.refval) {
                if(item.child.display === "OBJ_DATENUMBER") {
                  if(item.child.valuedata !== itemdata.hidecolumn.refval.replace(/-/g, '')) {
                    hidden = true
                  }
                }else {
                  hidden = true
                }
              }
            }
          })
        }
        if (hidden) {
          itemdata.valuedata = null
          self.$emit('clearInputValue', itemdata)
        }
        return hidden
      },
    },
    watch: {
      itemdata: {
        handler(val, oldval) {
          this.getData(val)

        }
      },
      refaddcol: {
        handler: function(val) {
          const _self = this;
          //判断是否可编辑,不可编辑则不做默认值处理
          if(!_self.isActive || _self.isdisabled) return;
          if(_self.storageItem.id == "-1" && _self.itemdata.refcolval && _self.itemdata.refcolval.addrule) {
            let addrule = _self.itemdata.refcolval.addrule;
            //判断是否在规则内,如果在规则内则根据规则设置默认值
            for(let rule of addrule) {
              if(val.fkdisplay && rule.refval.indexOf(val.pid) >= 0 || !val.fkdisplay && rule.refval.indexOf(val.valuedata) >= 0){
                _self.editor.txt.html(rule.defval);
                _self.itemdata.valuedata = rule.defval;
                _self.$emit('getChangeItem', _self.itemdata);
                return;
              }
            }
            //设置原默认值
            if(_self.itemdata.defval && JSON.parse(_self.itemdata.defval).length > 0) {
              _self.editor.txt.html(_self.itemdata.defval);
              _self.itemdata.valuedata = _self.itemdata.defval;
              _self.$emit('getChangeItem', _self.itemdata);
            } else {
              //如果没有默认值,则清空
              _self.editor.txt.html('');
              _self.itemdata.valuedata = null;
              _self.$emit('getChangeItem', _self.itemdata);
            }
          }
        },
        deep: true
      }
    },
    beforeDestroy() {
      this.timertomUploadImg = true
    }
  }
</script>
<style lang="less">
  .editor {
    b {
      font-weight: bold;
    }
  }

  #editor_layer {
    background: #f1f1f1;
    position: absolute;
    width: 100%;
    top: 0px;
    height: 33px;
    z-index: 103;
    opacity: 0.5;
  }

  #_wangEditor_btn_fullscreen {
    position: relative;
    z-index: 150;
  }

  .w-e-toolbar {
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
  }

  .w-e-toolbar .w-e-menu:hover {
    z-index: 10002 !important;
  }

  .w-e-menu a {
    text-decoration: none;
  }

  .fullscreen-editor {
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    left: 0px !important;
    top: 0px !important;
    background-color: white;
    z-index: 9999;
  }

  #_wangEditor_btn_html {
    position: relative;
    z-index: 150;
  }

  .fullscreen-editor .w-e-text-container {
    width: 100% !important;
    height: 95% !important;
  }
</style>
