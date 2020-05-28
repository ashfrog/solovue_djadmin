<template>
  <div>
    <h2 @click="toggleClick">我是一个PositionSelector组件</h2>
  </div>
</template>

<script>
  export default {
    name: 'PositionSelector',
    props: {
      isActive: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleClick() {
        console.log("click")
      }
    }
  }
</script>

<style>
</style>
