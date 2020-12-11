<template>
    <div>
        <div
            :class="[prefixCls]" :style="setWidth" ref="dragDiv">
            <img
                :style="setImgWidth" ref="dragImg" v-if="imgUrl"
                @wheel="wheel"
                @mousedown="move"
                v-bind:src="imgUrl"/>
        </div>
    </div>
</template>

<script>

    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}dragImg`;

    export default {
        name: 'dragImg',
        data () {
            return {
                prefixCls:prefixCls,
                ImgWidth:'',
                ImgHeight:'',
                moveTime:'',
                scale:1,
                show:false
            };
        },
        props: {
            imgUrl: {
                type: String,
                default: ''
            },
            divWidth:{
                type: [String, Number],
                default: '100%'
            },
            divHeight:{
                type: [String, Number],
                default: '100%'
            }
        },
        methods: {
            move(e){
                let targetImg = e.target; //获取目标元素
                e.target.style.cursor='move';
                e.preventDefault();
                //算出鼠标相对元素的位置
                let client=targetImg.getBoundingClientRect();
                 clearTimeout(this.moveTime);
                 this.moveTime = setTimeout(() => {
                    let ImgDisX = e.offsetX.toFixed(2);
                    let ImgDisY = e.offsetX.toFixed(2);
                     //console.log(client);

                        targetImg.onmousemove = (event)=>{
                            //鼠标按下并移动的事件
    
                                let left = event.offsetX - ImgDisX;
                                let top = event.offsetY - ImgDisY;

                                /*//移动当前元素*/
                                targetImg.style.marginLeft =`${parseInt(targetImg.style.marginLeft)+ left}px`;
                                targetImg.style.marginTop = `${parseInt(targetImg.style.marginTop)+top}px`;
                        };
                }, 200);

                targetImg.onmouseup = (event) => {
                    clearTimeout(this.moveTime);
                    targetImg.onmousemove = null;
                    targetImg.onmouseup = null;
                };
                targetImg.onmouseleave = function (event) {
                    targetImg.onmousemove=null;
                    targetImg.onmouseup=null;
                };
            },
            wheel(e){
                let divtTop=this.$refs.dragDiv.getBoundingClientRect().top;
                let divLeft=this.$refs.dragDiv.getBoundingClientRect().left;

                let imgTop=e.target.getBoundingClientRect().top;
                let imgLeft=e.target.getBoundingClientRect().left;

                let imgHeight=e.target.offsetHeight;
                let imgWidth=e.target.offsetWidth;
                    if (e.deltaY>0){
                        if (divtTop-imgTop>imgHeight-50 || divtTop+imgHeight<imgTop+50 || divLeft-imgLeft>imgWidth-50 || divLeft+this.$refs.dragDiv.getClientRects()[0].width<imgLeft){
                            return false;
                        } else {
                            this.scale=this.scale-0.05;
                            this.scale=this.scale<0.3 ? 0.3 : this.scale;
                        }
                    } else {
                        this.scale=this.scale+0.05;
                        this.scale=this.scale>5 ? 5 : this.scale;
                    }

                    e.target.style.transform=`scale(${this.scale})`;
                    this.$emit('on-scaleImg',this.scale,this);


            },
            scaleImg(zoom){
                if (zoom<0){
                    this.scale=this.scale-0.05;
                    this.scale=this.scale<0.3 ? 0.3 : this.scale;
                } else {
                    this.scale=this.scale+0.05;
                    this.scale=this.scale>5 ? 5 : this.scale;
                }
                this.$refs.dragImg.style.transform=`scale(${this.scale})`;
            },
            setImg(){
                let self=this;
                this.$refs.dragImg.onload=function(e){
                    let Img=e.target;
                    self.ImgWidth=Img.offsetWidth;
                    self.ImgHeight=Img.offsetHeight;
                    let width=(self.ImgWidth/self.ImgHeight)<(self.divWidth/self.divHeight) ? 'auto' :'100%';
                    let height=width==='auto'? '100%' :'auto';
                    this.style.width=width;
                    this.style.height=height;
                    self.ImgWidth=Img.offsetWidth;
                    self.ImgHeight=Img.offsetHeight;
                };


            }
        },
        computed:{
            setWidth(){
                /* 设置div 的宽度 */
                return `width:${this.divWidth}px; height:${this.divHeight}px`;
            },
            setImgWidth(){
                /* 计算img 居中处理 */
                let marginTop=(this.divHeight-this.ImgHeight)/2 || 0;
                let marginLeft=(this.divWidth-this.ImgWidth)/2 || 0;
                return `marginTop:${marginTop}px;marginLeft:${marginLeft}px;`;

            }

        },
        watch:{
        },
        mounted(){
            this.$nextTick(()=>{
                /* 获取img 宽度  居中 */
                if (this.imgUrl){
                     this.setImg();
                }

            });
        },
        created(){
        }

    };
</script>
