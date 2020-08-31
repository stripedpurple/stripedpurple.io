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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium ad adipisci
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

  /*.title*/
  /*  font-size: 10vw !important*/

  /*  @media screen and (min-width: 1024px)*/
  /*    font-size: 8vw !important*/
  /*  @media screen and (min-width: 1200px)*/
  /*    font-size: 7vw !important*/
  /*  @media screen and (min-width: 1600px)*/
  /*    font-size: 6vw !important*/
  /*  @media screen and (min-width: 1920px)*/
  /*    font-size: 5vw !important*/
  /*  @media screen and (min-width: 2160px)*/
  /*    font-size: 4vw !important*/


  /*.subtitle*/
  /*  font-size: 8vw !important*/

  /*  @media screen and (min-width: 1024px)*/
  /*    font-size: 6vw !important*/
  /*  @media screen and (min-width: 1200px)*/
  /*    font-size: 5vw !important*/
  /*  @media screen and (min-width: 1600px)*/
  /*    font-size: 4vw !important*/
  /*  @media screen and (min-width: 1920px)*/
  /*    font-size: 3vw !important*/
  /*  @media screen and (min-width: 2160px)*/
  /*    font-size: 2vw !important*/

</style>
