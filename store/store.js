/*
 * Store
*/
const todoStorage = 'todos'
const tagStorage = 'tags'
const storage = {
	fetchTodos () {
		const todos = JSON.parse(localStorage.getItem(todoStorage) || '[]')
		todos.forEach(todo => {
			todo.limit = new Date(todo.limit)
			if (todo.limit !== null) {
				todo.executeDate = new Date(todo.executeDate)
			}
		})
		return todos
	},
	fetchTags () {
		const tags = JSON.parse(localStorage.getItem(tagStorage) || '[]')
		return tags
	},
	saveTodos (todos) {
		const  data = JSON.stringify(todos)
		localStorage.setItem(todoStorage, data)
	},
	saveTags (tags) {
		const  data = JSON.stringify(tags)
		localStorage.setItem(tagStorage, data)
	}
}

const store = {
	todos: {
		list: storage.fetchTodos(),
		getDoneList: () => {
			return store.todos.list.filter(todo => {
				return todo.done
			})
		},
		add: (task) => {
			store.todos.list.push(task)
			storage.saveTodos(store.todos.list)
		},
		remove: (id) => {
			store.todos.list.splice(findTodoIndexById(id), 1)
			storage.saveTodos(store.todos.list)
		},
		edit: (task, id) => {
			store.todos.list.splice(findTodoIndexById(id), 1, task)
			storage.saveTodos(store.todos.list)
		},
		toggleDone: (id) => {
			let index = findTodoIndexById(id)
			let tmp = store.todos.list[index]
			if (tmp.done) {
				tmp.executeDate = null
			} else {
				tmp.executeDate = new Date()
			}
			tmp.done = !tmp.done
			store.todos.list.splice(index, 1, tmp)
			storage.saveTodos(store.todos.list)
		},
		searchParams: {
			tags: [],
			limit: null,
			severity: '',
			done: ''
		}
	},
	tags: {
		list: storage.fetchTags(),
		add: (tag) => {
			if (store.tags.list.indexOf(tag) === -1) {
				store.tags.list.push(tag)
			}
		},
		addTags: (tags) => {
			tags.forEach(tag => {
				store.tags.add(tag)
			})
			storage.saveTags(store.tags.list)
		}
	},
	currentMainComponent: {
		name: 'dashboard',
		setCurrentMainComponent: (name) => {
			store.currentMainComponent.name = name
		}
	}
}
