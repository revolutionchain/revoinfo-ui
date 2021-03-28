import * as RevoinfoAPI from '@/services/revoinfo-api'

class Contract {
  static get(id, options = {}) {
    return RevoinfoAPI.get(`/contract/${id}`, options)
  }

  static getUtxo(id, options = {}) {
    return RevoinfoAPI.get(`/contract/${id}/utxo`, options)
  }

  static getTransactions(id, {page, pageSize}, options = {}) {
    return RevoinfoAPI.get(`/contract/${id}/txs`, {params: {page, pageSize}, ...options})
  }

  static listTokens({page, pageSize}, options = {}) {
    return RevoinfoAPI.get(`/erc20`, {params: {page, pageSize}, ...options})
  }

  static richList(id, {page, pageSize}, options = {}) {
    return RevoinfoAPI.get(`/erc20/${id}/rich-list`, {params: {page, pageSize}, ...options})
  }
}

export default Contract
