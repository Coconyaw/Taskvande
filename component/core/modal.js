const generateUuid = () => {
	let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

const EditTodoModal = Vue.component ('edit-todo-modal', {
	props: ['todo', 'isNew'],
	data: function() {
		return {
			filteredTags: store.tags.list,
			isSelectOnly: false,
			allownew: true,
			filteredTags: [],
			taskTitle: this.todo ? this.todo.title : '',
			taskDetail: this.todo ? this.todo.detail : '',
			taskLimit: this.todo ? this.todo.limit : null,
			taskTagList: this.todo ? this.todo.taskTags : [],
			taskSeverity: this.todo ? this.todo.severity : '',
			id: this.todo ? this.todo.id : ''
		}
	},
	methods: {
		getFilteredTags(text) {
			this.filteredTags = store.tags.list.filter((option) => {
				return option.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
			})
		},
		pushTodo (title, detail, limit, tags, severity) {
			const newTodo = {
				id: generateUuid(),
				title: title,
				detail: detail,
				limit: limit,
				taskTags: tags,
				severity: severity,
				createDate: new Date(),
				executeDate: null,
				done: false
			}
			store.todos.add(newTodo)
			store.tags.addTags(tags)
			this.$toast.open({
				message: `${title} is pushed. ID: ${newTodo.id}`,
				queue: false,
				type: 'is-success'
			})
			app.updated = generateUuid()
			this.$parent.close()
		},
		editTodo (title, detail, limit, tags, severity, id) {
			const index = findTodoIndexById(id)
			const editTarget = store.todos.list[index]
			editTarget.title = title
			editTarget.detail = detail
			editTarget.limit = limit
			editTarget.taskTags = tags
			editTarget.severity = severity
			store.todos.edit(editTarget, id)
			store.tags.addTags(tags)
			this.$toast.open({
				message: `${title} is edited. ID: ${id}`,
				queue: false,
				type: 'is-success'
			})
		}
	},
	template: '\
	<form>\
		<div class="modal-card" >\
			<header class="modal-card-head">\
				<p class="modal-card-title">Todo Editing</p>\
			</header>\
			<section class="modal-card-body">\
				<b-field label="Title">\
					<b-input v-model="taskTitle" required></b-input>\
				</b-field>\
				<b-field label="Detail">\
					<b-input type="textarea" v-model="taskDetail" required></b-input>\
				</b-field>\
				<b-field label="Deadline">\
					<b-datepicker\
						placeholder="Click to select..."\
						icon="calendar-today"\
						v-model="taskLimit"\
						required>\
					</b-datepicker>\
				</b-field>\
				<b-field label="Tags">\
					<b-taginput\
						v-model="taskTagList"\
						type="is-dark"\
						:data="filteredTags"\
						:allow-new="true"\
						autocomplete\
						icon="label"\
						placeholder="Add a tag"\
						@typing="getFilteredTags"\
						>\
					</b-taginput>\
				</b-field>\
				<b-field label="Severity">\
					<b-select plceholder="Select a severity" v-model="taskSeverity" required>\
						<option value="High">High</option>\
						<option value="Medium">Medium</option>\
						<option value="Low">Low</option>\
					</b-select>\
				</b-field>\
			</section>\
			<footer class="modal-card-foot">\
				<button class="button" type="button" @click="$parent.close()">cancel</button>\
				<button v-if="isNew" class="button" type="button" @click="pushTodo(taskTitle, taskDetail, taskLimit, taskTagList, taskSeverity)">push</button>\
				<button v-else class="button" type="button" @click="editTodo(taskTitle, taskDetail, taskLimit, taskTagList, taskSeverity, id)">Edit</button>\
			</footer>\
		</div>\
	</form>\
	'
})
