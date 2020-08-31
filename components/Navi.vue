<template>
  <b-navbar :fixed-top="fixed"	spaced class="wow fadeInUp">
    <template slot="brand">
      <b-navbar-item tag="nuxt-link" to="/">
        <img src="/img/logo.jpg" alt="Striped Purple" class="is-rounded">&nbsp;&nbsp;&nbsp;Striped Purple
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="nuxt-link" to="/">Home</b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/portfolio/photography">Photography</b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/portfolio/web">Web Design/Dev</b-navbar-item>
      <b-navbar-item tag="a" href="https://stripedpurple.darkroom.tech/" target="_blank" rel="noreferrer noopener">Shop Prints</b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/about">About</b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/contact">Say Hello</b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
  export default {
    name: "Navi",
    props: {
      fixed: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped lang="sass">
  .navbar-brand
    .navbar-item
      text-decoration: none
  .navbar-item
    text-decoration: underline
</style>
