import * as RevoinfoAPI from '@/services/revoinfo-api'

class Transaction {
  static get(id, options = {}) {
    if (Array.isArray(id)) {
      if (id.length === 0) {
        return []
      } else {
        return RevoinfoAPI.get('/txs/' + id.join(','), options)
      }
    } else {
      return RevoinfoAPI.get(`/tx/${id}`, options)
    }
  }

  static getBrief(id, options = {}) {
    if (Array.isArray(id)) {
      if (id.length === 0) {
        return []
      } else {
        return RevoinfoAPI.get('/txs/' + id.join(','), {params: {brief: ''}, ...options})
      }
    } else {
      return RevoinfoAPI.get(`/tx/${id}`, {params: {brief: ''}, ...options})
    }
  }

  static getRecentTransactions(options = {}) {
    return RevoinfoAPI.get('/recent-txs', options)
  }

  static sendRawTransaction(data, options = {}) {
    return RevoinfoAPI.post('/tx/send', {rawtx: data}, options)
  }
}

export default Transaction
