// START CODE & Instructions

/*
  #1 - Create an interface that describes the structure of the item objects in the `todoItems` array
  Then strongly type the `todoItems` array
*/

interface Item {
    id: number,
    title: string,
    status: Status,
    completedOn?: Date
}


/*
  #2 - Strongly type the `status` property with an enum
  Note the `status` values below: "done", "in-progess" etc
*/

enum Status {
    done = "done",
    progress = "in-progress",
    todo = "todo"
}


/*
  #3 - Strongly type the parameters and return values of `addTodoItem()` and `getNextId()`
*/

// **When you are done, there must not be any errors under the Playground's "Errors" tab**

const todoItems: Array<Item> = [
    { id: 1, title: "Learn HTML", status: Status.done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status:Status.progress },
    { id: 3, title: "Write the best web app in the world", status: Status.todo },
]

function addTodoItem(todo: Item) {
    const id = getNextId(todoItems)

    const newTodo: Item = {
        id,
        title: todo.title,
        status:Status.todo,
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId(items: Array<Item>) {
    return items.reduce((max, x) => x.id > max ? max : x.id, 0) + 1
}

// "Buy lots of stuff with all the money we make from the app"
let money: Item =
{
  id: 99999,
  title: "Buy lots of stuff with all the money we make from the app",
  status: Status.todo
}


const newTodo = addTodoItem(money)

console.log(JSON.stringify(newTodo))