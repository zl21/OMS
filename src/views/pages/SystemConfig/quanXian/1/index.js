
// 定制页面数据权限
import axios from 'axios';

export const jurisdictionConfig = {
  data() {
    return {
      PHYSICALSTORAGEAUTHORITY: { // 实体仓权限
        buttons: [
          {
            text: '保存',
            icon: '',
            btnClick: () => {

            }
          },
          {
            text: '复制',
            icon: '',
            btnClick: () => {
              this.copyModal = true;
            }
          },
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          }
        ],
        columns: [
          {

          }
        ],
        data: [],
        searchForm: [
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '实体仓',
              props: {
                data: {},
                totalRowCount: 0,
                pageSize: 10,
                showColnameKey: 'show',
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['ENAME', 'ECODE'], // 展现的组
                AutoData: []
              },
              event: {
                'on-page-change': (value) => { },
                'on-input-value-change': (value) => { },
                'on-popper-show': async (e) => {
                  const searchdata = {
                    isdroplistsearch: true,
                    refcolid: 1700804609,
                    startindex: 0,
                    range: 10
                  };
                  const param = new FormData();
                  param.append('searchdata', JSON.stringify(searchdata));
                  const res = await this.service.common.QueryList(param);
                  if (res.data.code === 0) {
                    this.searchFormConfig.defaultconfig[0].item.props.totalRowCount = res.data.datas.totalRowCount;
                    this.searchFormConfig.defaultconfig[0].item.props.data = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '邮箱',
                          show: true
                        }
                      ],
                      row: res.data.datas.row
                    };
                  }
                },
                'on-fkrp-selected': (e) => { }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '实体仓启用',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '是'
                  },
                  {
                    value: 'N',
                    label: '否'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '实体仓查看权限',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '启用'
                  },
                  {
                    value: 'N',
                    label: '未启用'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '实体仓制单权限',
              value: 'all',
              props: {
                transfer: true,
                placeholder: '',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '启用'
                  },
                  {
                    value: 'N',
                    label: '未启用'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
        ]
      },
      SALESCHANNELAUTHORITY: { // 销售渠道权限
        buttons: [
          {
            text: '保存',
            icon: '',
            btnClick: () => {

            }
          },
          {
            text: '复制',
            icon: '',
            btnClick: () => {
              this.copyModal = true;
            }
          },
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          }
        ],
        columns: [
          {
            title: '直属客户名称',
            key: 'a'
          },
          {
            title: '直属客户编码',
            key: 'b'
          },
          {
            title: '业务单元',
            key: 'c'
          },
          {
            title: '店铺名称',
            key: 'd'
          },
          {
            title: '店铺编码',
            key: 'e'
          },
          {
            title: '客户分类',
            key: 'f'
          },
          {
            title: '合作模式',
            key: 'g'
          },

          {
            title: '查看',
            key: '__look'
          },
          {
            title: '申请',
            key: '__edit'
          },
        ],
        data: [],
        searchForm: [
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '业务单元',
              props: {
                data: {},
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: 'show',
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {

                },
                'on-input-value-change': function (value) {

                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '大区',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '省区',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '省份',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '地级市',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '区县级市',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },

          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '客户分类',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '是'
                  },
                  {
                    value: 'N',
                    label: '否'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '合作模式',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '启用'
                  },
                  {
                    value: 'N',
                    label: '未启用'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
        ]
      },
      CUSTOMERRIGHTS: { // 客户权限
        buttons: [
          {
            text: '保存',
            icon: '',
            btnClick: () => {

            }
          },
          {
            text: '复制',
            icon: '',
            btnClick: () => {
              this.copyModal = true;
            }
          },
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          }
        ],
        columns: [
          {
            title: '上级客户名称',
            key: 'a'
          },
          {
            title: '上级客户编码',
            key: 'b'
          },
          {
            title: '客户名称',
            key: 'c'
          },
          {
            title: '客户编码',
            key: 'd'
          },
          {
            title: '业务单元',
            key: 'e'
          },
          {
            title: '客户分类',
            key: 'f'
          },
          {
            title: '合作模式',
            key: 'g'
          },
          {
            title: '查看',
            key: '__look'
          },
          {
            title: '申请',
            key: '__edit'
          },
        ],
        data: [],
        searchForm: [
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '业务单元',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '大区',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '省区',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '省份',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '地级市',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '区县级市',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {
                  console.log(this);
                  console.log('12');
                  console.log(self);
                  console.log(e);
                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },

          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '客户分类',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '是'
                  },
                  {
                    value: 'N',
                    label: '否'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '合作模式',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '启用'
                  },
                  {
                    value: 'N',
                    label: '未启用'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
        ]
      },
      BRANDPERMISSIONS: { // 品牌权限
        buttons: [
          {
            text: '保存',
            icon: '',
            btnClick: () => {

            }
          },
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          }
        ],
        columns: [
          {

          }
        ],
        data: [],
        searchForm: []
      },
      STOREWAREHOUSEPERMISSIONS: { // 店仓权限
        buttons: [
          {
            text: '保存',
            icon: '',
            btnClick: () => {

            }
          },
          {
            text: '复制',
            icon: '',
            btnClick: () => {
              this.copyModal = true;
            }
          },
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          }
        ],
        intermediateColumnRequired: true, // true 显示  false 不显示 判断是否需要中间列
        columns: [
          {

          }
        ],
        data: [],
        searchForm: [
          {
            item: {
              type: 'DropDownSelectFilter', // 组件类型
              label: '店仓111',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                // showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],

                event: {
                  'on-page-change': (value) => {
                    const _self = this;
                    if (value === 1) {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '总部'
                            },
                            ECODE: {
                              val: '00'
                            },
                            MIXNAME: {
                              val: '[00]总部'
                            },
                            ID: {
                              val: '4919'
                            }
                          },
                          {
                            ENAME: {
                              val: '中央仓仓库'
                            },
                            ECODE: {
                              val: '000'
                            },
                            MIXNAME: {
                              val: '[000]中央仓仓库'
                            },
                            ID: {
                              val: '1250'
                            }
                          },
                          {
                            ENAME: {
                              val: '001'
                            },
                            ECODE: {
                              val: '001'
                            },
                            MIXNAME: {
                              val: '[001]001'
                            },
                            ID: {
                              val: '4970'
                            }
                          }
                        ]
                      };
                    } else if (value === 2) {
                      _self.dataEmptyMessage = '数据加载中...';
                      setTimeout(() => {
                        _self.data1 = {
                          start: 0,
                          tabth: [
                            {
                              colname: 'ID',
                              name: 'ID',
                              show: false
                            },
                            {
                              colname: 'ECODE',
                              name: '编码',
                              show: false
                            },
                            {
                              colname: 'MIXNAME',
                              name: '[编码]名称',
                              show: true
                            },
                            {
                              colname: 'ENAME',
                              name: '名称',
                              show: false
                            }
                          ],
                          row: [
                            {
                              ENAME: {
                                val: '002'
                              },
                              ECODE: {
                                val: '002'
                              },
                              MIXNAME: {
                                val: '[002]002'
                              },
                              ID: {
                                val: '4971'
                              }
                            },
                            {
                              ENAME: {
                                val: '杭州仓库'
                              },
                              ECODE: {
                                val: '01'
                              },
                              MIXNAME: {
                                val: '[01]杭州仓库'
                              },
                              ID: {
                                val: '1240'
                              }
                            },
                            {
                              ENAME: {
                                val: '虎门仓库'
                              },
                              ECODE: {
                                val: '02'
                              },
                              MIXNAME: {
                                val: '[02]虎门仓库'
                              },
                              ID: {
                                val: '1241'
                              }
                            }
                          ]
                        };
                      }, 1000);
                    } else if (value === 3) {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '北京仓库'
                            },
                            ECODE: {
                              val: '03'
                            },
                            MIXNAME: {
                              val: '[03]北京仓库'
                            },
                            ID: {
                              val: '1242'
                            }
                          },
                          {
                            ENAME: {
                              val: '成都仓库'
                            },
                            ECODE: {
                              val: '04'
                            },
                            MIXNAME: {
                              val: '[04]成都仓库'
                            },
                            ID: {
                              val: '1243'
                            }
                          },
                          {
                            ENAME: {
                              val: '公司样衣b1'
                            },
                            ECODE: {
                              val: '0A000011'
                            },
                            MIXNAME: {
                              val: '[0A000011]公司样衣b1'
                            },
                            ID: {
                              val: '4983'
                            }
                          }
                        ]

                      };
                    } else if (value === 4) {
                      _self.dataEmptyMessage = '暂无数据';
                    }
                  },
                  'on-input-value-change': function (value) {
                    const _self = this;
                    if (value === '1') {
                      _self.AutoData = [
                        {
                          id: 0,
                          name: '03',
                          value: '北京仓库'
                        },
                        {
                          id: 1,
                          name: '04',
                          value: '南京仓库'
                        },
                        {
                          id: 3,
                          name: '05',
                          value: '成都仓库'
                        }

                      ];
                    } else if (value === '12') {
                      _self.AutoData = [
                        {
                          id: 0,
                          name: '06',
                          value: '上海仓库'
                        },
                        {
                          id: 1,
                          name: '07',
                          value: '深圳仓库'
                        },
                        {
                          id: 3,
                          name: '08',
                          value: '广州仓库'
                        }

                      ];
                    } else if (value === '123') {
                      _self.AutoData = [
                        {
                          id: 0,
                          name: '00',
                          value: '大连仓库'
                        },
                        {
                          id: 1,
                          name: '01',
                          value: '郑州仓库'
                        },
                        {
                          id: 3,
                          name: '02',
                          value: '保定仓库'
                        }

                      ];
                    } else {
                      _self.AutoData = [];
                    }
                  },
                  'on-popper-show': function (e) {
                    console.log(this);
                    console.log('12');
                    console.log(self);
                    console.log(e);
                  },
                  'on-fkrp-selected': function (e) {
                    console.log(e);
                  }
                }
              },
            }
          },
          {
            item: {
              type: 'DropMultiSelectFilter', // 组件类型
              label: '所属实体仓',
              props: {
                data: {
                  start: 0,
                  tabth: [
                    {
                      colname: 'ID',
                      name: 'ID',
                      show: false
                    },
                    {
                      colname: 'ECODE',
                      name: '编码',
                      show: false
                    },
                    {
                      colname: 'MIXNAME',
                      name: '[编码]名称',
                      show: true
                    },
                    {
                      colname: 'ENAME',
                      name: '名称',
                      show: false
                    }
                  ],
                  row: [
                    {
                      ENAME: {
                        val: '总部'
                      },
                      ECODE: {
                        val: '00'
                      },
                      MIXNAME: {
                        val: '[00]总部'
                      },
                      ID: {
                        val: '4919'
                      }
                    },
                    {
                      ENAME: {
                        val: '中央仓仓库'
                      },
                      ECODE: {
                        val: '000'
                      },
                      MIXNAME: {
                        val: '[000]中央仓仓库'
                      },
                      ID: {
                        val: '1250'
                      }
                    },
                    {
                      ENAME: {
                        val: '001'
                      },
                      ECODE: {
                        val: '001'
                      },
                      MIXNAME: {
                        val: '[001]001'
                      },
                      ID: {
                        val: '4970'
                      }
                    }
                  ]
                },
                totalRowCount: 39,
                pageSize: 10,
                showColnameKey: "'show'",
                dataEmptyMessage: '数据加载中...', // 无数据的提示
                columns: ['name', 'value'], // 展现的组
                AutoData: [],
              },
              event: {
                'on-page-change': function (value) {
                  const _self = this;
                  if (value === 1) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '总部'
                          },
                          ECODE: {
                            val: '00'
                          },
                          MIXNAME: {
                            val: '[00]总部'
                          },
                          ID: {
                            val: '4919'
                          }
                        },
                        {
                          ENAME: {
                            val: '中央仓仓库'
                          },
                          ECODE: {
                            val: '000'
                          },
                          MIXNAME: {
                            val: '[000]中央仓仓库'
                          },
                          ID: {
                            val: '1250'
                          }
                        },
                        {
                          ENAME: {
                            val: '001'
                          },
                          ECODE: {
                            val: '001'
                          },
                          MIXNAME: {
                            val: '[001]001'
                          },
                          ID: {
                            val: '4970'
                          }
                        }
                      ]
                    };
                  } else if (value === 2) {
                    _self.dataEmptyMessage = '数据加载中...';
                    setTimeout(() => {
                      _self.data1 = {
                        start: 0,
                        tabth: [
                          {
                            colname: 'ID',
                            name: 'ID',
                            show: false
                          },
                          {
                            colname: 'ECODE',
                            name: '编码',
                            show: false
                          },
                          {
                            colname: 'MIXNAME',
                            name: '[编码]名称',
                            show: true
                          },
                          {
                            colname: 'ENAME',
                            name: '名称',
                            show: false
                          }
                        ],
                        row: [
                          {
                            ENAME: {
                              val: '002'
                            },
                            ECODE: {
                              val: '002'
                            },
                            MIXNAME: {
                              val: '[002]002'
                            },
                            ID: {
                              val: '4971'
                            }
                          },
                          {
                            ENAME: {
                              val: '杭州仓库'
                            },
                            ECODE: {
                              val: '01'
                            },
                            MIXNAME: {
                              val: '[01]杭州仓库'
                            },
                            ID: {
                              val: '1240'
                            }
                          },
                          {
                            ENAME: {
                              val: '虎门仓库'
                            },
                            ECODE: {
                              val: '02'
                            },
                            MIXNAME: {
                              val: '[02]虎门仓库'
                            },
                            ID: {
                              val: '1241'
                            }
                          }
                        ]
                      };
                    }, 1000);
                  } else if (value === 3) {
                    _self.data1 = {
                      start: 0,
                      tabth: [
                        {
                          colname: 'ID',
                          name: 'ID',
                          show: false
                        },
                        {
                          colname: 'ECODE',
                          name: '编码',
                          show: false
                        },
                        {
                          colname: 'MIXNAME',
                          name: '[编码]名称',
                          show: true
                        },
                        {
                          colname: 'ENAME',
                          name: '名称',
                          show: false
                        }
                      ],
                      row: [
                        {
                          ENAME: {
                            val: '北京仓库'
                          },
                          ECODE: {
                            val: '03'
                          },
                          MIXNAME: {
                            val: '[03]北京仓库'
                          },
                          ID: {
                            val: '1242'
                          }
                        },
                        {
                          ENAME: {
                            val: '成都仓库'
                          },
                          ECODE: {
                            val: '04'
                          },
                          MIXNAME: {
                            val: '[04]成都仓库'
                          },
                          ID: {
                            val: '1243'
                          }
                        },
                        {
                          ENAME: {
                            val: '公司样衣b1'
                          },
                          ECODE: {
                            val: '0A000011'
                          },
                          MIXNAME: {
                            val: '[0A000011]公司样衣b1'
                          },
                          ID: {
                            val: '4983'
                          }
                        }
                      ]

                    };
                  } else if (value === 4) {
                    _self.dataEmptyMessage = '暂无数据';
                  }
                },
                'on-input-value-change': function (value) {
                  const _self = this;
                  if (value === '1') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '03',
                        value: '北京仓库'
                      },
                      {
                        id: 1,
                        name: '04',
                        value: '南京仓库'
                      },
                      {
                        id: 3,
                        name: '05',
                        value: '成都仓库'
                      }

                    ];
                  } else if (value === '12') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '06',
                        value: '上海仓库'
                      },
                      {
                        id: 1,
                        name: '07',
                        value: '深圳仓库'
                      },
                      {
                        id: 3,
                        name: '08',
                        value: '广州仓库'
                      }

                    ];
                  } else if (value === '123') {
                    _self.AutoData = [
                      {
                        id: 0,
                        name: '00',
                        value: '大连仓库'
                      },
                      {
                        id: 1,
                        name: '01',
                        value: '郑州仓库'
                      },
                      {
                        id: 3,
                        name: '02',
                        value: '保定仓库'
                      }

                    ];
                  } else {
                    _self.AutoData = [];
                  }
                },
                'on-popper-show': function (e) {


                },
                'on-fkrp-selected': function (e) {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '店仓仓库类型',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: '0',
                    label: '全部'
                  },
                  {
                    value: '1',
                    label: '直营'
                  },
                  {
                    value: '2',
                    label: '分销'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '店仓启用',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '是'
                  },
                  {
                    value: 'N',
                    label: '否'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '店仓查看权限',
              props: {
                transfer: true,
                placeholder: '',
                value: 'all',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '启用'
                  },
                  {
                    value: 'N',
                    label: '未启用'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },
          {
            show: true, // 是否显示隐藏
            row: 1, // 行高
            col: 1, // 列宽
            item: {
              type: 'Select', // 组件类型
              label: '店仓制单权限',
              value: 'all',
              props: {
                transfer: true,
                placeholder: '',
                options: [
                  {
                    value: 'all',
                    label: '全部'
                  },
                  {
                    value: 'Y',
                    label: '启用'
                  },
                  {
                    value: 'N',
                    label: '未启用'
                  }
                ]
              },
              event: {
                'on-change': (e) => {
                  console.log(e);
                }
              }
            }
          },


        ]
      },
      SENSITIVECOLUMNPERMISSIONS: { // 敏感列权限
        buttons: [
          {
            text: '保存',
            icon: '',
            btnClick: () => {
              this.saveJurisdiction();
            }
          },
          {
            text: '刷新',
            icon: '',
            btnClick: () => {
              this.refreshJurisdiction();
            }
          }
        ],
        columns: [
          {
            title: '敏感列',
            key: '__filter'
          },
          {
            title: '查看',
            key: '__look'
          },
          {
            title: '定制',
            key: '__edit'
          }
        ],
        data: [],
        searchForm: []
      },
      SUPPLIERAUTHORITY: { // 供应商权限
        buttons: [
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          },
          {
            text: '删除',
            icon: '',
            btnClick: () => { }
          },

        ],
        columns: [
          {

          }
        ],
        data: [],
        searchForm: [],
      },
      COMMODITYAUTHORITY: { // 商品权限
        buttons: [
          {
            text: '刷新',
            icon: '',
            btnClick: () => { }
          },
          {
            text: '删除',
            icon: '',
            btnClick: () => { }
          },

        ],

        columns: [
          {

          }
        ],
        data: [],
        searchForm: []
      },
    };
  },
  methods: {
    // 敏感列权限
    async getSENSITIVECOLUMNPERMISSIONSdata() {
      const res = await this.service.common.cgroupcolumnquery({ GROUPS_ID: this.GROUPS_ID, QUERY: '' });
      res.data.data.forEach((ele) => {
        ele.filter = ele.CP_C_COLUMN_ENAME;
        ele.__look = !(ele.ISREAD && ele.ISREAD == 'N');
        ele.__edit = !(ele.ISMODIFY && ele.ISMODIFY == 'N');
        ele.__disabled = false;
      });
      this.tableConfig.data = res.data.data;
      // axios({
      //   method: 'get',
      //   url: '/p/cs/cgroupcolumnquery',
      //   params: { GROUPS_ID: this.GROUPS_ID, QUERY: '' }
      // }).then((res) => {
      //   res.data.data.forEach((ele) => {
      //     ele.filter = ele.CP_C_COLUMN_ENAME;
      //     ele.__look = !(ele.ISREAD && ele.ISREAD == 'N');
      //     ele.__edit = !(ele.ISMODIFY && ele.ISMODIFY == 'N');
      //     ele.__disabled = false;
      //   });
      //   this.tableConfig.data = res.data.data;
      // });
    },
    // 销售渠道权限
    async getSALESCHANNELAUTHORITYdata() {
      const query = {
        GROUPS_ID: 93,
        SOURCE_TYPE_IDS: '',
        IS_ACTIVE: 'all',
        IS_READ: 'all',
        IS_MAIN: 'all',
      };
      const res = await this.service.common.queryShopPermission(query);
      res.data.data.forEach((ele) => {
        ele.filter = ele.CP_C_PLATFORM_ENAME;
        ele.__look = !(ele.IS_READ && ele.IS_READ == 'N');
        ele.__edit = !(ele.IS_MODIFY && ele.IS_MODIFY == 'N');
        ele.__disabled = ele.ISACTIVE != 'Y';
      });
      this.tableConfig.data = res.data.data;
      // axios({
      //   method: 'get',
      //   url: '/p/cs/queryShopPermission',
      //   params: {
      //     GROUPS_ID: 93,
      //     SOURCE_TYPE_IDS: '',
      //     IS_ACTIVE: 'all',
      //     IS_READ: 'all',
      //     IS_MAIN: 'all',
      //   }
      // }).then((res) => {
      //   res.data.data.forEach((ele) => {
      //     ele.filter = ele.CP_C_PLATFORM_ENAME;
      //     ele.__look = !(ele.IS_READ && ele.IS_READ == 'N');
      //     ele.__edit = !(ele.IS_MODIFY && ele.IS_MODIFY == 'N');
      //     ele.__disabled = ele.ISACTIVE != 'Y';
      //   });
      //   this.tableConfig.data = res.data.data;
      // });
    },
    // 客户权限
    getCUSTOMERRIGHTSdata() {
      axios({
        method: 'get',
        url: '/p/cs/cgroupcolumnquery',
        params: { GROUPS_ID: 3, QUERY: '' }
      }).then((res) => {
        res.data.data.forEach((ele) => {
          ele.filter = ele.CP_C_COLUMN_ENAME;
          ele.__look = !(ele.ISREAD && ele.ISREAD == 'N');
          ele.__edit = !(ele.ISMODIFY && ele.ISMODIFY == 'N');
          ele.__disabled = false;
        });
        this.tableConfig.data = res.data.data;
      });
    },
  }
};
