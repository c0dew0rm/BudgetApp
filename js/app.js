// Budget Controller for data manupulation and data-structuring.
var budgetController = ( function() {

})();


// UI Controller for display of data.
var UIController = ( function() {

    // Centralised argument strings for querySelector.
    var DomStrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    // Public API's
    return {

        // Function to fetch and return input data from DOM in form of object. 
        getInput: function(){
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: document.querySelector(DomStrings.inputValue).value
            };
        },

        // Function to return centralised DomStrings.
        getDomStrings: function(){
            return {
                DomStrings,
            };
        }

    }
})();


// Global Controller
var controller = ( function(budgetCtrl, UICtrl) {

    var Dom = UICtrl.getDomStrings();

    // Centralised eventListeners.
    var eventListenerSetup = function(){

        // Click submit button eventListner. 
        document.querySelector(Dom.DomStrings.inputBtn).addEventListener('click', ctrlAddItem);

        // Pressing 'Enter' eventListner. 
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13 || event.key === 'Enter'){
                ctrlAddItem();
            }
        });

    };

    // Adding expense's and incomes in the UI.
    var ctrlAddItem = function() {

        //Get input from the fields.
        console.log(UICtrl.getInput());
    };

    return {
        init: function(){
            eventListenerSetup();
        }
    };

})(budgetController, UIController);

controller.init();