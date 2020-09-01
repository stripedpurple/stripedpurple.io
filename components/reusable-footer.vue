<template>
  <div class="footer has-background-white wow fadeInUp">
      <div class="columns">
        <div class="column has-text-right-mobile">
          <a href="https://www.instagram.com/stripedpurple/" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="instagram"/>
          </a>

          <a href="https://github.com/viruscmd" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="github"/>
          </a>

          <a href="" target="_blank" rel="noopener noreferrer" class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="medium"/>
          </a>

          <a href="https://codepen.io/stripedpurple" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="codepen"/>
          </a>

          <a href="https://twitter.com/_stripedpurple" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="twitter"/>
          </a>

          <a href="https://www.linkedin.com/in/stripedpurple/" target="_blank" rel="noopener noreferrer"
             class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="linkedin"/>
          </a>

          <a href="mailto:austin@stripedpurple.io?subject=Website Contact"
             target="_blank" rel="noopener noreferrer" class="wow fadeInUpBig has-text-grey-dark">
            <sp-icon icon="plane"/>
          </a>
        </div>
        <div class="column has-text-right">
          &copy;{{ new Date().getFullYear() }} Austin Barrett.&nbsp;&nbsp;All Rights
          Reserved
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: "reusable-footer"
  }
</script>

<style lang="sass" scoped>
  .footer
    padding-top: 1rem
    padding-bottom: 1rem

    .icon::v-deep
      margin-right: 0.5rem
</style>
