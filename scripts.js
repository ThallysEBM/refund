const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expenseList = document.querySelector("ul")


// Captura o evento de input 
amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")


    value = Number(value) / 100

    amount.value = formatCurrencyBRL(value)

}

function formatCurrencyBRL(value) {
    
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa.

        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")


        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da depesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)
        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo)
        // Adiciona o item na lista
        expenseList.append(expenseItem)



    } catch (error) {
        alert("Não foi possível atualizar a lista.")
        console.log(error)
    }
}