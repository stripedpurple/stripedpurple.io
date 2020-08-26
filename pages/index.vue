<template>
  <div class="section is-fullheight is-flex">
    <div class="container">
      <div class="columns is-centered">
        <div class="column has-text-centered">
          <logo class="wow fadeInUpBig"/>
          <br>
          <h1 class="title  wow fadeInUpBig">Austin Barrett</h1>
          <h2 class="subtitle  wow fadeInUpBig">Photographer, Developer, &amp; Magician Extraordinaire
            ♣️♥️♠️♦️</h2>
          <div class="buttons is-centered">
            <!--   About      -->
            <!--            <nuxt-link to="/about" class="button wow fadeInUpBig is-primary">About</nuxt-link>-->

            <!--   Portfolio      -->
            <nuxt-link class="button wow fadeInUpBig is-primary" to="/portfolio/photography">Photography</nuxt-link>
            <nuxt-link class="button wow fadeInUpBig is-primary" to="/portfolio/web">Web Design/Dev</nuxt-link>

            <!--     Shop       -->
            <a class="button wow fadeInUpBig is-primary" href="https://stripedpurple.darkroom.tech/" target="_blank">Prints</a>
            <a class="button wow fadeInUpBig is-primary" href="https://www.redbubble.com/people/VCOBA/shop"
               target="_blank">Graphic Designs</a>
          </div>
          <div class=" wow fadeInUpBig">
            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="https://www.instagram.com/stripedpurple/" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark">
                <b-icon pack="fab" icon="instagram" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

            <b-tooltip label="@viruscmd" type="is-dark">
              <a href="https://github.com/viruscmd" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark">
                <b-icon pack="fab" icon="github" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="" target="_blank" rel="noopener noreferrer" class="has-text-grey-dark">
                <b-icon pack="fab" icon="medium" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="https://codepen.io/stripedpurple" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark">
                <b-icon pack="fab" icon="codepen" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

            <b-tooltip label="@_stripedpurple" type="is-dark">
              <a href="https://twitter.com/_stripedpurple" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark">
                <b-icon pack="fab" icon="twitter" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="https://www.linkedin.com/in/stripedpurple/" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark">
                <b-icon pack="fab" icon="linkedin" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

            <b-tooltip label="austin@stripedpurple.io" type="is-dark">
              <a href="mailto:austin@stripedpurple.io?subject=Website Contact" target="_blank"
                 rel="noopener noreferrer" class="has-text-grey-dark">
                <b-icon pack="fas" icon="paper-plane" custom-class="fa-fw"></b-icon></a>
            </b-tooltip>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="sass">
  .is-flex
    place-items: center
  .title
    color: #35495e

  .subtitle
    color: #526488

  .icon::v-deep
    margin: 0 0.5rem
</style>
