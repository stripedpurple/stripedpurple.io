<template>
    <span :class="`icon ${size}`">
      <span :class="`sp-${icon}`">
        <span :class="`path${n+1}`" v-for="(i,n) in path"></span>
      </span>
    </span>
</template>

<script>
  export default {
    name: "sp-icon",
    data() {
      return {
        path: []
      }
    },
    props: {
      icon: String,
      size: String,
      paths: Number
    },
    mounted() {
      this.path = [...Array(this.paths).keys()]
    }
  }
</script>
