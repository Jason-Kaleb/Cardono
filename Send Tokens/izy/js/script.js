import{
    Cip30Wallet,WalletHelper,Value
} from "./helios.js";

import{
    txPrerequisites,init,walletEssentials, adaFunc, sendAssets
} from "./coxylib.js";

import{opt,j} from "./jimba.js";

const wallet = await init(j);
const walletData = await walletEssentials(wallet,Cip30Wallet,WalletHelper,Value,txPrerequisites.minAda,j);
//swal("Connect to wallet to transfer walle");

const getBalance = async () => {
    const balancelovelace = await adaFunc(walletData,j);
    const balanceAda = (balancelovelace/1000000).toLocaleString();
    document.getElementById('connect-button').innerText = `Bal: ${balanceAda}`;
    enableForm(); // Enable the form after successful connection
    return balanceAda;
}

function enableForm() {
    // Enable the form fields and submit button
    document.getElementById('assetName').disabled = false;
    document.getElementById('mph').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('quantity').disabled = false;
    document.querySelector('form button[type="submit"]').disabled = false;
}

document.getElementById('connect-button').addEventListener('click', async (event) => {
    event.preventDefault();
    await getBalance();
});

// Sends assest
document.getElementById('sendAsset').addEventListener('submit', async (event) => {
    event.preventDefault();
    const address = document.getElementById('address').value;
    const mph = document.getElementById('mph').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const assetName = document.getElementById('assetName').value;

    try {
            await sendAssets(mph, assetName, quantity, address);
            document.getElementById('address').value = '';
            document.getElementById('assetName').value = '';
            document.getElementById('mph').value = '';
            document.getElementById('quantity').value = '';

    } catch (error) {
        alert('Error transferring Asset: ' + error.message);
    }
    
});
