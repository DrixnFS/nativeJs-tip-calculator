window.onload = ()=>{

    //onChange listener on price input in the view, for manualy selecting the price using input arrows
    document.getElementById('main-price').addEventListener('change', ListenerHandler.handlePriceChange);

    //onKeyUp listener on price input in the view, for typing in the price
    document.getElementById('main-price').addEventListener('keyup', ListenerHandler.handlePriceChange);

    //onChange listener on service quality input in the view, for manualy selecting the option
    document.getElementById('service-quality').addEventListener('change', ListenerHandler.handleQualityChange);

    //onChange listener on customer count input in the view, for manualy selecting the customer count using input arrows
    document.getElementById('customer-count').addEventListener('change', ListenerHandler.handleCustomerCountChange);

    //onKeyUp listener on customer count input in the view, for typing in the customer count
    document.getElementById('customer-count').addEventListener('keyup', ListenerHandler.handleCustomerCountChange);

};