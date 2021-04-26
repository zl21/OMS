export default {
  name: 'SingleBox',
  data() {
    return {
      name: '',
      norefresh: true,
    };
  },
  watch: {
    value(val) {
      this.initData();
    },
    options: {
      handler(val) {
        this.initData();
      },
      deep: true
    }
  },
  props: {
    value: {
      type: String,
      default: () => ''
    },
    options: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array
    }
  },
  methods: {
    /**
       * 初始化单选值
       */
    initData() {
      this.name = '';
      const obj = this.options.find(opt => opt.value === this.value);
      if (obj) this.name = obj.title;
      this.$nextTick(() => {
        const obj = this.options.find(opt => opt.value === this.value);
        if (obj) this.name = obj.title;
      });
    },
    /**
       * 单选值
       */
    checkChange(name) {
      const obj = this.options.find(opt => opt.title === name);
      if (obj) {
        this.$emit('changeSingle', obj.value);
      }
    }
  },
  mounted() {
    this.initData();
  }
};
