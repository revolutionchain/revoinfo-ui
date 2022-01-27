<template>
  <div class="container">
    <div class="tabs is-centered">
      <ul>
        <li :class="{'is-active': $route.matched.some(route => route.name === 'misc-charts')}">
          <nuxt-link to="/misc/charts"><Icon icon="fas chart-bar" fixedWidth /> {{ $t('misc.charts_title') }}</nuxt-link>
        </li>
        <li :class="{'is-active': $route.matched.some(route => route.name === 'misc-rich-list')}">
          <nuxt-link to="/misc/rich-list"><Icon icon="trophy" fixedWidth /> {{ $t('misc.rich_list_title') }}</nuxt-link>
        </li>
        <li :class="{'is-active': $route.matched.some(route => route.name === 'misc-biggest-miners')}">
          <nuxt-link to="/misc/biggest-miners"><Icon icon="fas meteor" fixedWidth /> {{ $t('misc.biggest_miners_title') }}</nuxt-link>
        </li>
        <li :class="{'is-active': $route.matched.some(route => route.name === 'misc-stake-calculator')}">
          <nuxt-link to="/misc/stake-calculator"><Icon icon="fas calculator" fixedWidth /> {{ $t('misc.stake_calculator.title') }}</nuxt-link>
        </li>
        <li :class="{'is-active': $route.matched.some(route => route.name === 'misc-raw-tx')}">
          <nuxt-link to="/misc/raw-tx"><Icon icon="fas paper-plane" fixedWidth />Send Raw Transaction</nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt-child />
  </div>
</template>
