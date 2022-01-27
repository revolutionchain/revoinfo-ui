<template>
  <div id="app">
    <section class="nebula-section">
      <Navigator />
    </section>
    <div class="background">
      <div class="container">
        <Breadcrumb v-if="$route.path !== '/'" />
      </div>
      <nuxt />
    </div>
    <MyAddresses class="my-addresses" />
    <Footer />
  </div>
</template>

<script>
  import Navigator from '@/components/nav.vue'
  import Breadcrumb from '@/components/breadcrumb/index.vue'
  import Footer from '@/components/footer.vue'
  import MyAddresses from '@/components/my-addresses.vue'

  export default {
    head() {
      return {
        htmlAttrs: {
          lang: this.$store.state.locale.language
        }
      }
    },
    mounted() {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          registration.update()
          setInterval(() => registration.update(), 3600 * 1000)
        })
      }
      if (window.Notification) {
        Notification.requestPermission()
      }
    },
    components: {Navigator, Breadcrumb, Footer, MyAddresses}
  }
</script>

<style lang="less" scoped>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .nebula-section {
    background-image: url(./images/nebula.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: white;
    height: 450px;
  }
  .background {
    position: relative;
    flex: 1;
    padding: 0.5rem 0 1rem;
    background-image: url(./images/world-space.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #101C26;
    @media screen and (min-width: 1250px) {
      height: 100vh;
    }
  }
  .my-addresses {
    position: fixed;
    z-index: 100;
    @media (max-width: 768px) {
      bottom: 1em;
      right: 1em;
    }
    @media (min-width: 769px) {
      bottom: 2em;
      right: 2em;
    }
  }
</style>

<!-- NOT SCOPED STYLE: insert here global overrides -->
<style lang="less">
  body {
    font-family: 'Blinker', sans-serif;
  }
  a, .breadcrumb a {
    color: #00b712;
  }
  .chart-wrapper {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .tabs li.is-active a {
    color: #00b712;
    border-bottom-color: #00b712;
  }
</style>
