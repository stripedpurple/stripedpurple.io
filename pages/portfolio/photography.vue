<template>
  <section>
    <NavBar/>
    <div class="container">
      <div class="columns" v-show="images.length < 1">
        <div class="column">
          <p class="has-text-centered">Loading...</p>
          <progress class="progress is-large is-primary" max="100">60%</progress>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-full">
          <p class="title">Total: {{ images.length }}</p>
          <p class="subtitle">Combined Total: {{ imagesFirst.length + imagesSecond.length + imagesThird.length }}</p>
        </div>
        <div class="column">
          <figure class="image" v-for="(img, index) in imagesFirst">
            <img :src="img.thumb" :alt="index">
          </figure>
        </div>

        <div class="column">
          <figure class="image" v-for="(img, index) in imagesSecond">
            <img :src="img.thumb" :alt="index">
          </figure>
        </div>

        <div class="column">
          <figure class="image" v-for="(img, index) in imagesThird">
            <img :src="img.thumb" :alt="index">
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import NavBar from '~/components/NavBar.vue';

  export default {
    name: "portfolio",
    data(){
      return {
        images: []
      }
    },
    components: {
      NavBar
    },
    computed: {
      imagesFirst(){
        return this.images.filter((_,i) => (i + 3) % 3 === 1)
      },
      imagesSecond(){
        return this.images.filter((_,i) => (i + 3) % 3 === 2)
      },
      imagesThird(){
        return this.images.filter((_,i) => (i + 3) % 3 === 0)
      }
    },
    methods: {
      async getPhotos (id) {
        const res = await this.$axios.$get(`/api/photos/${id}`);
        this.images = res
      }
    },
    mounted() {
      this.getPhotos('forster2019')
    }
  }
</script>

<style lang="sass" scoped>
  figure.image
    padding: 0 0 1.5rem 0

</style>
