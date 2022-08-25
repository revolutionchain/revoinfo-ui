export default {
  mainnet: {
    pubkey: 0x3c,
    pubkeyhash: 0x3c,
    scripthash: 0x32,
    witness_v0_keyhash: 'rv',
    witness_v0_scripthash: 'rv'
  },
  testnet: {
    pubkey: 0x41,
    pubkeyhash: 0x41,
    scripthash: 0x32,
    witness_v0_keyhash: 'tr',
    witness_v0_scripthash: 'tr'
  }
}[process.env.network || 'mainnet']
