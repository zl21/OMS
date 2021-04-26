export default {
  data() {
    return {};
  },

  props: {
    btnConfig: {
      type: Object
    }
  },

  methods: {
    dropDownClick(name,...eventlist) {
      this.$emit('dropDownClick', name,eventlist)
    },
    button(ref) {
      this.$emit("buttonEvent", ref, this);
    }
  }
};