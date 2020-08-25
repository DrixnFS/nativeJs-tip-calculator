/**
 * Namespace with functionality for listeners
 * @namespace
 * @author Martin Krzyzanek
 */
const ListenerHandler = {

    /**
     * CallBack function for listener, requests TipHandler to save price from input, recalculates final price and updates the view
     * @param {Event} e - event received from listener
     */
    handlePriceChange(e){
        ListenerHandler._resetErrors('price');

        let parsed_value = parseInt( e.currentTarget.value );

        //Check if input is empty or has 0 as value, if so fixes the final price so outdated data arent shown
        if(parsed_value == 0 || isNaN(parsed_value)) ListenerHandler._nullPricesOnError();

        let res = TipHandler.setPrice(parsed_value);
        if(!res){
            ListenerHandler.handleInputErrors('price');
            return false;
        }

        //Updates the prices in UI only if no errors are present
        if(!ListenerHandler._isErrPresent()) ListenerHandler._updatePrices();
    },

    /**
     * CallBack function for listener, requests TipHandler to save service quality from input, recalculates final price and updates the view
     * @param {Event} e - event received from listener
     */
    handleQualityChange(e){

        ListenerHandler._resetErrors('serv_quality');

        let res = TipHandler.setServQuality(e.currentTarget.value);
        if(!res){
            ListenerHandler.handleInputErrors('serv_quality');
            return false;
        }
        
        //Updates the prices in UI only if no errors are present
        if(!ListenerHandler._isErrPresent()) ListenerHandler._updatePrices();
    },

    /**
     * CallBack function for listener, requests TipHandler to save customer count from input, recalculates final price and updates the view
     * @param {Event} e - event received from listener
     */
    handleCustomerCountChange(e){
        ListenerHandler._resetErrors('cust_count');

        let parsed_value = parseInt( e.currentTarget.value );

        //Check if input is empty or has 1 as value, if so fixes the final price so outdated data arent shown
        if(parsed_value == 1 || isNaN(parsed_value)) ListenerHandler._nullPricesOnError();

        let res = TipHandler.setCustomerCount(parsed_value);
        if(!res){
            ListenerHandler.handleInputErrors('cust_count');
            return false;
        }

        //Updates the prices in UI only if no errors are present
        if(!ListenerHandler._isErrPresent()) ListenerHandler._updatePrices();
    },

    /**
     * Handles showing of errors for specific parts of the form based on type, which is dataset labelType from the UI.
     * @param {String} type - data-labelType value of label so the code knows where to look for elements
     */
    handleInputErrors(type){
        if(!type){
            console.error('ListenerHandler.handleInputErrors:71 - no "type" arg received!');
            return false;
        }

        try{
            //Gets label which contains all the elements of specific part of form, then sets small with err to be visible
            let containing_label = document.querySelector(`#main-content label[data-labelType="${type}"]`);
            containing_label.querySelector('small').classList.add('el-visible');

            //Gets either input or select, nothing else supported rn, from the container and add has-error class on it
            let element = containing_label.querySelector('input') || containing_label.querySelector('select');
            if(element) element.classList.add('has-error');
        } catch(err){
            console.error(`Error occured in ListenerHandler.handleInputErrors:69 -- ${err}`);
        }
    },

    /**
     * 'private' helper function that resets all the error elements in UI to its current state so its not showing up
     */
    _resetErrors(type){
        if(!type){
            console.error('ListenerHandler._resetErrors:90 - no "type" arg received!');
            return false;
        }

        //Gets all visible small elements with errors and hides them
        let visible_errors =  document.querySelectorAll(`#main-content label[data-labelType="${type}"] .el-visible`);
        if(visible_errors.length) visible_errors.forEach(el => el.classList.remove('el-visible'));

        //Gets all elements with error class on them and removes that class
        let error_elems = document.querySelectorAll(`#main-content label[data-labelType="${type}"] .has-error`);
        if(error_elems.length) error_elems.forEach(el => el.classList.remove('has-error'));
    },
    
    /**
     * 'private' helper function that updates the view of Final price with the one set inside TipHandler
     */
    _updatePrices(){
        document.getElementById('final-price').textContent = TipHandler.final_price;
        document.getElementById('tip-price').textContent = TipHandler.tip_price;
    },

    /**
     * 'private' helper function that fixes the final price still showing when input is empty or has default value
     */
    _nullPricesOnError(){
        TipHandler.final_price = 0;
        TipHandler.tip_price = 0;
        ListenerHandler._updatePrices();
    },

    /**
     * Function that checks if error is present in the form and returns boolean
     * @returns {Boolean} t/f based on if error was found in the form
     */
    _isErrPresent(){
        return document.querySelectorAll(`#main-content .has-error`).length ? true : false;
    }

};