<template>
  <!-- 手工拆单 -->
  <div class="splitOrder">
    <div class="manual_button">
      <div class="button1">
        <Button type="primary" icon="ios-add-circle-outline" @click="addPendingOrder">添加到待拆单</Button>
        <Button
          style="background:#FDF4F2;border:1px solid #EB4832;color:#EB4832"
          icon="ios-photos-outline"
          @click="confirm"
        >确认拆单</Button>
      </div>
      <div class="button2">
        <Button type="error" ghost icon="ios-arrow-dropleft" @click="back">返回</Button>
      </div>
    </div>
    <div class="manual_list">
      <div class="list_left">
        <Table
          :columns="columns"
          :data="data[dataIndex]"
          height="500"
          :transfer="true"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
        ></Table>
      </div>
      <div class="list_right">
        <ul>
          <li v-for="(item , index) in data" :key="index" @click="switchList(index)">
            {{item[0]?item[0].cp_c_phy_warehouse_ename:old_cp_c_phy_warehouse_ename}}: 共{{item[0]?item[0].total:0}}件
            <div v-if="isOutStore" class="subscript">缺货</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import splitOrder from "@/js/pages/orderCenter/orderManager/splitOrder";
  export default splitOrder;
</script>
<style lang="less">
.splitOrder {
  .manual_button {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
  }

  .manual_list {
    display: flex;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    .list_left {
      flex: 1;
      width: calc(100% - 210px);
      max-width: calc(100% - 210px);
      .burgeon-table-wrapper .burgeon-table-body {
        /deep/ input {
          box-sizing: border-box !important;
        }
      }
      /deep/ .burgeon-table-cell {
        .burgeon-select-dropdown {
          .burgeon-select-dropdown-list {
            // .burgeon-select-item {
            //   background-color: #ee4f39;
            //   // color: #fff;
            // }
            .burgeon-select-item-selected {
              background-color: #fff !important;
              color: #fd6442;
            }
          }
        }
      }
    }
    .list_right {
      // flex: 0 0 200px;
      width: 200px;
      margin-left: 10px;
      ul {
        li {
          width: 200px;
          height: 60px;
          background: #c8c6c6;
          margin-bottom: 5px;
          text-align: center;
          line-height: 60px;
        }
        li:first-child {
          height: 80px;
          background: #ee4f39;
          line-height: 80px;
          position: relative;
          overflow: hidden;
          .subscript {
            height: 30px;
            width: 100px;
            right: -36px;
            top: 0px;
            position: absolute;
            text-align: center;
            line-height: 30px;
            font-family: "黑体";
            background-color: #ffd800;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}
</style>
