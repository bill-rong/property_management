<template>
  <div>用户大厅</div>
</template>

<script>
export default {
  data() {
   return {

   } 
  },
  created() {
    this.$emit("indexCreate", "index");
  }
}
</script>

<style>

</style>