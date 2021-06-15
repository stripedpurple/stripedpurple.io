<template>
  <div class="section is-fullheight is-flex">
    <div class="container is-fluid">
      <div class="columns is-centered">
        <div class="column has-text-centered">
          <logo class="wow fadeInUpBig"/>
          <br>
          <h1 class="title  wow fadeInUpBig">Austin Barrett</h1>
          <h2 class="subtitle  wow fadeInUpBig">Photographer, Developer, &amp; Magician Extraordinaire
            <span class="close">
              <sp-icon icon="club" :paths="3"/>
              <sp-icon icon="heart" :paths="2"/>
              <sp-icon icon="spade" :paths="2"/>
              <sp-icon icon="diamond" :paths="2"/>
            </span>️</h2>
          <div class="buttons is-centered">

            <!--   About      -->
            <nuxt-link to="/about" class="button wow fadeInUpBig is-primary">About</nuxt-link>

            <!--   Portfolio      -->
            <nuxt-link class="button wow fadeInUpBig is-primary" to="/portfolio/photography">Photography</nuxt-link>
            <nuxt-link class="button wow fadeInUpBig is-primary" to="/portfolio/web">Web Design/Dev</nuxt-link>

            <!--     Shop       -->
            <a class="button wow fadeInUpBig is-primary" href="https://stripedpurple.darkroom.tech/" target="_blank"
               rel="noreferrer noopener">Shop Prints</a>
<!--            <a class="button wow fadeInUpBig is-primary" href="https://www.redbubble.com/people/VCOBA/shop"-->
<!--               target="_blank" rel="noreferrer noopener">Graphic Designs</a>-->

          </div>
          <div class=" wow fadeInUpBig">
            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="https://www.instagram.com/stripedpurple/" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark" style="margin-right: 0.5rem">
                <sp-icon size="is-medium is-size-4" icon="instagram"/></a>
            </b-tooltip>

            <b-tooltip label="@viruscmd" type="is-dark">
              <a href="https://github.com/stripedpurple" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark" style="margin-right: 0.5rem">
                <sp-icon size="is-medium is-size-4" icon="github"/></a>
            </b-tooltip>

            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="" target="_blank" rel="noopener noreferrer" class="has-text-grey-dark" style="margin-right: 0.5rem">
                <sp-icon size="is-medium is-size-4" icon="medium"/></a>
            </b-tooltip>

            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="https://codepen.io/stripedpurple" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark" style="margin-right: 0.5rem">
                <sp-icon size="is-medium is-size-4" icon="codepen"/></a>
            </b-tooltip>

            <b-tooltip label="@_stripedpurple" type="is-dark">
              <a href="https://twitter.com/_stripedpurple" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark" style="margin-right: 0.5rem">
                <sp-icon size="is-medium is-size-4" icon="twitter"/></a>
            </b-tooltip>

            <b-tooltip label="@stripedpurple" type="is-dark">
              <a href="https://www.linkedin.com/in/stripedpurple/" target="_blank" rel="noopener noreferrer"
                 class="has-text-grey-dark" style="margin-right: 0.5rem">
                <sp-icon size="is-medium is-size-4" icon="linkedin"/></a>
            </b-tooltip>

            <b-tooltip label="austin@stripedpurple.io" type="is-dark">
              <a href="mailto:austin@stripedpurple.io?subject=Website Contact" target="_blank"
                 rel="noopener noreferrer" class="has-text-grey-dark" >
                <sp-icon size="is-medium is-size-4" icon="plane"/></a>
            </b-tooltip>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import SpIcon from "../components/sp-icon";

  export default {
    components: {
      SpIcon,
      Logo
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="sass">
  .close
    .icon:not(:last-child)::v-deep
      margin-right: -0.5rem
  html,body
    &.has-navbar-fixed-top
      padding-top: 0 !important

  .is-flex
    place-items: center

  .title
    color: #35495e

  .subtitle
    color: #526488


</style>
