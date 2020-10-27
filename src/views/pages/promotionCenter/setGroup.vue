<!-- 设置分组 -->
<template>
  <div
    v-if="dialogVisible"
    class="setGroup"
  >
    <el-dialog
      :visible.sync="dialogVisible"
      center
      title="设置分组"
      :before-close="closeDialog"
      width="60%"
    >
      <div class="setGroupEdit">
        <el-radio
          v-model="itemdata.radio"
          label="1"
        >
          设置分组
        </el-radio>
        <!-- <input class="groupInput" type="text" v-model="itemdata.setGroupName" >-->
        <div class="setGroupName">
          <i class="labelTitle">分组名称：</i><el-input
            v-model="itemdata.setGroupName"
            class="groupInput"
          />
        </div>
        <el-radio
          v-model="itemdata.radio"
          class="lastRadio"
          label="2"
        >
          取消分组
        </el-radio>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            width="50"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item,index) in tHead"
            :key="index"
            :prop="item.name"
            :label="item.label"
            :sortable="item.name=='PM_PRIORITY'"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <div style="height:24px">
                <el-input
                  v-if="itemdata.radio == 1 && scope.column.property =='PM_PRIORITY'"
                  v-model="scope.row.PM_PRIORITY"
                  class="priority"
                  oninput="this.value.length ==1?this.value= this.value.replace(/[^1-9]/g, ''):this.value= this.value.replace(/\D/g, '')"
                />
                <span v-else>{{ scope.row[scope.column.property] }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="del(scope)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        slot="footer"
        class="footer"
      >
        <button
          class="active"
          @click="confirm"
        >
          确 定
        </button>
        <button
          class="white"
          @click="closeDialog"
        >
          取 消
        </button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import setGroup from "@/js/pages/promotionCenter/setGroup";
  export default setGroup;
</script>
<style lang="less">
.setGroup{
    .setGroupEdit{
        .el-radio{
            margin-right:20px;
            font-weight:initial;
        }
        .lastRadio{
            display:block;
            margin-top:10px;
        }
        .setGroupName{
            display:inline-block;
            font-size: 14px;
            position:relative;
            .labelTitle{
                width:70px;
                font-style: normal;
                text-align: right;
                position:absolute;
                line-height: 24px;
            }
            .groupInput{
                height:24px;
                padding-left: 70px;
                .el-input__inner{
                    height:24px;
                    line-height: 24px;
                }
            }
        }
    }
    .table{
        
        padding-top:10px;
        .el-table__header-wrapper{
            font-size: 13px;
            .has-gutter tr th{
                padding:0;
                height:34px;
            }
        }
        .el-table__body-wrapper{
            .el-table__body tr td{
                padding:0;
                height:34px;
            }
        }
        .priority{
            height:22px;
            line-height: 22px;
            .el-input__inner{
                height:22px;
                line-height: 22px;
                text-align: center;
            }
        }
    }
    .footer{
        text-align: right;
        button{
            height: 24px;
            min-width: 50px;
            line-height: 24px;
            padding: 0 8px;
            border: 1px solid #fd6442;
            font-size: 12px;
            background: #fff;
            color: #fd6442;
            border-radius: 2px;
            margin-right: 5px;
        }
        .active{
            background: #fd6442;
            color: #fff;
            margin-right: 8px;
        }
        .white{

        }
    }
}
</style>
