export default {
  props: {
    labelList: {
      type: Array,
      required: true
    }, //渲染数据
    isMultiSelect: {
      type: Boolean,
      default: false
    }, //控制是否单选
    labelDefaultValue: {
      type: [String],
      default: ""
    } //设置默认值
  },
  data() {
    return {
      defaultData: null
    };
  },
  mounted() {
    this.defaultData = this.labelDefaultValue;
  },
  watch: {
    labelDefaultValue(val) {
      this.defaultData = this.labelDefaultValue;
    },
  },
  methods: {
    // 单选
    click(item, index) {
      this.defaultData = item.value;
      this.$emit("labelClick", item, index);
    }
  }
};