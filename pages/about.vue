<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-header">
    <Navi :fixed="false"/>

      </div>
      <div class="hero-body wow fadeInUp">
        <div class="about-copy">
          <p class="subtitle has-text-periwinkle is-size-3">Hello my name is</p>
          <h1 class="title is-uppercase is-size-1">Austin Barrett</h1>
          <p>...and I create beautiful things. I have worked with companies small and large to bring their vision to life. I am experienced in building everything from
            <a href="https://1time.pw" target="_blank" rel="noreferrer noopener">single page application/website</a>  to production ready
            <a href="https://demo.biohitechcloud.com" target="_blank" rel="noreferrer noopener">systems dashboards</a>.</p>
          <p>In my free time you can find me contributing to open source communities, hitting the <nuxt-link to="/portfolio/photography">streets
            photographing</nuxt-link> everyday life, or volunteering my service to local non-profits and the community at large.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "about"
  }
</script>

<style scoped lang="sass">
  .about-copy
    max-width: 800px
    @media screen and (min-width: 1024px)
      max-width: 30rem

  .hero
    background-size: 150% !important
    @media screen and (min-width: 1200px)
      background-size: 100% !important


    background: white url("/img/bg.png") top right no-repeat

    &.is-fullheight,
      .hero-body
        flex-direction: column
        align-items: unset

    &.is-spaced
      .hero-body
        padding: 1rem 2rem

</style>
