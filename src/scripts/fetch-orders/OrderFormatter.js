class OrderFormatter {
    constructor(params) {
        this.params = params;
        this.fields = params.fields;
        this.orders = params.orders;
        this.extractRequiredFields = this.extractRequiredFields.bind(this);
    }

    /**
     * @description Given a full order object, it extracts only the needed fields and returns as new order object
     * @param {object} order : ;
     * @returns {object}
     */
    extractRequiredFields (order) {
        const newOrder = {};

        for(const field of this.fields){
            newOrder[field] = order[field];
        }

        return newOrder;
    }

    /**
     * @description Processes list of orders and returns each with only thte required fields
     * @returns {string}
     */
    getFormattedOrders () {
       const formattedOrders = this.orders.map(this.extractRequiredFields);
       return formattedOrders;
    }

}

export default OrderFormatter;
