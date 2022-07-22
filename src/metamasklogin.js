export default class MetamaskLogin {
    
    /**
     * Checks if Meta Mask browser extenesion installed
     * https://docs.metamask.io/guide/getting-started.html#basic-considerations
     * 
     * @returns {boolean}
     *  
     */
    async checkInstalled () {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
    }

    /**
     * Check if your app have already been connected
     * 
     * @returns {Object}
     */
    async checkConnection() {
        try {
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            return accounts[0] ? {account : accounts[0]} : {}
        } catch (error) {
            return error
        }
    }

    /**
     * Request connection permission and get acccount selected by user or error
     * 
     * @returns {Object}
     * 
     */
    async requestAccount() {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            return {account : accounts[0]}
        } catch (error) {
            return error
        }
    }

}