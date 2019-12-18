<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img class="is-rounded" src="/img/logo.png" width="28" height="28">
        &nbsp;&nbsp;Striped Purple
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="show=!show" :class="{'is-active': show}"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{'is-active': show}">
      <div class="navbar-end">
        <a href="/" class="navbar-item">Home</a>
        <a href="/portfolio" class="navbar-item">Portfolio</a>
        <a href="https://medium.com/@stripedpurple" class="navbar-item">Blog</a>
        <a href="/contact" class="navbar-item">Contact</a>
        <a href="https://www.instagram.com/stripedpurple/" class="navbar-item"><i
          class="fa fa-instagram"></i></a>
        <a href="https://github.com/viruscmd" class="navbar-item"><i class="fa fa-github"></i></a>
      </div>

    </div>
  </nav>
</template>

<script>
  export default {
    name: "navbar",
    data() { return { show: false } }
  }
</script>

<style scoped>

</style>
