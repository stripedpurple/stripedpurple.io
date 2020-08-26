<template>
  <footer class="footer has-background-white wow fadeInUp">
    <div class="columns">
      <div class="column has-text-right-mobile">
        <b-tooltip label="@stripedpurple" type="is-dark">
          <a href="https://www.instagram.com/stripedpurple/" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fab" icon="instagram" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

        <b-tooltip label="@viruscmd" type="is-dark">
          <a href="https://github.com/viruscmd" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fab" icon="github" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

        <b-tooltip label="@stripedpurple" type="is-dark">
          <a href="" target="_blank" rel="noopener noreferrer" class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fab" icon="medium" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

        <b-tooltip label="@stripedpurple" type="is-dark">
          <a href="https://codepen.io/stripedpurple" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fab" icon="codepen" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

        <b-tooltip label="@_stripedpurple" type="is-dark">
          <a href="https://twitter.com/_stripedpurple" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fab" icon="twitter" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

        <b-tooltip label="@stripedpurple" type="is-dark">
          <a href="https://www.linkedin.com/in/stripedpurple/" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fab" icon="linkedin" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

        <b-tooltip label="austin@stripedpurple.io" type="is-dark">
          <a href="mailto:austin@stripedpurple.io?subject=Website Contact"
             target="_blank" rel="noopener noreferrer" class="wow fadeInUpBig has-text-grey-dark">
            <b-icon pack="fas" icon="paper-plane" custom-class="fa-fw"></b-icon></a>
        </b-tooltip>

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

  .icon::v-deep
    margin-right: 0.5rem
</style>
