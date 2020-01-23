<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column">
          <img v-for="img in imagesThree" :src="img.thumbnail" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import 'axios'

  export default {
    name: "portfolio",
    data(){
      return {
        images: []
      }
    },
    computed: {
      imagesThree(){
        return []
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
