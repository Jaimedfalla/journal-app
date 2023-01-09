<template>
  <button class="btn btn-primary" @click="onClick">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
export default {
  props:{
    icon:{
      type:String,
      default:'fa-plus'
    }
  },
  methods:{
    onClick(){
      this.$emit('on:click');
    }
  }
}
</script>

<style lang="scss" scoped>
button{
    border-radius: 100%;
    bottom: 20px;
    height: 50px;
    padding: 5px;
    position:fixed;
    right: 20px;
    width: 50px;
}
</style>