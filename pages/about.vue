<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-header">
    <Navi :fixed="false"/>

      </div>
      <div class="hero-body wow fadeInUp">
        <div style="max-width: 800px">
          <p class="subtitle has-text-grey-light">about</p>
          <h1 class="title is-uppercase">Austin Barrett</h1>
          <p class="is-size-4-tablet">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium ad adipisci
            aliquam debitis dolor, illum ipsa molestiae nemo nesciunt nisi non officiis omnis possimus quibusdam ullam
            unde veniam.</p>
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

  .hero
    background-size: 150% !important
      background-size: 80% !important
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

  .title
    font-size: 10vw !important

    @media screen and (min-width: 1024px)
      font-size: 8vw !important
    @media screen and (min-width: 1200px)
      font-size: 7vw !important
    @media screen and (min-width: 1600px)
      font-size: 6vw !important
    @media screen and (min-width: 1920px)
      font-size: 5vw !important


  .subtitle
    font-size: 8vw !important

    @media screen and (min-width: 1024px)
      font-size: 6vw !important
    @media screen and (min-width: 1200px)
      font-size: 5vw !important
    @media screen and (min-width: 1600px)
      font-size: 4vw !important
    @media screen and (min-width: 1920px)
      font-size: 3vw !important

</style>
