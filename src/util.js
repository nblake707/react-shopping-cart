export default {
    //accepts a number and turns it into currency format
    formatCurrency: function(num){
        return '$' + Number(num.toFixed(2)).toLocaleString() + '';
    }
}