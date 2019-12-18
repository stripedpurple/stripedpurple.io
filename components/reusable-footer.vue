<template>
  <footer class="footer has-background-white wow fadeInRightBig">
    <div class="columns">
      <div class="column has-text-right-mobile">
        <a href="/contact" class="has-border-bottom has-text-dark">contact</a>&nbsp;
        <a href="https://www.instagram.com/stripedpurple/" class="has-text-dark" target="_blank"><i class="fa fa-fw fa-instagram"></i></a>&nbsp;
        <a href="https://github.com/viruscmd" class="has-text-dark" target="_blank"><i class="fa fa-fw fa-github"></i></a>
      </div>
      <div class="column has-text-right">&copy;{{ new Date().getFullYear() }} Austin Barrett.&nbsp;&nbsp;All Rights Reserved</div>
    </div>
  </footer>
</template>

<script>
    export default {
        name: "reusable-footer"
    }
</script>

<style lang="sass" scoped>
  .footer
    padding: 1.5rem
</style>
