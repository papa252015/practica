interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  description: string;
  date: Date;
}

enum TransactionType {
  Income = "Доход",
  Expense = "Расход",
}

class FinanceTracker {
  private transactions: Transaction[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  addTransaction(trans: Transaction): void {
    this.transactions.push(trans);
    this.saveToLocalStorage();
    this.render();
  }

  removeTransaction(removedID: number): void {
    let updatedTransactions: Transaction[] = [];
    for (let trans of this.transactions) {
      if (trans.id !== removedID) {
        updatedTransactions.push(trans);
      }
    }
    this.transactions = updatedTransactions;
    this.saveToLocalStorage();
    this.render();
  }

  getBalance(): number {
    let balance: number = 0;
    for (let transaction of this.transactions) {
      if (transaction.type === TransactionType.Income) {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    }
    return balance;
  }

  // этот метод нигде не будет использован. Однако мы его оставим лишь для того, чтобы в каком-то случае обращаться в этому методу вне класса и получать данные.
  getTransactions(): Transaction[] {
    // !! вернуть массив транзакций;
    return this.transactions;
  }

  saveToLocalStorage(): void {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  loadFromLocalStorage(): void {
    const data = localStorage.getItem("transactions");
    if (data) {
      const parsedData = JSON.parse(data);
      // Преобразовать строку даты в объект Date
      for (let transaction of parsedData) {
        transaction.date = new Date(transaction.date);
      }
      this.transactions = parsedData;
      // Вызвать метод для обновления интерфейса
      this.render();
    }
  }

  render(): void {
    const balanceElement = document.getElementById("balance");
    const transactionsElement = document.getElementById("transactions");
    if (!balanceElement || !transactionsElement) return;
    transactionsElement.innerHTML = "";
    // Для каждой транзакции создать элемент списка:
    for (let transaction of this.transactions) {
      const li = document.createElement("li");
      li.className = "transaction-item";
      // Добавить описание, сумму и дату:
      li.innerHTML = `
                <p>
                <b>${transaction.description}:</b>  ${formatCurrency(
        transaction.amount
      )}
                    (${
                      transaction.type
                    }) - ${transaction.date.toLocaleDateString()}
                </p>
                <button onclick="removeTransaction(${
                  transaction.id
                })">Удалить</button>
            `;
      // Добавить элемент в список:
      transactionsElement.appendChild(li);
    }
  }
}

let CurrentTracker: FinanceTracker = new FinanceTracker();

function formatCurrency(balance: number): string {
  return `${balance.toFixed(2)} руб.`;
}
//Пример: Если передать 123.456, функция вернёт "123.46 руб.".

function addTransactionButton() {
  const descriptionElement = document.getElementById(
    "description"
  ) as HTMLInputElement;
  const amountElement = document.getElementById("amount") as HTMLInputElement;
  const typeElement = document.getElementById("type") as HTMLSelectElement;

  if (!descriptionElement || !amountElement || !typeElement) return;
  const description: string = descriptionElement.value;
  const amount: number = parseFloat(amountElement.value);
  const type: TransactionType = typeElement.value as TransactionType;

  // Добавить проверку:
  if (!description || isNaN(amount)) {
    alert("Введите корректные данные.");
    return;
  }
  const transaction: Transaction = {
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

function removeTransaction(removedID: number): void {
  CurrentTracker.removeTransaction(removedID);
}
