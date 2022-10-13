<template>
  <section class="container" ref="section">
    <Pagination v-if="pages > 1" :pages="pages" :currentPage="currentPage" :getLink="getLink" />
    <table class="table is-fullwidth is-bordered is-striped">
      <thead>
        <tr>
          <th><Icon icon="trophy" fixedWidth /> {{ $t('misc.ranking') }}</th>
          <th><Icon icon="fas meteor" fixedWidth /> {{ $t('misc.address') }}</th>
          <th><Icon icon="fas coins" fixedWidth /> {{ $t('misc.balance') }}</th>
          <th><Icon icon="fas percentage" fixedWidth /> {{ $t('misc.percentage') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({address, balance}, index) of list">
          <td>{{ 100 * (currentPage - 1) + index + 1 }}</td>
          <td>
            <AddressLink :address="address" />
          </td>
          <td class="monospace break-word">{{ balance | revo(8) }} RVO</td>
          <td class="monospace">{{ (balance / totalSupply * 100).toFixed(4) + '%' }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination v-if="pages > 1" :pages="pages" :currentPage="currentPage" :getLink="getLink" />
  </section>
</template>

<script>
  import Misc from '@/models/misc'
  import {RequestError} from '@/services/revoinfo-api'
  import {scrollIntoView} from '@/utils/dom'

  export default {
    head() {
      return {
        title: this.$t('misc.rich_list_title')
      }
    },
    data() {
      return {
        totalCount: 0,
        list: [],
        currentPage: Number(this.$route.query.page || 1)
      }
    },
    async asyncData({req, query, redirect, error}) {
      try {
        if (query.page && !/^[1-9]\d*$/.test(query.page)) {
          redirect('/misc/rich-list')
        }
        let page = Number(query.page || 1)
        let {totalCount, list} = await Misc.richList(
          {from: (page - 1) * 100, to: page * 100},
          {ip: req && req.ip}
        )
        if (page > 1 && totalCount <= (page - 1) * 100) {
          redirect('/misc/rich-list', {page: Math.ceil(totalCount / 100)})
        }
        return {totalCount, list}
      } catch (err) {
        if (err instanceof RequestError) {
          error({statusCode: err.code, message: err.message})
        } else {
          error({statusCode: 500, message: err.message})
        }
      }
    },
    computed: {
      blockchain() {
        return this.$store.state.blockchain
      },
      totalSupply() {

        let COIN = 1e8
        let height = this.blockchain.height
        let blocks = 0
        let supply = 50 * COIN

        if (height <= 5000)
            return supply + (height - blocks) * 21000 * COIN

        supply = supply + (5000 - blocks) * 21000 * COIN
        blocks = 5000

        if (height <= 1000000)
            return supply + (height - blocks) * 21 * COIN

        supply = supply + (1000000 - blocks) * 21 * COIN
        blocks = 1000000

        if (height <= 2000000)
            return supply + (height - blocks) * 13 * COIN

        supply = supply + (2000000 - blocks) * 13 * COIN
        blocks = 2000000

        if (height <= 4000000)
            return supply + (height - blocks) * 8 * COIN

        supply = supply + (4000000 - blocks) * 8 * COIN
        blocks = 4000000

        if (height <= 7000000)
            return supply + (height - blocks) * 5 * COIN

        supply = supply + (7000000 - blocks) * 5 * COIN
        blocks = 7000000

        if (height <= 12000000)
            return supply + (height - blocks) * 3 * COIN

        supply = supply + (12000000 - blocks) * 3 * COIN
        blocks = 12000000

        if (height <= 20000000)
            return supply + (height - blocks) * 2 * COIN

        supply = supply + (20000000 - blocks) * 2 * COIN
        blocks = 20000000

        if (height <= 33000000)
            return supply + (height - blocks) * 1 * COIN

        supply = supply + (33000000 - blocks) * 1 * COIN

        return supply
      },
      pages() {
        return Math.ceil(this.totalCount / 100)
      }
    },
    methods: {
      getLink(page) {
        return {name: 'misc-rich-list', query: {page}}
      }
    },
    async beforeRouteUpdate(to, from, next) {
      let page = Number(to.query.page || 1)
      let {totalCount, list} = await Misc.richList({from: (page - 1) * 100, to: page * 100})
      this.totalCount = totalCount
      if (page > this.pages && this.pages > 1) {
        this.$router.push({name: 'misc-rich-list', query: {page: Math.ceil(totalCount / 100)}})
        return
      }
      this.list = list
      this.currentPage = page
      next()
      scrollIntoView(this.$refs.section)
    }
  }
</script>

<style scoped>
  .table {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
