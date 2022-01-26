<template>
  <nav class="navbar">
    <div class="navbar-brand is-size-4">
      <nuxt-link to="/" class="navbar-item navbar-logo">
        <span class="revo-icon">
          <img src="@/icons/revo-light.svg" />
        </span>
      </nuxt-link>
      <button type="button" class="button navbar-burger" @click="showMenu = !showMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="navbar-menu" :class="{'is-active': showMenu}">
      <div class="navbar-start is-uppercase">
        <AttributeInjector class="navbar-item" @click.native="showMenu = !showMenu">
          <nuxt-link to="/block">{{ $tc('blockchain.block', 2) }}</nuxt-link>
          <nuxt-link to="/contract/tokens">{{ $tc('blockchain.token') }}</nuxt-link>
          <div class="has-dropdown is-hoverable">
            <nuxt-link to="/misc/charts" class="navbar-link">{{ $t('misc.misc') }}</nuxt-link>
            <div class="navbar-dropdown is-boxed">
              <nuxt-link to="/misc/charts" class="navbar-item">
                {{ $t('misc.charts_title') }}
              </nuxt-link>
              <nuxt-link to="/misc/rich-list" class="navbar-item">
                {{ $t('misc.rich_list_title') }}
              </nuxt-link>
              <nuxt-link to="/misc/biggest-miners" class="navbar-item">
                {{ $t('misc.biggest_miners_title') }}
              </nuxt-link>
              <nuxt-link to="/misc/stake-calculator" class="navbar-item">
                {{ $t('misc.stake_calculator.title') }}
              </nuxt-link>
              <nuxt-link to="/misc/raw-tx" class="navbar-item">
                Send Raw Transaction
              </nuxt-link>
            </div>
          </div>
        </AttributeInjector>
      </div>

      <h1 class="nebula-title">
        Beta - Revo Block Explorer
      </h1>
      <p class="nebula-p">
        You may enter a block height, block hash, tx hash, contract or address
      </p>

      <section class="columns is-multiline is-desktop">
        <div class="column">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">
                <Icon icon="fas shield-alt" fixedWidth />
                {{ $t('blockchain.blockchain_height') }}
              </h3>
            </div>
            <div class="card-body">
              <p class="information">
                <span class="value">{{ blockchain.height.toLocaleString() }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">
                <Icon icon="compass" fixedWidth />
                {{ $t('blockchain.current_difficulty') }}
              </h3>
            </div>
            <div class="card-body">
              <p class="information">
                <span class="value">{{ difficulty.toLocaleString() }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">
                <Icon icon="balance-scale" fixedWidth />
                {{ $t('blockchain.network_weight') }}
              </h3>
            </div>
            <div class="card-body">
              <p class="information">
                <span class="value">{{ stakeWeight | revo(8) }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">
                <Icon icon="gas-pump" fixedWidth />
                {{ $t('blockchain.fee_rate') }}
              </h3>
            </div>
            <div class="card-body">
              <p class="information">
                <span class="value">{{ feeRate }} RVO/kB</span>
              </p>
            </div>
          </div>
        </div>
		
		<div class="column">
          <div class="card">
            <div class="card-header">
              <h3 class="card-header-title">
                <Icon icon="tint" fixedWidth />
					Min Gas Price
              </h3>
            </div>
            <div class="card-body">
              <p class="information">
                <span class="value">0.00000001</span>
              </p>
            </div>
          </div>
        </div>
		
      </section>

      <form class="navbar-end" @submit.prevent="search">
        <div class="navbar-item input-item">
          <input type="text" class="input" v-model="searchString" :placeholder="$t('nav.search')">
          <!-- <button type="submit" class="button is-revo" :class="{'is-loading': searching}">
            <Icon icon="search" />
          </button> -->
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
  import {get as revoinfoGet} from '@/services/revoinfo-api'
  import Block from "@/models/block"
  import Misc from '@/models/misc'

  export default {
    data() {
      return {
        showMenu: false,
        searchString: '',
        searching: false,
        difficulty: 0,
        stakeWeight: 0,
        feeRate: 0
      }
    },
    computed: {
      blockchain() {
        return this.$store.state.blockchain
      }
    },
    methods: {
      onStakeWeight(stakeWeight) {
        this.stakeWeight = stakeWeight
      },
      onFeeRate(feeRate) {
        this.feeRate = feeRate
      },
      async search() {
        let searchString = this.searchString.trim()
        if (!searchString || this.searching) {
          return
        }
        this.searching = true
        try {
          let {type, id, address} = await revoinfoGet(`/search`, {params: {query: searchString}})
          switch (type) {
          case 'address':
            this.searchString = ''
            this.$router.push(`/address/${searchString}`)
            break
          case 'block':
            this.searchString = ''
            this.$router.push(`/block/${searchString}`)
            break
          case 'contract':
          case 'erc20':
          case 'erc721':
            this.searchString = ''
            if (address) {
              this.$router.push(`/contract/${address}`)
            } else {
              this.$router.push(`/contract/${searchString}`)
            }
            break
          case 'transaction':
            this.searchString = ''
            this.$router.push(`/tx/${searchString}`)
            break
          }
        } catch (err) {}
        this.showMenu = false
        this.searching = false
      }
    },
    watch: {
      async 'blockchain.height'(height) {
        let block = await Block.get(height)
        this.difficulty = block.difficulty
      }
    },
    async mounted() {
      let [currentBlock, {netStakeWeight: stakeWeight, feeRate}] = await Promise.all([
        Block.get(this.$store.state.blockchain.height),
        Misc.info()
      ])
      this.difficulty = currentBlock.difficulty;
      this.stakeWeight = stakeWeight;
      this.feeRate = feeRate;
      this._onStakeWeight = this.onStakeWeight.bind(this)
      this._onFeeRate = this.onFeeRate.bind(this)
      this.$subscribe('blockchain', 'stakeweight', this._onStakeWeight)
      this.$subscribe('blockchain', 'feerate', this._onFeeRate)
    },
    beforeDestroy() {
      this.$unsubscribe('blockchain', 'stakeweight', this._onStakeWeight)
      this.$unsubscribe('blockchain', 'feerate', this._onFeeRate)
    }
  }
</script>

<style lang="less" scoped>
  .card-header-title {
    padding: 0.75rem 0;
    justify-content: center;
    span {
      margin-right: 6px;
    }
  }
  .information {
    padding: 0.1em 1em;
    text-align: center;
    &:first-child {
      padding-top: 0.5em;
    }
    &:last-child {
      padding-bottom: 0.5em;
    }
    .value {
      font-family: monospace
    }
  }

  .columns.is-desktop {
    padding: 0 350px;
  }

  .navbar {
    background-color: transparent;
    .navbar-brand {
      position: absolute;
    }
    .navbar-item.has-dropdown:hover .navbar-link {
      background-color: transparent;
    }
    a.navbar-item:not(.navbar-logo) {
      color: rgba(255, 255, 255, 0.8);
      text-transform: capitalize;
      border-bottom: 4px solid transparent;
      transition: border-bottom 0.1s linear;
      &:hover {
        background-color: transparent;
        border-bottom: 4px solid rgba(255, 255, 255, 0.8);
      }
    }
    a.navbar-link {
      color: rgba(255, 255, 255, 0.8);
      text-transform: capitalize;
      border-bottom: 4px solid transparent;
    }
    .navbar-dropdown {
      background: rgba(0,0,0,0.87);
      width: 160px;
    }
    .navbar-link::after {
      border-color: rgba(255, 255, 255, 0.8);
    }
    .navbar-menu {
      padding: 0 10px;
      flex-direction: column;
    }
  }
  .navbar-logo {
    display: inline-block;
    .revo-icon {
      vertical-align: middle;
      img {
        height: 50px;
        width: auto;
      }
    }
  }

  h1.nebula-title {
    margin-top: 80px;
    margin-bottom: 10px;
    font-size: 51px;
    text-align: center;
    font-weight: 200;
    line-height: 53px;
    strong {
      color: white;
    }
  }

  p.nebula-p {
    text-align: center;
    margin-bottom: 20px;
    color: #ffffff;
    font-weight: 200;
    font-size: 17px;
  }

  .navbar-start {
    margin-right: 50px;
    margin-top: 10px;
    justify-content: flex-end;
  }
  .navbar-end {
    flex: auto;
    align-items: center;
    margin-left: initial;
    .navbar-item {
      flex: auto;
      position: relative;
      input {
        padding-right: 3em;
        width: 50%;
        margin: 0 auto;
        text-align: center;
      }
      button {
        position: absolute;
        top: 0.5em;
        right: 0;
      }
    }
  }
</style>
