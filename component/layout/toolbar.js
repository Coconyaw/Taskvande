const toolbar = Vue.component('toolbar', {
	props: ['currentMainComponent'],
	data () {
		return {
			now: '',
			dateObject: null
		}
	},
	mounted () {
		this.setNow()
		this.createDateObject()
	},
	template: '\
	<nav class="navbar" role="navigation" aria-label="main navigation">\
		<div class="navbar-brand">\
			<div class="navbar-item title">{{ currentMainComponent.toUpperCase() }}</div>\
		</div>\
		<div class="navbar-menu">\
			<div class="navbar-start">\
				<a class="navbar-item">{{ now }}</a>\
				<a class="navbar-item" @click.prevent="editTodoModal(null, true)">\
					<b-icon icon="plus" size="medium"></b-icon>\
				</a>\
			</div>\
			<div class="navbar-end">\
				<a class="navbar-item" id="download" @click.prevent="backupData" download="dummy.txt">\
					<b-icon icon="ghost" size="medium"></b-icon>\
				</a>\
			</div>\
		</div>\
	</nav>\
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
		backupData() {
			todosJson = JSON.stringify(store.todos.list, undefined, 2)
			tagsJson = JSON.stringify(store.tags.list, undefined, 2)
			textFileDownload('todos.json', todosJson)
			textFileDownload('tags.json', tagsJson)
		},
		setNow() {
			this.now = moment().format('LLLL')
		},
		createDateObject() {
			const self = this
			const tensec = 10000
			this.dateObject = setInterval(function() {self.setNow()}, tensec)
		}
	}
})

const textFileDownload = (filename, data) => {
	const blob = new Blob([ data ], { 'type': 'text/plain' })
	const downloadLink = document.createElement('a')
	downloadLink.download = filename
	downloadLink.href = URL.createObjectURL(blob)
	downloadLink.dataset.downloadurl = ['text/plain', downloadLink.download, downloadLink.href]
	downloadLink.click()
}
