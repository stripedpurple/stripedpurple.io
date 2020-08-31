<template>
  <div class="logo-container">
    <img src="/img/profile.jpg" alt="Profile Photo"
         class="is-rounded image fadeInUpBig" id="logo">
  </div>
</template>

<style lang="sass" scoped>
  #logo
    box-shadow: -32px 8px rgba(80, 84, 190, 0.5), 24px 16px rgba(80, 142, 191, 0.5), 16px -24px rgba(80, 210, 190, 0.5)
    max-width: 300px
    margin: auto

    @media screen and (max-width: 768px)
      width: 50vw

  .logo-container
    padding: 2rem
</style>
