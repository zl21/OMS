<template>
    <div class="divideContaner">
        <div class="divideImage">
            <img draggable="false" style="width: 100%" src="./divide-vertical.png"/>
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
        height: 100%;
        width: 100%;
        background: #D9D9D9;
        .divideImage {
            height: 100%;
            width: 60px;
            margin: 0 auto;
        }
    }
</style>
