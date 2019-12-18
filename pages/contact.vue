<template>
  <div class="container hero is-fullheight" @keyup.esc='goHome'>
    <div class="hero-head has-text-right" @keyup.esc='goHome'>
      <Navbar class=" wow fadeInLeftBig"></Navbar>
    </div>
    <div class="hero-body">
      <div class="columns is-multiline is-centered is-full">
        <div class="column is-full has-text-centered">
          <div class="field has-addons wow fadeInUpBig">
            <p class="control">
              <a href="https://www.instagram.com/stripedpurple/" class="button"><i
                class="fa fa-instagram"></i></a>
            </p>
            <p class="control">
              <a href="https://www.instagram.com/stripedpurple/" class="button">stripedpurple</a>
            </p>
          </div>
        </div>

        <div class="column is-full has-text-centered">
          <div class="field has-addons wow fadeInUpBig">
            <p class="control">
              <a href="https://twitter.com/_stripedpurple" class="button"><i class="fa fa-twitter"></i></a>
            </p>
            <p class="control">
              <a href="https://twitter.com/_stripedpurple" class="button">_stripedpurple</a>
            </p>
          </div>
        </div>
        <div class="column is-full has-text-centered">
          <div class="field has-addons wow fadeInUpBig">
            <p class="control">
              <a href="http://m.me/stripedpurple" class="button"><i class="fa fa-facebook"></i></a>
            </p>
            <p class="control">
              <a href="http://m.me/stripedpurple" class="button">stripedpurple</a>
            </p>
          </div>
        </div>
        <div class="column is-full has-text-centered">
          <div class="field has-addons wow fadeInUpBig">
            <p class="control">
              <a href="mailto:saustin@stripedpurple.io" class="button"><i class="fa fa-envelope"></i></a>
            </p>
            <p class="control">
              <a href="mailto:austin@stripedpurple.io" class="button">austin@stripedpurple.io</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-footer"><RFooter></RFooter></div>
  </div>
</template>

<script>
  import Navbar from '~/components/navbar.vue'
  import RFooter from '~/components/reusable-footer.vue'

  export default {
    name: "contact",
    components: {
      Navbar,
      RFooter
    }
  }
</script>

<style lang="sass" scoped>
  .field.has-addons
    display: inline-flex

    .has-padding-top
      padding-top: 0.75rem

    .has-padding-right
      padding-right: 1.5rem

  .columns.is-full
    width: 100%
</style>
