export default {
  props: {
    buttonConfig: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  computed: {
    config() {
      console.log('this.buttonConfig', this.buttonConfig);
      return this.buttonConfig;
    }
  },
  mounted() {
    console.log('this.buttonConfig::', this.buttonConfig);
    console.log(window);
    console.log('this.$route::', this.$route);
  },
  methods: {}
};
