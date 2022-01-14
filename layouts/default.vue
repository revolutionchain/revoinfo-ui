<template>
  <div id="app">
    <client-only>
      <vue-particles
        class="particles-js"
        color="#ffffff"
        :particleOpacity="0.15"
        :particlesNumber="90"
        shapeType="circle"
        :particleSize="5"
        linesColor="#ffffff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.1"
        :linesDistance="150"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="bubble"
      />
    </client-only>
    <div>
      <header class="container">
        <Navigator />
      </header>
    </div>
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
  .particles-js {
    background-image: url(./hero-dark-2.jpg);
    background-size: cover;
    background-repeat: repeat-y;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .background {
    position: relative;
    flex: 1;
    padding: 0.5rem 0 1rem;
    background-color: transparent;
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
  a, .breadcrumb a {
    color: #00b712;
  }
  .card, .navbar, .chart-wrapper {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .tabs li.is-active a {
    color: #00b712;
    border-bottom-color: #00b712;
  }
  .tabs a {
    color: white;
  }
</style>
