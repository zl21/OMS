<template>
    <div class="titit">
        <span>排名在</span>
        <input type="text" v-model="rule.top_begin">
        <span>至</span>
        <input type="text" v-model="rule.top_end">
        <span>之间,</span>

    </div>
</template>
<script>
export default {
    props:['rule' , 'tobjid' , 'amend']
}
</script>

<style lang="less">
    .titit {
        margin-left: 40px;
        input {
                background: #FCF7F1;
                font-size: 12px;
                width: 60px;
                height: 24px;
                border-radius: 2px;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                border: 1px solid #d8d8d8;
                padding-left: 3px;
                margin: 0 3px;
                text-align: center;
        }
    }
</style>
