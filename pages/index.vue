<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Austin Barrett
      </h1>
      <h2 class="subtitle">
        Photographer, Developer, &amp; Camping Enthusiast ⛺️🔥
      </h2>
      <div class="links">
        <a href="/about" class="button is-primary is-medium">About</a>
        <a href="/portfolio" class="button is-primary is-medium">Portfolio</a>
        <a href="/portfolio" class="button is-primary is-medium">Blog</a>
        <a href="/portfolio" class="button is-primary is-medium">Shop</a>
      </div>
      <div class="links">
        <a href="https://github.com/viruscmd" target="_blank"
          class="button"><i class="fa fa-github fa-fw fa-lg"></i>&nbsp;&nbsp;GitHub</a>
        <a href="https://www.instagram.com/stripedpurple/" target="_blank"
           class="button"><i class="fa fa-fw fa-lg fa-instagram"></i>&nbsp;&nbsp;Instagram</a>
        <a href="/contact" class="button"><i class="fa fa-fw fa-lg fa-paper-plane"></i>&nbsp;&nbsp;Contact</a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
