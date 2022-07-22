export default class Utils {

    /**
     * Toggle alert state and classes
     * 
     * @param {node} element 
     * @param {string} html 
     * @param {boolean} success 
     */
    static toggleAlert(element, html, success) {
        element.innerHTML = html
        if (success) {
            element.classList.remove("alert-danger")
            element.classList.remove("d-none")
        } else {
            element.classList.add("alert-danger")
            element.classList.remove("d-none")
        }
    }

    /**
     * Disable button
     * 
     * @param {node} element 
     * @param {boolean} disable 
     */
     static toggleDisabled(element, disable) {
        if (disable) {
            element.setAttribute("disabled", "disabled")
            element.classList.add("disabled")
        } else {
            element.removeAttribute("disabled")
            element.classList.remove("disabled")
        }
    }
}