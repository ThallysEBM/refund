const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")


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
// Adiciona um novo item na lista
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

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`

        // Cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "./img/remove.svg")
        removeIcon.setAttribute("alt", "icone de remover")

        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Limpa o formulario
        formClear()

        updateTotals()



    } catch (error) {
        alert("Não foi possível atualizar a lista.")
        console.log(error)
    }
}

// Atualiza os totais

function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista (ul)
        const items = expenseList.children

        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        // Variavel para incrementar o total

        let total = 0 

        // Percorre cada item (li) da lista(lu)
        for(let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            //Remove caracteres não numéricos e substitui a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            // Converte o valor para float.
            value = parseFloat(value)

            // Verifica se é um número válido
            if(isNaN(value)) {
                return alert("Nao foi possível calcular, o valor nao parecer ser um numero")
            }

            // Incrementar o valor total.
            total += Number(value)
        }

        // Cria a span para adicionar o R$ formatado.
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"

        // Formata o valor e remove o R$ que será exibido pela small
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

        expenseTotal.innerHTML = ""


        expenseTotal.append(symbolBRL, total)

    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais.")
    }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function(event){

    if(event.target.classList.contains("remove-icon")){
        const item = event.target.closest(".expense")
        item.remove()
    }
    updateTotals()

})

function formClear() {
    // Limpa os inputs
    expense.value = ""
    category.value = ""
    amount.value = ""



    expense.focus()
}