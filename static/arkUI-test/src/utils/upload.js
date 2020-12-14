class Upload {
    constructor(obj) { // 新建父类
      this.FileList = obj.target;
      this.event = obj; // 事件
      this.url = obj.url || ''; // 请求路径
      this.Method = obj.Method || 'POST';
      this.sendData = obj.sendData || {}; // 携带参数
      this.multiple = obj.multiple || false; // 是否多选
      this.file = [];
      this.fileName = obj.fileName || 'file';
      this.img = new Image();
      this.length = obj.length; // 最多上传多少张
      this.imgSize = obj.imgSize || 1024 * 1024 * 10; // 10MB;
      this.type = obj.type || 'Image'; // 上传的文件类型
      this.checkimgSize = true;
      this.result = 0;
      if (this.multiple) {
        if (this.length > 0) {
          if (Object.keys(this.FileList).length > this.length) {
            this.event.onerror(`最多选择${this.length}个文件`);
          }
        }
        Object.keys(this.FileList).forEach((i) => {
          this.file.push(this.FileList[i]);
        });
      } else {
        this.file = [this.FileList];
      }

      this.file.forEach((item) => {
        this.filerImg(item);
      });
      if (this.checkimgSize) {
        this.init(this.file);
      }
    }

    filerImg(file, index) {
      //   校验传参
      if (file.size > this.imgSize) {
        if (Object.prototype.hasOwnProperty.call(this.event, 'onerror')) {
          this.checkimgSize = false;
          this.event.onerror('文件内容过大', index);
        }
      }
      if (this.type === 'Image') {
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
          this.checkimgSize = false;
          this.event.onerror('图片类型必须是.gif,jpeg,jpg,png中的一种', index);
        }
      } else if (!/\.(xls|xlsx|xlsm|doc|docx)$/.test(file.name)) {
        this.checkimgSize = false;
        this.event.onerror('允许上传的文件类型为：xls、xlsx、xlsm、doc、docx！', index);
      }
    }

    init() {
      this.file.forEach((item) => {
        this.transformFileToDataUrl(item);
      });
    }

    // 将file转成dataUrl
    transformFileToDataUrl(file) {
      // 封装好的函数
      const reader = new FileReader();
      // file转dataUrl是个异步函数，要将代码写在回调里
      const self = this;
      reader.onload = (e) => {
        if (Object.prototype.hasOwnProperty.call(self.event, 'onload') && typeof self.event.onload === 'function') {
          self.event.onload(e);
        }
      };
      reader.onloadstart = (e) => {
        if (Object.prototype.hasOwnProperty.call(self.event, 'onloadstart') && typeof self.event.onloadstart === 'function') {
          self.event.onloadstart(e);
        }
      };
      reader.onloadend = (e) => {
        if (Object.prototype.hasOwnProperty.call(self.event, 'onloadend') && typeof self.event.onloadend === 'function') {
          self.event.onloadend(e);
        }
        this.result++;
        if (this.result === this.file.length) {
          self.transformFileToFormData();
        }
      };
      reader.onerror = (e) => {
        if (Object.prototype.hasOwnProperty.call(this.event, 'onerror') && typeof this.event.onerror === 'function') {
          this.event.onerror(e);
        }
      };

      reader.readAsDataURL(file);
    }


    // 将File append进 FormData
    transformFileToFormData() {
      const formData = new FormData();
      this.file.forEach((item) => {
        formData.append(this.fileName, item,item.name);
      });
      Object.keys(this.sendData).forEach((item) => {
        formData.append(item, this.sendData[item]);
      });
      // 上传图片
      this.uploadImg(formData);
    }

    uploadImg(formData) {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (Object.prototype.hasOwnProperty.call(this.event, 'progress') && typeof this.event.progress === 'function') {
          this.event.progress(e, e.loaded / e.total);
        }
      }, false);
      // 错误监听

      xhr.addEventListener('error', (e) => {
        if (Object.prototype.hasOwnProperty.call(this.event, 'onerror') && typeof this.event.onerror === 'function') {
          this.event.onerror(e);
        }
      }, false);
      const that = this;

      xhr.onreadystatechange = () => {
        const result = xhr.responseText;
        if (that.event.ContentType !== undefined) {
          xhr.setRequestHeader('Content-Type', this.event.ContentType);
        }
        if (xhr.status === 200 && xhr.readyState === 4) {
          // 上传成功
          if (Object.prototype.hasOwnProperty.call(that.event, 'success') && typeof that.event.success === 'function') {
            that.event.success(JSON.parse(result));
            return false;
          }
        } else if (Object.prototype.hasOwnProperty.call(that.event, 'onerror') && typeof that.event.onerror === 'function') {
          if (xhr.readyState === 4) {
            that.event.onerror(result);
            return false;
          }
        }
      };
      xhr.open(this.Method, this.url, true);
      xhr.send(formData);
    }

    uploadProgress(e) {
      console.log(e);
    }
  }

  export default Upload;
