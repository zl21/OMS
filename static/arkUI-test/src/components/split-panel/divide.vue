<template>
    <div class="divideContaner">
        <div class="divideImage">
            <img draggable="false" style="width: 100%" src="./divide.png"/>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Divide',
        props: {
        },
        data () {
            return {
            };
        },
        computed: {
        }
    };
</script>
<style lang="less" scoped>
    .divideContaner {
        display: flex;
        height: 100%;
        width: 100%;
        background: #D9D9D9;
        .divideImage {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
