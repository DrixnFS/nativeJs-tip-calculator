/**
 * Namespace with functionality for listeners
 * @namespace
 * @author Martin Krzyzanek
 */
var ListenerHandler = {

    /**
     * CallBack function for listener, requests TipHandler to save price from input, recalculates final price and updates the view
     * @param {Event} e - event received from listener
     */
    handlePriceChange(e){
        var parsed_value = parseInt( e.currentTarget.value );

        //Check if the price is different from the one set
        if(TipHandler.price != parsed_value) {
            TipHandler.setPrice(parsed_value);
            ListenerHandler._updateFinalPrice();
        }
    },

    /**
     * CallBack function for listener, requests TipHandler to save service quality from input, recalculates final price and updates the view
     * @param {Event} e - event received from listener
     */
    handleQualityChange(e){
        TipHandler.setServQuality(e.currentTarget.value);
        ListenerHandler._updateFinalPrice();
    },

    /**
     * CallBack function for listener, requests TipHandler to save customer count from input, recalculates final price and updates the view
     * @param {Event} e - event received from listener
     */
    handleCustomerCountChange(e){
        var parsed_value = parseInt( e.currentTarget.value );

        //Check if the price is different from the one set
        if(TipHandler.cust_count != parsed_value) {
            TipHandler.setCustomerCount(parsed_value);
            ListenerHandler._updateFinalPrice();
        }
    },

    /**
     * 'private' helper function that updates the view of Final price with the one set inside TipHandler
     */
    _updateFinalPrice(){
        document.getElementById('final-price').textContent = TipHandler.final_price;
    }

};