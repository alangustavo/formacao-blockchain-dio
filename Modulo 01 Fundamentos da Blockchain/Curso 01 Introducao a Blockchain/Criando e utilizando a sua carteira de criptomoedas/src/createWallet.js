//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - tesnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0` 

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da cartiera HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)

// O faucet indicado no vídeo não funcionou. Usei https://coinfaucet.eu/en/btc-testnet/
// Carteira gerada
// Endereço:  mpJvvhHHMpgd82ZsajKj78yk34cYiGPLhn
// Aqui foi a transação de recebimento do faucet.
// Transaction id: 2b9ccd7bebe389a6a8cd1f8e9c9298e0134d2a2588ec77a533cd25f334c5a41d
// Aqui uma transferência de fundos para a carteira msfPFs7TbFSPJWwzAuuUPUYmKq7ickgw4d
// Transaction id: 98d1732a2f2e550fcb8146ff085c6ff23165858a95cf0f09aad9b4d8852de1c6
