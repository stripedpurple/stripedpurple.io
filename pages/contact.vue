<template>
  <div class="container hero is-fullheight" @keyup.esc='goHome'>
    <div class="hero-head has-text-right"@keyup.esc='goHome'>
      <a href="/"><i class="fa fa-fw fa-lg fa-times has-padding-right has-padding-top"></i></a>
    </div>
    <div class="hero-body" @keyup.esc='goHome'>
      <div class="columns is-multiline is-centered">
        <div class="column is-full has-text-centered">
          <div class="field has-addons">
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
          <div class="field has-addons">
            <p class="control">
              <a href="https://twitter.com/_stripedpurple" class="button"><i class="fa fa-twitter"></i></a>
            </p>
            <p class="control">
              <a href="https://twitter.com/_stripedpurple" class="button">_stripedpurple</a>
            </p>
          </div>
        </div>
        <div class="column is-full has-text-centered">
          <div class="field has-addons">
            <p class="control">
              <a href="http://m.me/stripedpurple" class="button"><i class="fa fa-facebook"></i></a>
            </p>
            <p class="control">
              <a href="http://m.me/stripedpurple" class="button">stripedpurple</a>
            </p>
          </div>
        </div>
        <div class="column is-full has-text-centered">
          <div class="field has-addons">
            <p class="control">
              <a href="mailto:saustin@stripedpurple.io" class="button"><i class="fa fa-envelope"></i></a>
            </p>
            <p class="control">
              <a href="mailto:saustin@stripedpurple.io" class="button">austin@stripedpurple.io</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-footer"></div>
  </div>
</template>

<script>
    export default {
        name: "contact",
        methods: {
            goHome: function () {
                this.$route.push('/');
                console.log('here');
            }
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
</style>
