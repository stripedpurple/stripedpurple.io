<template>
  <div class="logo-container">
    <img src="/img/profile.jpg" alt="Profile Photo"
         class="is-rounded image fadeInUpBig" id="logo">
  </div>
</template>

<style lang="sass" scoped>
  #logo
    box-shadow: -2rem 0.5rem rgba(80, 84, 190, 0.5), 1.5rem 1rem rgba(80, 142, 191, 0.5), 1rem -1.5rem rgba(80, 210, 190, 0.5)
    max-width: 300px
    margin: auto

    @media screen and (max-width: 768px)
      box-shadow: -1rem 0.25rem rgba(80, 84, 190, 0.5), .75rem 0.5rem rgba(80, 142, 191, 0.5), 0.5rem -.75rem rgba(80, 210, 190, 0.5)
      width: 50vw

  .logo-container
    padding: 2rem
</style>
