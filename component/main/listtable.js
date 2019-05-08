const tagSearchBar = Vue.component('tag-search-bar', {
	data() {
		return {
			isSelectOnly: false,
			allownew: false,
			filteredTags: [],
			tags: [],
			limit: null,
			severity: '',
			done: 'inProgress'
		}
	},
	mounted: function () {
		this.setSearchParams()
	},
	methods: {
		getFilteredTags(text) {
			this.filteredTags = store.tags.list.filter((option) => {
				return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
			})
		},
		setSearchParams() {
			this.$emit('search', this.tags, this.limit, this.severity, this.done)
		},
		clearSearchParams() {
			this.tags = []
			this.limit = null
			this.severity = ''
			this.done = ''
			this.$emit('search', this.tags, this.limit, this.severity, this.done)
		}
	},
	template: '\
	<section>\
		<form>\
			<b-field grouped>\
				<b-field label="Enter Some Tags">\
					<b-taginput\
						v-model="tags"\
						type="is-dark"\
						:data="filteredTags"\
						autocomplete\
						icon="label"\
						placeholder="Add a tag"\
						@typing="getFilteredTags">\
					</b-taginput>\
				</b-field>\
	\
				<b-field label="Enter Limit">\
					<b-datepicker\
						v-model="limit"\
						icon="calendar-today"\
						placeholder="click to select...">\
					</b-datepicker>\
				</b-field>\
	\
				<b-field label="Severity">\
					<b-select plceholder="Select a severity" v-model="severity">\
						<option value="High">High</option>\
						<option value="Medium">Medium</option>\
						<option value="Low">Low</option>\
						<option value="All">All</option>\
					</b-select>\
				</b-field>\
	\
				<b-field label="Done">\
					<b-select plceholder="Select Status" v-model="done">\
						<option value="Done">Done</option>\
						<option value="inProgress">In Progress</option>\
						<option value="All">All</option>\
					</b-select>\
				</b-field>\
			</b-field>\
			<button class="button is-info" @click.prevent="setSearchParams">Search</button>\
			<button class="button is-info" @click.prevent="clearSearchParams">Clear</button>\
		</form>\
	</section>\
	'
})

const listingTodo = Vue.component('listing-todo', {
	data: function() {
		return {
			searchParams: { tags: [], limit: null, severity: '', done: 'inProgress' },
			defaultOpenedDetails: [1],
			showDetailIcon: true
		}
	},
	computed: {
		todolist: function () {
			return filterTodos(store.todos.list, this.searchParams)
		}
	},
	methods: {
		toggle(row) {
			this.$refs.table.toggleDetails(row)
		},
		formatedDate(date) {
			return dateFormat(date)
		},
		markedDatail(detail) {
			return marked(detail, { sanitize:true })
		},
		executeSearch (tags, limit, severity, done) {
			tmp = { tags: tags, limit: limit, severity: severity, done: done }
			this.searchParams = tmp
		}
	},
	template: '\
	<div>\
		<b-table\
			:data="todolist"\
			ref="table"\
			paginated\
			per-page="15"\
			:opened-detailed="defaultOpenedDetails"\
			:narrowed="true"\
			detailed\
			detail-key="id"\
			:show-detail-icon="showDetailIcon"\
		>\
			<template slot-scope="props">\
				<b-table-column field="title" label="Title" sortable>\
					<a @click="toggle(props.row)">\
						{{ props.row.title }}\
					</a>\
				</b-table-column>\
				<b-table-column field="limit" label="Deadline" sortable>\
					{{ formatedDate(props.row.limit) }}\
				</b-table-column>\
				<b-table-column field="severity" label="Severity" sortable>\
					<span v-if="props.row.severity === \'High\'" class="tag is-danger">{{ props.row.severity }}</span>\
					<span v-else-if="props.row.severity === \'Medium\'" class="tag is-dark">{{ props.row.severity }}</span>\
					<span v-else class="tag is-info">{{ props.row.severity }}</span>\
				</b-table-column>\
				<b-table-column field="done" label="Done" sortable>\
					<button v-if="props.row.done" @click.prevent="$emit(\'cancel-done\', (props.row.id))" class="button is-success">\
						<b-icon icon="check"></b-icon>\
						<span>{{ formatedDate(props.row.executeDate) }}</span>\
					</button>\
					<button v-else @click.prevent="$emit(\'done\', (props.row.id))" class="button">\
						<b-icon icon="check-outline"></b-icon>\
					</button>\
				</b-table-column>\
				<b-table-column label="Edit">\
					<button @click.prevent="$emit(\'edit\', (props.row), false)" class="button is-white">\
						<b-icon icon="pencil"></b-icon>\
					</button>\
				</b-table-column>\
			</template>\
			<template slot="detail" slot-scope="props">\
				<article class="media">\
					<div class="media-content">\
						<div class="content">\
							<p class="subtitle">Tag</p>\
							<div class="tags">\
								<span v-for="tag in props.row.taskTags" class="tag is-dark">{{ tag }}</span>\
							</div>\
							<p class="subtitle">Detail</p>\
							<div class="box">\
								<div class="field is-grouped is-grouped-multiline">\
									<p v-html="markedDatail(props.row.detail)">\
									</p>\
								</div>\
							</div>\
						</div>\
					</div>\
				</article>\
			</template>\
		</b-table>\
		<footer>\
			<tag-search-bar @search="executeSearch"></tag-search-bar>\
		</footer>\
	</div>\
	'
})

const listTable = Vue.component('list-table', {
	template: '\
	<div>\
		<listing-todo @done="toggleDone" @edit="editTodoModal" @cancel-done="toggleDone"></listing-todo>\
	</div>\
	',
	methods: {
		editTodoModal(todo=null, isNew=false) {
			this.$modal.open({
				parent: this,
				props: {todo: todo, isNew: isNew},
				component: EditTodoModal,
				hasModalCard: true
			})
		},
		toggleDone (id) {
			store.todos.toggleDone(id)
		}
	}
})

/*
 * Todo filter functions
*/
const filterTodos = (todos, searchParams) => {
	let result = todos
	if (searchParams.tags.length > 0) {
		result = filterTodosByTags(result, searchParams.tags)
	}
	if (searchParams.done !== '') {
		result = filterTodosByDone(result, searchParams.done)
	}
	if (searchParams.severity !== '') {
		result = filterTodosBySeverity(result, searchParams.severity)
	}
	if (searchParams.limit !== null) {
		result = filterTodosByLimit(result, searchParams.limit)
	}
	return result
}

const filterTodosByTags = (todos, tags) =>{
	let filteredArray = todos.filter(todo => {
		count = 0
		tags.forEach(tag => {
			if (todo.taskTags.indexOf(tag) >= 0) {
				count++
			}
		})
		return count === tags.length
	})
	return filteredArray
}

const filterTodosByLimit = (todos, limit) => {
	limit.setDate(limit.getDate() + 1)
	return todos.filter(todo => {
		return todo.limit <= limit
	})
}

const filterTodosBySeverity = (todos, severity) => {
	if (severity === 'All') {
		return todos
	}
	return todos.filter(todo => {return todo.severity === severity})
}

const filterTodosByDone = (todos, done) => {
	if (done === 'Done') {
		return todos.filter(todo => { return todo.done })
	} else if (done === 'inProgress') {
		return todos.filter(todo => { return !todo.done })
	} else {
		return todos
	}
}
