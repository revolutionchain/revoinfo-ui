import * as RevoinfoAPI from '@/services/revoinfo-api'

class Misc {
  static info(options = {}) {
    return RevoinfoAPI.get('/info', options)
  }

  static dailyTransactions(options = {}) {
    return RevoinfoAPI.get('/stats/daily-transactions', options)
  }

  static blockInterval(options = {}) {
    return RevoinfoAPI.get('/stats/block-interval', options)
  }

  static coinstake(options = {}) {
    return RevoinfoAPI.get('/stats/coinstake', options)
  }

  static addressGrowth(options = {}) {
    return RevoinfoAPI.get('/stats/address-growth', options)
  }

  static richList({from, to}, options = {}) {
    return RevoinfoAPI.get(`/misc/rich-list`, {params: {page: from / (to - from), pageSize: to - from}, ...options})
  }

  static biggestMiners({from, to}, options = {}) {
    return RevoinfoAPI.get(`/misc/biggest-miners`, {params: {page: from / (to - from), pageSize: to - from}, ...options})
  }
}

export default Misc
