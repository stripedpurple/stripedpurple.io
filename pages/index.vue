<template>
  <div class="section is-fullheight is-flex">
    <div class="container">
      <div class="columns">
        <div class="column">
          <logo class="wow fadeInUpBig"/>
          <h1 class="title is-size-3 wow fadeInUpBig">
            Austin Barrett
          </h1>
          <h2 class="subtitle is-size-4 wow fadeInUpBig">
            Photographer, Developer, &amp; Magician Extraordinaire ♣️♥️♠️♦️
          </h2>
          <div class="links">
<!--                 About      -->
<!--            <a href="/about" class="button wow fadeInUpBig is-primary">About</a>-->

            <!--     Portfolio Dropdown      -->
            <div class="dropdown wow fadeInUpBig" :class="{'is-active': portfolioDrop}">
              <div class="dropdown-trigger">
                <button class="button is-medium is-primary" aria-haspopup="true" aria-controls="PortfolioDropdown" @click="portfolioDrop=!portfolioDrop">
                  <span>Portfolio</span>
                  <span class="icon is-small"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                </button>
              </div>

              <div class="dropdown-menu" id="PortfolioDropdown" role="menu">
                <div class="dropdown-content has-text-left">
                    <a class="dropdown-item" href="/portfolio/photography">Photography</a>
                    <a class="dropdown-item" href="/portfolio/web">Web Design/Development</a>
                </div>
              </div>
            </div>

            <!--     Blog      -->
            <a target="_blank" href="https://medium.com/@stripedpurple" class="button is-medium wow fadeInUpBig is-primary">Blog</a>

            <!--     Shop Dropdown      -->
            <div class="dropdown wow fadeInUpBig" :class="{'is-active': shopDrop}">
              <div class="dropdown-trigger">
                <button class="button is-medium is-primary" aria-haspopup="true" aria-controls="ShopDropdown" @click="shopDrop=!shopDrop">
                  <span>Shop</span>
                  <span class="icon is-small"><i class="fa fa-angle-down" aria-hidden="true"></i></span>
                </button>
              </div>

              <div class="dropdown-menu" id="ShopDropdown" role="menu">
                <div class="dropdown-content has-text-left">
                    <a class="dropdown-item" href="https://stripedpurple.darkroom.tech/" target="_blank">Prints</a>
                    <a class="dropdown-item" href="https://www.redbubble.com/people/VCOBA/shop" target="_blank">Designs</a>
                </div>
              </div>
            </div>
          </div>
          <div class="links">
            <a href="https://www.instagram.com/stripedpurple/" target="_blank"
               class="button wow fadeInUpBig"><i class="fa fa-fw fa-lg fa-instagram"></i>&nbsp;&nbsp;Instagram</a>
            <a href="https://github.com/viruscmd" target="_blank"
               class="button wow fadeInUpBig"><i class="fa fa-github fa-fw fa-lg"></i>&nbsp;&nbsp;GitHub</a>
            <a href="/contact" class="button wow fadeInUpBig"><i class="fa fa-fw fa-lg fa-paper-plane"></i>&nbsp;&nbsp;Contact</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    },
    data() {
      return {
        shopDrop: false,
        portfolioDrop: false
      }
    }
  }
</script>

<style lang="sass">
  .container
    margin: 0 auto
    display: flex
    justify-content: center
    align-items: center
    text-align: center


    .title
      display: block
      font-weight: 300
      font-size: 100px
      color: #35495e
      letter-spacing: 1px


    .subtitle
      font-weight: 300
      font-size: 42px
      color: #526488
      word-spacing: 5px
      padding-bottom: 15px


    .links
      padding-top: 15px

      .button
        margin-bottom: .5rem

</style>
