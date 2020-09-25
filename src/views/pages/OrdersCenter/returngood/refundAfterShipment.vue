<template>
  <div class="refundAfterShipment">
    <h1>额外退款新增!</h1>
    <Button @click="home">返回</Button>
  </div>
</template>

<script>
import R3 from '@syman/burgeon-r3'
const { getSeesionObject } = R3;
export default {
  methods: {
    home() {
      this.$store.commit('global/tabOpen', {
        type: 'S',
        tableName: 'OC_B_RETURN_AF_SEND_MANUAL',
        tableId: '249230545'
      })
    },
  },
  mounted() {
    console.log(getSeesionObject('customizeMessage'));
  }
}
</script>