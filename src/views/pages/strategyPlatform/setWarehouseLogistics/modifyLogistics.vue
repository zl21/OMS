<template>
  <div class="modifyLogistics">
    <div class="modifyBox">
      <div class="modifyLeft">
        <div class="retrieveBox">
          <span class="retrieveTitle">检索</span>
          <Input
            v-model="name"
            :expand="false"
            class="retrieve"
            @on-enter="getLogistics(name, 1)"
          />
          <Icon
            slot="suffix"
            type="ios-search"
            @click="getLogistics(name, 1)"
          />
          </Input>
        </div>
        <business-action-table
          :jordan-table-config="jordanTableConfig"
          @on-row-dblclick="onRowDblclick"
          @on-select="OnSelect"
          @on-select-all="SelectAll"
          @on-select-all-cancel="SelectAllCancel"
          @on-select-cancel="Cancel"
        />
      </div>
      <div class="modifyMiddle">
        <Button
          size="small"
          @click="synchronous"
        >
          >>
        </Button>
      </div>
      <div class="modifyRight">
        <div class="selectedModify">
          <div class="selectedTop">
            <p>
              已选中（
              <span>{{ total }}条</span>）
            </p>
            <Icon
              size="20"
              type="ios-trash-outline"
              @click="DeleteAll"
            />
          </div>
          <div class="selectedList">
            <ul>
              <li
                v-for="(item, index) in selectData"
                :key="index"
              >
                <p>{{ item.CP_C_LOGISTICS_ENAME }}</p>
                <span @click="DeleteSelect(item.CP_C_LOGISTICS_ECODE, item.ID)">X</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <business-button :btn-config="btnConfig" />
    <Modal
      v-model="cancelModel"
      :mask="true"
      :mask-closable="false"
      title="提示"
      width="400"
      @on-cancel="cancalModal"
      @on-ok="okClick"
    >
      <p>请确认是否需要删除物流公司</p>
    </Modal>
    <div
      v-show="removeLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
  </div>
</template>

<script>
  
  import modifyLogistics from "@/js/pages/strategyPlatform/setWarehouseLogistics/modifyLogistics.js";
  export default modifyLogistics;
</script>

<style lang="less">
  .modifyLogistics {
    .modifyBox {
      margin-bottom: 8px;
      display: flex;

      .modifyLeft {
        width: 65%;
        height: 400px;
        overflow: auto;
        border: 1px solid #d3d3d3;

        .retrieveBox {
          margin: 8px 0 0 8px;
          font-size: 0;

          .retrieveTitle {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            background: #ddd;
            width: 36px;
            height: 26px;
            line-height: 26px;
            font-size: 14px;
          }

          .retrieve {
            width: 60%;
            display: inline-block;
          }
        }

        .jordan-table-box {
          height: 90%;
        }

        .jordan-table-box .burgeon-table-wrapper {
          margin: 0 !important;
        }
      }

      .modifyMiddle {
        height: 400px;
        padding: 0 5px;

        button {
          border-color: #ec6e4e;
          color: #ec6e4e;
          margin-top: 180px;

          span {
            vertical-align: top !important;
          }
        }
      }

      .modifyRight {
        width: 32%;
        height: 400px;
        overflow: auto;
        border: 1px solid #d3d3d3;

        .selectedModify {
          .selectedTop {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #999;
            padding: 0 3px 3px 5px;
            margin: 8px 16px;

            p {
              margin-top: 3px;
              color: #999;
              font-size: 14px;
              line-height: 14px;

              span {
                color: red;
              }
            }

            i {
              color: red;
            }
          }

          .selectedList {
            padding: 0 16px 16px;
            overflow: auto;

            ul {
              li {
                position: relative;
                text-align: center;
                height: 26px;
                line-height: 26px;
                background: #f5f6fa;
                color: blue;
                margin-bottom: 8px;

                p {
                  width: 170px;
                  padding-left: 7px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                span {
                  color: #333;
                  cursor: pointer;
                  position: absolute;
                  top: 0;
                  right: 7px;
                }
              }
            }
          }
        }
      }
    }

    .fromLoading {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 1000 !important;
    }
  }
</style>
