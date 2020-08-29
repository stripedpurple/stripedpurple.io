<template>
  <div>
    <Navi/>

    <section class="section">
      <div class="container">
        <div :class="`columns is-multiline wow fadeInUp ${key % 2 !== 0 ? 'is-reversed-tablet' : ''}`" v-for="(site,key) in sites" :key="key">
          <div class="column is-4-desktop is-full-tablet">
            <figure class="image is-5by4"><img :src="site.img" :alt="site.name"></figure>
          </div>
          <div class="column is-1-desktop is-full-tablet is-hidden-touch"></div>
          <div class="column is-7-desktop is-full-tablet">
            <p class="title">{{site.name}}</p>
            <div class="subtitle has-text-justified-desktop" v-html="site.description"></div>
            <a class="button is-dark" :href="site.url" target="_blank" rel="noreferrer noopenner"><strong class="is-family-sans-serif	">view live site</strong>&nbsp;&nbsp;<b-icon size="is-small" icon="arrow-right" custom-class="fa-fw"/></a>
          </div>
        </div>
      </div>
    </section>

    <reusable-footer/>

    <meta-tags title="Web Design & Development" description="The web is beautiful and we can add to it together"/>
  </div>
</template>

<script>
  export default {
    name: "portfolio",
    data() {
      return {
        sites: [
          {url: 'https://1time.pw',
            name: '1 Time Password',
            img: '/img/sites/1time.pw_device.png',
            description: `<p>1time.pw it\'s like snapchat for secrets. Need to send a password? Love Note? Haiku? This is the place.</p><br><p>1time.pw is a simple tool for securely share passwords, message, and other text. Message self destruct after its specified expiration time. Messages are never sent to the server. Encryption is done completely client side. In order to enforce the expiration time, the encryption key is stored on the server. The actual encrypted message is stored in the URL.</p>`
          },
          {
            url: 'https://texttool.app',
            name: 'Text Tools',
            img: '/img/sites/texttool.app_device.png',
            description: `<p>Find and replace in a body of text. Extract links from HTML. Strip tags from HTML. Explore common text ciphers. And much more.</p><p>Text Tools is a suite of tools providing live transformation, encoding/decoding, encrypting of text.</p>`
          },
          {
            url: 'https://biohitech.com',
            name: 'BioHiTech Global',
            img: '/img/sites/biohitech.com_device.png',
            description: 'At BioHiTech Global, where sustainability meets doability. BioHiTech is working to change the future of the waste management services industry by creating a technology-driven services company to cost-effectively reduce the environmental impact of waste disposal. Helping reduce waste generation, significantly reduce landfill usage, and create a valuable renewable fuel.'
          },
          {
            url: 'https://demo.biohitechcloud.com',
            name: 'BioHiTech Cloud',
            img: '/img/sites/biohitechcloud.com_device.png',
            description: `<p>BioHiTech Cloud's data analytics leverages proven technology already installed in hundreds of our digesters around world. Cloud-based data platform translate industrial machine language into human language to provide valuable data and information to improve sustainability efforts.</p>`
          },
          {
            url: 'https://goldmedal.net',
            name: 'Gold Medal Environmental',
            img: '/img/sites/goldmedal.net_device.png',
            description: `<p>Gold Medal Environmental is transforming the waste industry by providing technology-driven, vertically integrated sustainable waste solutions. Aided by BioHiTech's advanced sustainability technology, Gold Medal Environmental is working toward becoming the worlds first zero-watse-to-landfill trash hauling company.</p>`
          },
          {
            url: 'https://admin.biohitechcloud.com',
            name: 'BioHiTech Admin Cloud',
            img: '/img/sites/admin.biohitechcloud.com_device.png',
            description: `<p>BioHiTech Admin Cloud is a powerful platform providing tools, and technology for BioHiTech's service team and partners</p><br><p>Advance control and diagnostics of remotely deployed machines. AI/ML driven service and and troubleshooting. Everything else need to manage a team of world class technicians.</p>`
          },
          {
            url: 'https://entsorgawv.com',
            name: 'Entsorga West Virginia',
            img: '/img/sites/entsorgawv.com_device.png',
            description: `<p>By utilizing the HEBioT MBT system, Entsorga WV recovers bio-mass, plastics and other carbon based materials from the mixed municipal solid waste (MSW) stream and convert them into a safe alternative fuel source.  When collecting these sources of MSW, Entsorga WV removes other valuable recyclable commodities such as metals and glass from the HEBioT receiving stream and put them into the local municipality recycling stream.  This is in conjunction with the Berkeley County Recycling program.  Together this will increase recycling rates for the municipality.</p>`
          },
          {
            url: 'https://biohitechrrr.com',
            name: 'Rensselaer Resource Recover',
            img: '/img/sites/biohitechrrr.com_device.png',
            description: `<p>The Rensselaer Engineered Fuels project has submitted a Permit Application to the New York State Department of Environmental Conservation to construct and operate a Municipal Solid Waste Processing Facility at 36 Riverside Avenue, Rensselaer, NY. Project documents are available for download below.</p>`
          },
          {
            url: 'https://www.derf.pw',
            name: 'Derf.pw',
            img: '/img/sites/derf.pw_device.png',
            description: `<p>Sometime the internet is out, or you are having trouble with your connection. Derf.pw is a simple tool to test your connection. By generating a random token on the server side and disabling caching, derf.pw guarantees every connection a live connection.</p>`
          },
          {
            url: 'https://3dkeepsakes.biz',
            name: '3D Keepsakes',
            img: '/img/sites/3dkeepsakes.biz_device.png',
            description: `<p>3D Keepsakes' models are the perfect way to capture the ones you love. Use them as cake/wedding toppers. Show off your cosplay skills. Youth sports, pets, occupations, graduations, hobbies, the possibilities are endless.</p>`
          },
        ]
      }
    }
  }
</script>

<style scoped lang="sass">
  .columns
    padding-top: 3rem
    padding-bottom: 3rem
</style>
