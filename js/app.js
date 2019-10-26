// Budget Controller for data manupulation and data-structuring.
var budgetController = ( function() {

    // Constructor for expense-type data storage.
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // Constructor for income-type data storage.
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // Data-Structure to store all expenses, incomes, and their totals.
    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            totalIncome: 0,
            totalExpense: 0,
        }
    }

    // Public API's
    return {

        // API to add item in our data-structure.
        addItem: function(type, des, val) {
            var newItem, ID;

            if(data.allItems[type].length == 0){
                ID = 0
            }
            else{
                ID = data.allItems[type][data.allItems[type].length -1].id + 1
            }

            if(type == 'inc'){
                newItem = new Income(ID, des, val)
            }
            else{
                newItem = new Expense(ID, des, val)
            }

            // Push it into our Data-Structure.
            data.allItems[type].push(newItem);
            // Return the newItem to be used further.
            return newItem;
        },

    }

})();


// UI Controller for display of data.
var UIController = ( function() {

    // Centralised argument strings for querySelector.
    var DomStrings = {
        inputType: '.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    }

    // Public API's.
    return {

        // API to fetch and return input data from DOM in form of object.
        getInput: function(){
            return {
                type: document.querySelector(DomStrings.inputType).value,
                description: document.querySelector(DomStrings.inputDescription).value,
                value: document.querySelector(DomStrings.inputValue).value
            };
        },

        // API to add data to respective UI.
        addListItem: function(obj, type) {
            var html, newHtml, element;

            // Create html with placeholder.
            if(type == 'inc'){
                element = DomStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%demo%"><div class="item__description"> %description% </div><div class="right clearfix"><div class="item__value">+ %value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else{
                element = DomStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%demo%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value% </div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace placeholder with some actual data.
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert html into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        // API to return centralised DomStrings.
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

        var input, newItem;
        //Get input from the text-fields.
        input = UICtrl.getInput();

        // Adding the input in the budget-controller.
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // Adding the input from text-fields to the respective UI.
        UICtrl.addListItem(newItem, input.type);

    };

    // Public API's.
    return {
        // Execution of code starts from init(), Setting the same as public exposed API.
        init: function(){
            eventListenerSetup();
        }
    };

})(budgetController, UIController);

controller.init();