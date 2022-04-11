# Solana Token Minting Application

### **`About`**

This application is created for learning and testing purposes of **Solana** blockchain. It uses `solana-labs` libraries for interaction with the blockchain. Primary purpose of the application is usage of **Solana**'s token program to create and mint new tokens but it can connect to **[Phantom Wallet](https://phantom.app/)** and airdrop **SOL** tokens.

P.S. Application currently uses only `devnet`.

### **`Use Flow`**

#### `Connect Phantom Wallet`

In order to use the application you'll have to connect your **Phantom Wallet**. Navigate to Wallet page. If you don't have **Phantom Wallet**'s Chrome extension click on `Visit Phantom Wallet` button, install it and create a new account or log into the existing one. If you already meet those requirements, click on `Connect Phantom Wallet` button to allow the application to use your **Phantom Wallet** account which you can send tokens to.

You can check your current SOL token balance by clicking on `Get Wallet Balance`.

#### `Airdropping Solana Tokens`

When you connect your wallet, you have the option to airdrop some SOL tokens to it. Navigate to Airdrop Page and click on `Airdrop 1 SOL` button. After a few seconds your wallet balance should be updated.

#### `Create Token`

Finally, we come to the create token functionality. To do this, navigate to Create Token page. In order to create a new token, you'll have to pass an account which will have mint authority. Currently, you can only create a new one, the option to passs an existing one will be added in the future.

To create an account, click on `Generate New Wallet Account` button. You can optionally give it a name and we'll add an option to save your created wallets in the future. After the wallet is generated it should show in Your Wallet Accounts section.

To create a token, you need to select the wallet which will have minting authority. Click on one of your wallets and it should show up in Create New Token section under Selected Wallet subheading. Click on `Create Token` button and new token should be instantiated. The token should unlock Created Tokens section and it should be shown there.

#### Mint and Send Token

To mint created token, first you should select one of your created tokens by clicking on it. It should show up under Selected Token subheading. Paste the wallet you want to send minted tokens to public key in the input component and click `Mint Selected Token` button. You should receive one token.