
import "./styles.css";
import MetamaskLogin from './metamasklogin'
import Utils from './utils'


const mmlogin = new MetamaskLogin()

window.addEventListener("load", async function(event) {

    // Elements
    const installed_alert = document.getElementById("installed")
    const connect_alredy_alert = document.getElementById("connected-already")
    const connected_alert = document.getElementById("connected")

    const connect_alredy_row = document.getElementById("connected-already-row")
    const connect_row = document.getElementById("connected-row")

    const connect_btn = document.getElementById("connect")
 
    // Step 1 Check if MetaMask installed
    if (await mmlogin.checkInstalled()) {
        Utils.toggleAlert(installed_alert, '<b>Yes!</b> Meta Mask extension is installed!', true )
        
        // Check if you already connected metamask to your app
        const response = await mmlogin.checkConnection()
        if ('account' in response) {
            connect_alredy_row.classList.remove("d-none")
            Utils.toggleAlert(connect_alredy_alert, `Hey! You've already connected your app to Meta Mask, your account address is <b>${response.account}</b> You can do try to connect again`, true)
        } else {
            // You can do something with error
            console.log(response)
        }

       connect_row.classList.remove("d-none")
    } else {
       Utils.toggleAlert(installed_alert, '<b>No!</b> Meta Mask extension is NOT installed! Visit <a href="https://metamask.io/" target="_blank" rel="noopener nofollow">https://metamask.io/</a>', false )
       connect_row.classList.add("d-none")
    }
    
    // Request connection to Meta Mask
    connect_btn.onclick = async function(event) {
        // You should always disable the "connect" button while the connection request is pending.
        // https://docs.metamask.io/guide/getting-started.html#basic-considerations
        Utils.toggleDisabled( event.target, true)
        
        // Request account connection
        const response = await mmlogin.requestAccount() 
        if ('account' in response) {
            Utils.toggleAlert(connected_alert, `Meta Mask account address <b>${response.account}</b> is connected`, true)
            Utils.toggleDisabled( event.target, false)
        } else {
            let msg = `
                <p>More information about Meta Mask error codes: <a href="https://blog.logrocket.com/understanding-resolving-metamask-error-codes/" target="_blank" rel="noopener nofollow">found here</a></p>
                <b>Error code</b> : ${response.code}<br>
                <b>Error message</b> : ${response.message}<br>
                <b>Error stack</b> : ${response.stack}<br>
            `
            Utils.toggleAlert(connected_alert, msg, false)
            Utils.toggleDisabled( event.target, false)
        }
    }

});