class CustomOrderID{
    static orderID = null;

    static setOrderID(v){
        this.orderID = v;
    }
    static getOrderID(){
        return this.orderID
    }
}

export default CustomOrderID;