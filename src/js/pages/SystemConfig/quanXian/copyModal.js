import qs from 'qs';

export default {
  props: {
    copyModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultColumn: 1,
      config: [
        {
          item: {
            type: 'AttachFilter', // 组件类型
            required: true, // 是否必填
            label: '原角色',
            props: {
              placeholder: '气泡弹框',
              value: '',
              regularMessage: '', // 报错提示
              AuotData: [],
              columnsKey: ['NAME'],
              hidecolumns: ['DESCRIPTION', 'ID'],
              'filter-method': this.filterMethod
            },
            event: {
              'on-select': (value) => {
                this.copyModalConfig.originalRole = value.value;
              }
            }
          }
        },
        {
          item: {
            type: 'DropMultiSelectFilter', // 组件类型
            label: '目的角色',
            props: {
              data: {},
              totalRowCount: 0,
              pageSize: 10,
              showColnameKey: 'show',
              dataEmptyMessage: '数据加载中...', // 无数据的提示
              columns: ['INDEX', 'NAME'], // 展现的组
              AutoData: []
            },
            event: {
              'on-page-change': () => { },
              'on-input-value-change': () => { },
              'on-popper-show': async () => {
                const query = {
                  params: {
                    id: this.copyModalConfig.originalRole
                  }
                };
                const res = await this.service.common.getCopyTargetGroups(qs.stringify(query));
                if (res.data.code === 0) {
                  this.config[1].item.props.totalRowCount = res.data.data.length;
                  const cc = [];
                  res.data.data.forEach((item, index) => {
                    cc[index] = {
                      ID: {
                        val: item.id
                      },
                      INDEX: {
                        val: index
                      },
                      NAME: {
                        val: item.name
                      }
                    };
                  });
                  this.config[1].item.props.data = {
                    start: 0,
                    tabth: [
                      {
                        colname: 'ID',
                        name: 'ID',
                        show: false
                      },
                      {
                        colname: 'INDEX',
                        name: '序号',
                        show: false
                      },
                      {
                        colname: 'NAME',
                        name: '名称',
                        show: true
                      }
                    ],
                    row: cc
                  };
                  console.log(this.config);
                }
              },
              'on-fkrp-selected': (e) => {
                this.copyModalConfig.destinationRole = e.map(item => item.ID);
                console.log(this.copyModalConfig.destinationRole);
              }
            }
          }
        },
        {
          show: false, // 是否显示隐藏
          row: 1, // 行高
          col: 1, // 列宽
          item: {
            type: 'Select', // 组件类型
            required: true,
            label: '复制方式',
            props: {
              placeholder: '请选择复制方式',
              options: [
                {
                  value: 'cover',
                  label: '覆盖原有权限'
                },
                {
                  value: 'copy',
                  label: '保留原有权限'
                }
              ]
            },
            event: {
              'on-change': (e) => {
                this.copyModalConfig.replicationMode = e;
                console.log(e);
              }
            }
          }
        }
      ],
      copyModalConfig: {
        originalRole: '',
        destinationRole: [],
        replicationMode: ''
      }
    };
  },
  methods: {
    filterMethod(val, option) {
      return option.NAME.indexOf(val) !== -1;
    },
    sureBtn() {
      const params = {
        sourceId: this.copyModalConfig.originalRole,
        targetIdList: this.copyModalConfig.destinationRole,
        type: this.copyModalConfig.replicationMode
      };
      this.$emit('sure-btn', params);
    },
    cancelBtn() {
      this.$emit('cancel-btn');
    },
    async getOriginRole() { // 获取原角色全部数据
      const query = {
        param: '%7B%7D'
      };
      const res = await this.service.common.cgroupsquery(qs.stringify(query));
      console.log(res);
      if (res.data.code === 0) {
        this.config[0].item.props.AuotData = res.data.data;
      } else {
        this.$Message.warning('原角色请求失败!');
      }
    }
  },
  watch: {
    copyModal(val) {
      if (val) {
        this.getOriginRole();
      }
    }
  }
};
