/**
 * Namespace of TipHandler which handles functionality and data for handling the tips
 * @namespace
 * @author Martin Krzyzanek
 */
const TipHandler = {
    /**
     * Margin table for tip calculating
     */
    tip_margins : {
        'bad' : 2,
        'good' : 10,
        'perfect' : 15
    },
    /**
     * Value of money addition per customer
     */
    cust_addition: 25,
    /**
     * Stores the price from the price input
     */
    price : 0,
    /**
     * Stores customer count from the customer input
     */
    cust_count : 1,
    /**
     * Stores service quality value from service quality input
     */
    serv_quality : 'bad',
    /**
     * Stores value of tip price represented in the UI
     */
    tip_price : 0,
    /**
     * Stores value of final price represented in the UI
     */
    final_price : 0,

    /**
     * Sets received arg into object's price variable and re-calculates the final price
     * @param {int} value - number to be saved as price
     * @returns {Boolean} if value received is supported returns true otherwise false
     */
    setPrice(value){
        let res = false;

        //Check if value received is actually integer and is not in negative amount
        if(Number.isInteger(value) && value >= 0){
            TipHandler.price = value;
            TipHandler.calcTipPrice();
            TipHandler.calcFinalPrice();
            res = true;
        } 

        return res;
    },

    /**
     * Sets received arg into object's service quality variable and re-calculates the final price
     * @param {string} value - string to be saved as service quality
     * @returns {Boolean} if value received is supported returns true otherwise false
     */
    setServQuality(value){
        let res = false;

        //Check if value received from the select is actualy one supported by margin table
        if(TipHandler.tip_margins[value]){
            TipHandler.serv_quality = value;
            TipHandler.calcTipPrice();
            TipHandler.calcFinalPrice();
            res = true;
        }

        return res;
    },

    /**
     * Sets received arg into object's customer count variable and re-calculates the final price
     * @param {int} value - number to be saved as customer count
     * @returns {Boolean} if value received is supported returns true otherwise false
     */
    setCustomerCount(value){
        let res = false;

        //Check if value received is actually integer and is higher than 1
        if(Number.isInteger(value) && value >= 1){
            //fix if there is error in the input and then fixed so the code recalculates the tip also
            if(TipHandler.cust_count == value) TipHandler.calcTipPrice();
            
            TipHandler.cust_count = value;
            TipHandler.calcFinalPrice();
            res = true;
        }

        return res;
    },

    /**
     * Calculates the final price with the tip and customer addition then rounds it up and sets it into the object
     */
    calcFinalPrice(){
        try{
            let res = TipHandler._roundAndFormatPrice(TipHandler._getPriceAfterTip() + TipHandler._getCustomerAddition());
            //slight fix for when there are errors in UI it wont show negative zero
            res = res == -0 ? 0 : res;

            TipHandler.final_price = res;
        } catch(err){
            console.error(`Error occured in TipHandler.calcFinalPrice:99 -- ${err}`);
        }
    },

    /**
     * 
     */
    calcTipPrice(){
        try{
            TipHandler.tip_price = TipHandler._getPriceTip();
        } catch(err){
            console.error(`Error occured in TipHandler.calcTipPrice:114 -- ${err}`);
        }
    },

    /**
     * 'private' helper function to calculate addition to price based on customer count
     * @returns {int} customer addition price
     */
    _getCustomerAddition(){
        return TipHandler.cust_count > 1 ? TipHandler.cust_addition * (TipHandler.cust_count - 1) : 0;
    },

    /**
     * 'private' helper function to calculate price after addition of tip
     * @returns {int} price including the tax
     */
    _getPriceAfterTip(){
        return TipHandler.price + TipHandler._getPriceTip();
    },

    /**
     * 'private' helper function that calculates tip from the price
     * @returns {int} integer representing amount of tip value
     */
    _getPriceTip(){
        return ( TipHandler.price / 100 ) * TipHandler.tip_margins[TipHandler.serv_quality];
    },

    /**
     * 'private' helper function which rounds up number received to the closest 10 and makes it easier to read
     * @param {int} number - any number needed to be rounded up
     * @returns {int} rounded up number in readable format
     */
    _roundAndFormatPrice(number){
        //number - 1 is there becouse ceil rounds up everything, so if the number is 1 it returns 10 if its 10 it equals 20, this way it makes sure the round numbers stays
        return (Math.ceil(parseFloat(number - 1) / 10) * 10).toLocaleString();
    }
};