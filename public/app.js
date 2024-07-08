const connector = new TonConnect.TonConnect({
    manifestUrl: 'brobot2-production.up.railway.app/tonconnect-manifest.json'
});

const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const addressElem = document.getElementById('address');
const balanceElem = document.getElementById('balance');
const tokensElem = document.getElementById('tokens');
const nftsElem = document.getElementById('nfts');

connectWalletBtn.addEventListener('click', connectWallet);

async function connectWallet() {
    try {
        const walletConnectionSource = {
            universalLink: 'https://app.tonkeeper.com/ton-connect',
            bridgeUrl: 'https://bridge.tonapi.io/bridge'
        };
        
        await connector.connect(walletConnectionSource);
        
        connectWalletBtn.style.display = 'none';
        walletInfo.style.display = 'block';
        
        await updateWalletInfo();
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Error connecting wallet');
    }
}

async function updateWalletInfo() {
    const address = await connector.account.address;
    addressElem.textContent = `Address: ${address}`;

    const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC');
    const tonweb = new TonWeb(provider);

    // Get balance
    const balance = await tonweb.getBalance(address);
    balanceElem.textContent = `Balance: ${TonWeb.utils.fromNano(balance)} TON`;

    // Get tokens (this is a simplified example, you'll need to implement token fetching)
    tokensElem.textContent = 'Tokens: Fetching...';

    // Get NFTs (this is a simplified example, you'll need to implement NFT fetching)
    nftsElem.textContent = 'NFTs: Fetching...';
}

// Check connection status on page load
connector.onStatusChange(async (wallet) => {
    if (wallet) {
        connectWalletBtn.style.display = 'none';
        walletInfo.style.display = 'block';
        await updateWalletInfo();
    } else {
        connectWalletBtn.style.display = 'block';
        walletInfo.style.display = 'none';
    }
});
