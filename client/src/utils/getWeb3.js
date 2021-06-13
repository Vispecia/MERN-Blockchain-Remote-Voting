import Web3 from 'web3'

export default () => {
  const { web3 } = window

  if (typeof web3 !== 'undefined') {
    return new Web3(web3.currentProvider)
  }

  const provider = new Web3.providers.HttpProvider(`http://localhost:3000`)
  return new Web3(provider)
}
