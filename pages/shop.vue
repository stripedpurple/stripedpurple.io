<template>
  <div>
    <section class="hero is-fullheight" @keyup.esc='goHome'>
      <Navi :fixed="false"/>
      <div class="hero-body">
        <div style="width: 100%; display: flex; flex-direction: column; place-items: center" class="has-text-centered">
          <p class="title">Prints &amp; <wbr>Graphic&nbsp;Designs</p>
          <p class="subtitle">Shop photography prints, graphic tees, stickers, and much more</p>
          <div class="buttons">
            <a class="button is-medium is-dark"
                      href="https://stripedpurple.darkroom.tech/"
                      target="_blank" rel="noopener noreferrer">
              <img class="image" src="/img/darkroom.svg" alt="red bubble logo" style="height: 100%">
              &nbsp;&nbsp;Dark Room
            </a>
            <a class="button is-medium is-dark"
               href="https://www.redbubble.com/people/VCOBA/shop"
               target="_blank" rel="noopener noreferrer">
              <img class="image" src="/img/redbubble.svg" alt="red bubble logo" style="height: 100%">
              &nbsp;&nbsp;Red Bubble
            </a>
          </div>
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
    name: "shop",
  }
</script>

<style lang="sass" scoped>

</style>
