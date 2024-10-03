var TransactionType;
(function (TransactionType) {
    TransactionType["Income"] = "\u0414\u043E\u0445\u043E\u0434";
    TransactionType["Expense"] = "\u0420\u0430\u0441\u0445\u043E\u0434";
})(TransactionType || (TransactionType = {}));
var FinanceTracker = /** @class */ (function () {
    function FinanceTracker() {
        this.transactions = [];
        this.loadFromLocalStorage();
    }
    FinanceTracker.prototype.addTransaction = function (trans) {
        this.transactions.push(trans);
        this.saveToLocalStorage();
        this.render();
    };
    FinanceTracker.prototype.removeTransaction = function (removedID) {
        var updatedTransactions = [];
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var trans = _a[_i];
            if (trans.id !== removedID) {
                updatedTransactions.push(trans);
            }
        }
        this.transactions = updatedTransactions;
        this.saveToLocalStorage();
        this.render();
    };
    FinanceTracker.prototype.getBalance = function () {
        var balance = 0;
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            if (transaction.type === TransactionType.Income) {
                balance += transaction.amount;
            }
            else {
                balance -= transaction.amount;
            }
        }
        return balance;
    };
    // этот метод нигде не будет использован. Однако мы его оставим лишь для того, чтобы в каком-то случае обращаться в этому методу вне класса и получать данные.
    FinanceTracker.prototype.getTransactions = function () {
        // !! вернуть массив транзакций;
        return this.transactions;
    };
    FinanceTracker.prototype.saveToLocalStorage = function () {
        localStorage.setItem("transactions", JSON.stringify(this.transactions));
    };
    FinanceTracker.prototype.loadFromLocalStorage = function () {
        var data = localStorage.getItem("transactions");
        if (data) {
            var parsedData = JSON.parse(data);
            // Преобразовать строку даты в объект Date
            for (var _i = 0, parsedData_1 = parsedData; _i < parsedData_1.length; _i++) {
                var transaction = parsedData_1[_i];
                transaction.date = new Date(transaction.date);
            }
            this.transactions = parsedData;
            // Вызвать метод для обновления интерфейса
            this.render();
        }
    };
    FinanceTracker.prototype.render = function () {
        var balanceElement = document.getElementById("balance");
        var transactionsElement = document.getElementById("transactions");
        if (!balanceElement || !transactionsElement)
            return;
        transactionsElement.innerHTML = "";
        // Для каждой транзакции создать элемент списка:
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            var li = document.createElement("li");
            li.className = "transaction-item";
            // Добавить описание, сумму и дату:
            li.innerHTML = "\n                <p>\n                <b>".concat(transaction.description, ":</b>  ").concat(formatCurrency(transaction.amount), "\n                    (").concat(transaction.type, ") - ").concat(transaction.date.toLocaleDateString(), "\n                </p>\n                <button onclick=\"removeTransaction(").concat(transaction.id, ")\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>\n            ");
            // Добавить элемент в список:
            transactionsElement.appendChild(li);
        }
    };
    return FinanceTracker;
}());
var CurrentTracker = new FinanceTracker();
function formatCurrency(balance) {
    return "".concat(balance.toFixed(2), " \u0440\u0443\u0431.");
}
//Пример: Если передать 123.456, функция вернёт "123.46 руб.".
function addTransactionButton() {
    var descriptionElement = document.getElementById("description");
    var amountElement = document.getElementById("amount");
    var typeElement = document.getElementById("type");
    if (!descriptionElement || !amountElement || !typeElement)
        return;
    var description = descriptionElement.value;
    var amount = parseFloat(amountElement.value);
    var type = typeElement.value;
    // Добавить проверку:
    if (!description || isNaN(amount)) {
        alert("Введите корректные данные.");
        return;
    }
    var transaction = {
        id: Date.now(),
        amount: amount,
        type: type,
        description: description,
        date: new Date(),
    };
    CurrentTracker.addTransaction(transaction);
    descriptionElement.value = "";
    amountElement.value = "";
}
function removeTransaction(removedID) {
    CurrentTracker.removeTransaction(removedID);
}
