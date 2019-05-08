/*
 * Util functions
*/
const findTodoIndexById = (id) => {
	let index = store.todos.list.findIndex(todo => {
		return todo.id === id
	})
	return index
}

const dateFormat = (date) => {
	if (date === undefined) {
		return 'undefined'
	}
	let year = date.getFullYear().toString()
	let month = (date.getMonth() + 1).toString()
	let day = date.getDate().toString()
	return year + '/' + month + '/' + day
}
