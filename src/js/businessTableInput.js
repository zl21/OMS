import myInput from "framework/components/input/objinput_dz.vue";
export default {
  components: {
    myInput
  },
  data() {
    return {};
  },
  props: {
    tableFormConfig: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    runMethods(val){
      if(val){
        val(e);
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  }
};