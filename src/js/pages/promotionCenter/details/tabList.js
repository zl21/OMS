export default {
  name: 'tablist',
  data() {
    return {
      edit: false, // tab标签编辑
      // current:this.currentTab
    };
  },
  
  props: {
    currentTab: {
      type: Number
    }, // 当前选中
    panels: {
      type: Array
    }
  },
  computed: {
    current: {
      get() {
        return this.currentTab;
      },
      set(val) {
        this.$emit('update:currentTab', val);
      }
    }
  },
  methods: {
    showClass(index) {
      return this.current == index ? 'tab_item tab_active' : 'tab_item';
    },
    /**
     * 展示tab标题
     */
    showTitle(index, item) {
      if (index === this.current && this.edit) return true;
      return false;
    },
    showContent(index) {
      return this.current === index;
    },
    /**
     *  不可编辑tab
     */
    noedit(event, item) {
      item.group = event.target.value === '' ? item.group : event.target.value;
      this.edit = false;
    },
    /**
     * 选中tab,展示对应内容区域
     */
    handleHeaderClick(index) {
      this.current = index;
    },
    /**
     * tab标签是否可编辑
     */
    handleHeaderDbClick(index) {
      this.handleHeaderClick(index);
      this.edit = true;
    },
    check(event, item) {
      if (item.unit === '件') {
        event.target.value = event.target.value.match(/^[1-9]\d{0,2}/) ? event.target.value.match(/^[1-9]\d{0,2}/)[0] : '';
      }
    }
  },
  mounted() {}
};
