<template>
  <div>
    <Navi/>
    <section class="section">
      <div class="container">
        <div class="columns is-centered is-multiline is-mobile">
          <div class="column is-one-third" v-for="(img, index) in photos.slice(0,photoCount)">
            <figure class="image is-1by1" :style="`background-image: url(/${img.path}-thumb.jpg)`">
              <div class="magnify" @click.prevent="showModal(`/${img.path}.jpg`)">
                <div class="has-text-centered" style="margin: -1rem">
                  <b-icon icon="search-plus" size="is-large" custom-class="fa-3x"/>
                  <p class="has-text-light has-text-weight-bold is-hidden-mobile" v-if="img.location">
                    {{img.location}}
                  </p>
                </div>
              </div>
            </figure>
          </div>

        </div>
          <div id="observer"></div>
      </div>
    </section>

    <reusable-footer/>

    <b-modal :active.sync="isOpen">
      <figure class="image">
        <img :src="isOpenImg"/>
      </figure>
    </b-modal>

    <meta-tags title="Photography Gallery" description="A visual journey through the lens of Austin Barrett"/>
  </div>
</template>

<script>
  import data from '../../assets/media.json'

  export default {
    name: "photography-portfolio",
    data() {
      return {
        isOpen: false,
        isOpenImg: '',
        photos: data.photos,
        photoCount: 30
      }
    },
    methods: {
      showModal(img) {
        this.isOpen = true;
        this.isOpenImg = img;
      }
    },
    mounted() {
      let observer = document.getElementById('observer');
      let innerHeight = window.innerHeight + 500;

      document.addEventListener("scroll", () => {
        if (observer.getBoundingClientRect().top < innerHeight) {
          this.photoCount += 9
        }

      });
    }
  }
</script>

<style lang="sass" scoped>
  .image
    background: #fefefe
    background-size: cover
    background-position: center
    background-repeat: no-repeat

    .magnify
      position: absolute
      padding: 1rem
      top: 0
      z-index: 1
      display: grid
      place-items: center
      height: 100%
      width: 100%
      opacity: 0
      background: rgba(0, 0, 0, 0.25)
      color: whitesmoke
      transition: all ease-in-out 0.3s

      &:hover
        opacity: 1
</style>
