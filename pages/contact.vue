<template>
  <div>
    <section class="hero is-fullheight" @keyup.esc='goHome'>
      <Navi :fixed="false"/>
      <div class="hero-body">
        <div style="width: 100%; display: flex; flex-direction: column; place-items: center" class="has-text-centered">
          <p class="title">Drop me a line!</p>
          <p class="subtitle">you can find me on all of the following</p>
          <b-button size="is-medium" type="is-dark" tag="a" href="https://www.instagram.com/stripedpurple/" target="_blank"
                    rel="noopener noreferrer"
                    icon-pack="fab" icon-left="instagram" custom-class="fa-fw">stripedpurple
          </b-button>
          <br>

          <b-button size="is-medium" type="is-dark" tag="a" href="https://github.com/stripedpurple" target="_blank" rel="noopener noreferrer"
                    icon-pack="fab"
                    icon-left="github" custom-class="fa-fw">stripedpurple
          </b-button>
          <br>

          <b-button size="is-medium" type="is-dark" tag="a" href="https://medium.com/@stripedpurple" target="_blank" rel="noopener noreferrer" icon-pack="fab"
                    icon-left="medium"
                    custom-class="fa-fw">stripedpurple
          </b-button>
          <br>

          <b-button size="is-medium" type="is-dark" tag="a" href="https://codepen.io/stripedpurple" target="_blank"
                    rel="noopener noreferrer"
                    icon-pack="fab" icon-left="codepen" custom-class="fa-fw">stripedpurple
          </b-button>
          <br>

          <b-button size="is-medium" type="is-dark" tag="a" href="https://twitter.com/_stripedpurple" target="_blank"
                    rel="noopener noreferrer"
                    icon-pack="fab" icon-left="twitter" custom-class="fa-fw">_stripedpurple
          </b-button>
          <br>

          <b-button size="is-medium" type="is-dark" tag="a" href="https://www.linkedin.com/in/stripedpurple/" target="_blank"
                    rel="noopener noreferrer"
                    icon-pack="fab" icon-left="linkedin" custom-class="fa-fw">stripedpurple
          </b-button>
          <br>

          <b-button size="is-medium" type="is-dark" tag="a" href="mailto:austin@stripedpurple.io?subject=Website Contact"
                    target="_blank" rel="noopener noreferrer" icon-pack="fas" icon-left="paper-plane"
                    custom-class="fa-fw">austin@stripedpurple.io
          </b-button>
          <br>

        </div>
      </div>

      <div class="hero-footer">
        <reusable-footer/>
      </div>
    </section>
    <meta-tags title="Drop me a line" description="you can find me on all of the following"/>
  </div>
</template>

<script>
  export default {
    name: "contact",
  }
</script>

<style lang="sass" scoped>

</style>
