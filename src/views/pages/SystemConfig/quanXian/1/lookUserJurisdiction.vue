<template>
  <div class="lookUserJurisdiction">
    <div class="right_box">
      <FilterTree
        class="FilterTree"
        :treeAttribute="rightConfig.treeAttribute"
        :treeEvent="rightConfig.treeEvent"
        :clearable="rightConfig.clearable"
        :placeholder="rightConfig.placeholder"
      ></FilterTree>
    </div>
    <div class="center_box">
      <Input placeholder="用户名" style="width: 100%">
        <Icon type="ios-search" slot="suffix" />
      </Input>
      <Table style="margin-top:8px;" :columns="centerConfig.columns" :data="centerConfig.data"></Table>
    </div>
    <div class="left_box">
      <Row>
        <Col span="24">
          <Tabs type="card">
            <TabPane label="标签一">标签一的内容</TabPane>
            <TabPane label="标签二">标签二的内容</TabPane>
            <TabPane label="标签三">标签三的内容</TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const { FilterTree } = R3.components;
export default {
  components: {
    FilterTree
  },
  data() {
    return {
      rightConfig: {
        treeAttribute: {
          data: []
        },
        treeEvent: {
          "on-select-change": (a, b) => {
            console.log(a, b, "on-select-change");
          }
        },
        clearable: true,
        placeholder: "请输入机构编码或名称"
      },
      centerConfig: {
        columns: [
          {
            title: "用户名",
            key: "name"
          },
          {
            title: "用户姓名",
            key: "age"
          }
        ],
        data: [
          {
            name: "John Brown",
            age: 18
          },
          {
            name: "Jim Green",
            age: 24
          },
          {
            name: "Joe Black",
            age: 30
          },
          {
            name: "Jon Snow",
            age: 26
          }
        ]
      },
      leftConfig: {}
    };
  },
  mounted() {
    this.getRoleData();
  },
  methods: {
    getRoleData() {
      axios({
        url: "/p/cs/groupTreeload",
        method: "post",
        data: {}
      }).then(res => {
        if (res.data.code === 0) {
          [...res.data.data].forEach((father, fatherIndex) => {
            if (fatherIndex == 0) {
              father.expand = true;
              father.selected = true;
            }
            father.title = father.NAME;
            father.children.forEach(son => {
              son.title = son.NAME;
              son.children.forEach(grandson => {
                grandson.title = grandson.NAME;
              });
            });
          });
          this.rightConfig.treeAttribute.data = res.data.data;
        } else {
          this.$Modal.error({
            title: "提示",
            content: res.data.message,
            cancelType: true,
            titleAlign: "left",
            mask: true,
            draggable: true,
            keyDown: event => {
              if (event.keyCode == 27 || event.keyCode == 13) {
                self.$Modal.remove();
              }
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
@import "~@/css/pages/SystemConfig/quanXian/1/lookUserJurisdiction.less";
</style>
