const weatherIcons = {
	'200': { icon: 'weather-lightning-rainy', type: 'is-warning' },
	'201': { icon: 'weather-lightning-rainy', type: 'is-warning' },
	'202': { icon: 'weather-lightning-rainy', type: 'is-warning' },
	'210': { icon: 'weather-lightning', type: 'is-warning' },
	'211': { icon: 'weather-lightning', type: 'is-warning' },
	'211': { icon: 'weather-lightning', type: 'is-warning' },
	'221': { icon: 'weather-lightning', type: 'is-warning' },
	'231': { icon: 'weather-lightning', type: 'is-warning' },
	'232': { icon: 'weather-lightning', type: 'is-warning' },
	'300': { icon: 'weather-rainy', type: 'is-info' },
	'301': { icon: 'weather-rainy', type: 'is-info' },
	'302': { icon: 'weather-rainy', type: 'is-info' },
	'310': { icon: 'weather-rainy', type: 'is-info' },
	'311': { icon: 'weather-rainy', type: 'is-info' },
	'312': { icon: 'weather-rainy', type: 'is-info' },
	'313': { icon: 'weather-rainy', type: 'is-info' },
	'314': { icon: 'weather-rainy', type: 'is-info' },
	'321': { icon: 'weather-rainy', type: 'is-info' },
	'500': { icon: 'weather-pouring', type: 'is-info' },
	'501': { icon: 'weather-pouring', type: 'is-info' },
	'502': { icon: 'weather-pouring', type: 'is-info' },
	'503': { icon: 'weather-pouring', type: 'is-info' },
	'504': { icon: 'weather-pouring', type: 'is-info' },
	'511': { icon: 'weather-snowy-rainy', type: 'is-info' },
	'520': { icon: 'weather-rainy', type: 'is-info' },
	'521': { icon: 'weather-rainy', type: 'is-info' },
	'522': { icon: 'weather-rainy', type: 'is-info' },
	'531': { icon: 'weather-rainy', type: 'is-info' },
	'600': { icon: 'weather-snowy', type: 'is-info' },
	'601': { icon: 'weather-snowy', type: 'is-info' },
	'602': { icon: 'weather-snowy', type: 'is-info' },
	'611': { icon: 'weather-snowy', type: 'is-info' },
	'612': { icon: 'weather-snowy', type: 'is-info' },
	'613': { icon: 'weather-snowy', type: 'is-info' },
	'615': { icon: 'weather-snowy-rainy', type: 'is-info' },
	'616': { icon: 'weather-snowy-rainy', type: 'is-info' },
	'620': { icon: 'weather-snowy', type: 'is-info' },
	'621': { icon: 'weather-snowy', type: 'is-info' },
	'622': { icon: 'weather-snowy', type: 'is-info' },
	'701': { icon: 'weather-fog', type: 'is-dark' },
	'711': { icon: 'weather-fog', type: 'is-dark' },
	'721': { icon: 'weather-fog', type: 'is-dark' },
	'731': { icon: 'weather-fog', type: 'is-dark' },
	'741': { icon: 'weather-fog', type: 'is-dark' },
	'751': { icon: 'weather-fog', type: 'is-dark' },
	'761': { icon: 'weather-fog', type: 'is-dark' },
	'762': { icon: 'weather-fog', type: 'is-dark' },
	'771': { icon: 'weather-fog', type: 'is-dark' },
	'781': { icon: 'weather-fog', type: 'is-dark' },
	'800': { icon: 'weather-sunny', type: 'is-danger' },
	'801': { icon: 'weather-partlycloudy', type: 'is-danger' },
	'802': { icon: 'weather-cloudy', type: 'is-dark' },
	'803': { icon: 'weather-cloudy', type: 'is-dark' },
	'804': { icon: 'weather-cloudy', type: 'is-dark' }
}

// 明石町の天気
const apiURL = 'http://api.openweathermap.org/data/2.5/forecast?id=1865485&APPID=cfa1200aac7d42e96b20004ec9a571b5'

const kelvinToCelsius = (kelvin) => {
	return (Math.round((kelvin - 273.15) * 10) / 10)
}

const dashBoard = Vue.component('dashboard', {
	template: '\
	<div class="wrapper">\
		<summery-panels></summery-panels>\
		<div class="columns is-multiline">\
			<div class="column is-12">\
				<div class="panel">\
					<p class="panel-heading has-background-grey-dark has-text-white">\
						Complete And Create Count\
					</p>\
					<div class="panel-block">\
						<div style="position: relative; width:80vw">\
							<comp-and-create-chart></comp-and-create-chart>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="column is-4">\
				<div class="panel">\
					<p class="panel-heading has-background-grey-dark has-text-white">\
						Top10 Tags In Last Month\
					</p>\
					<div class="panel-block">\
						<div style="position: relative; width:80vw">\
							<top10tag-chart></top10tag-chart>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="column is-8">\
				<div class="panel">\
					<p class="panel-heading has-background-grey-dark has-text-white">\
						Weather Forecast\
					</p>\
					<div class="panel-block">\
						<div style="position: relative; width:80vw">\
							<weather-forecast-chart></weather-forecast-chart>\
							<weather-forecast-level></weather-forecast-level>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="column is-6">\
				<div class="panel">\
					<p class="panel-heading has-background-grey-dark has-text-white">\
						High Severiy Todos\
					</p>\
					<div class="panel-block">\
						<div style="position: relative; width:80vw">\
							<listing-high-severity-todos></listing-high-severity-todos>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="column is-6">\
				<div class="panel">\
					<p class="panel-heading has-background-grey-dark has-text-white">\
						Approaching Limit Todos\
					</p>\
					<div class="panel-block">\
						<div style="position: relative; width:80vw">\
							<listing-approaching-limit-todos></listing-approaching-limit-todos>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	'
})

const weatherForecastLevel = Vue.component('weather-forecast-level', {
	template: '\
	<div v-if="loaded" class="level">\
		<div v-for="item in weatherData" class="level-item">\
			<div class="level-item">\
				<b-tooltip :label="item.date" position="is-bottom" type="is-dark">\
					<b-icon :icon="item.icon" :type="item.type" size="is-small"></b-icon>\
				</b-tooltip>\
			</div>\
		</div>\
	</div>\
	',
	data() {
		return {
			weatherData: [],
			loaded: false
		}
	},
	mounted () {
		this.getWeatherData()
	},
	methods: {
		async getWeatherData () {
			this.loaded = false
			const res = await axios.get(apiURL)
			const apiResult = res.data
			const weatherData = []

			_.map(apiResult.list, data => {
				date = moment.unix(data.dt).format('MM/DD(ddd) HH:mm')
				icon = weatherIcons[data.weather[0].id]
				weatherData.push({ date: date, icon: icon.icon, type: icon.type })
			})

			this.weatherData = weatherData
			this.loaded = true
		}
	}
})

const weatherChart = Vue.component('weather-chart', {
	extends: VueChartJs.Line,
	props: {
		chartdata: null,
		options: null
	},
	mounted () {
		this.renderChart(this.chartdata, this.options)
	}
})

const weatherForecastChart = Vue.component('weather-forecast-chart', {
	template: '\
	<weather-chart v-if="loaded" :chartdata="weatherChartData" :options="options"></weather-chart>\
	',
	data() {
		return {
			weatherChartData: null,
			options: { responsive: true, maintainAspectRatio: false },
			loaded: false
		}
	},
	async mounted () {
		this.loaded = false
		const res = await axios.get(apiURL)
		const weatherData = res.data
		const labels = []
		const temp = { label: 'Temperature', borderColor: 'rgba(255, 0, 55, 0.8)', backgroundColor: 'rgba(255, 0, 55, 0.3)', data: [] }
		const humidity = { label: 'Humidity', borderColor: 'rgba(75, 192, 192, 0.8)', backgroundColor: 'rgba(75, 192, 192, 0.7)', steppedLine: true,  data: [] }
		_.map(weatherData.list, data => {
			labels.push(moment.unix(data.dt).format('MM/DD HH'))
			temp.data.push(kelvinToCelsius(data.main.temp))
			humidity.data.push(data.main.humidity)
		})
		chartData = { labels: labels, datasets: [temp, humidity] }
		this.weatherChartData = chartData
		this.loaded = true
	}
})

const summeryPanels = Vue.component('summery-panels', {
	template: '\
		<div class="columns is-multiline">\
			<todo-total-panel></todo-total-panel>\
			<tag-total-panel></tag-total-panel>\
			<weekly-done-panel></weekly-done-panel>\
			<limit-total-panel></limit-total-panel>\
		</div>\
	'
})

const limitTotalPanel = Vue.component('limit-total-panel', {
	data() {
		return {
			todaysTodo: store.todos.list.filter(todo => { return !todo.done }).filter(todo => {
				const today = moment()
				const todoLimit = moment(todo.limit)
				return today.isSameOrAfter(todoLimit, 'days')
			})
		}
	},
	computed: {
		totalCount: function() {
			return this.todaysTodo.length
		},
		highCount: function() {
			return this.todaysTodo.filter(todo => { return todo.severity === 'High' }).length
		},
		mediumCount: function() {
			return this.todaysTodo.filter(todo => { return todo.severity === 'Medium' }).length
		},
		lowCount: function() {
			return this.todaysTodo.filter(todo => { return todo.severity === 'Low' }).length
		}
	},
	template: '\
	<div class="column">\
		<div class="box notification is-warning">\
			<div class="heading">Expired Limit Todos</div>\
			<div class="title">{{ totalCount }}</div>\
			<div class="level">\
				<div class="level-item">\
					<div class="">\
						<div class="heading">High</div>\
						<div class="title is-5">{{ highCount }}</div>\
					</div>\
				</div>\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Medium</div>\
						<div class="title is-5">{{ mediumCount }}</div>\
					</div>\
				</div>\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Low</div>\
						<div class="title is-5">{{ lowCount }}</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	',
})

const tagTotalPanel = Vue.component('tag-total-panel', {
	data() {
		return {
			tags: store.tags.list,
			todos: store.todos.list,
			mostFreqTagCount: 0
		}
	},
	computed: {
		totalCount: function() {
			return this.tags.length
		},
		mostFreqTag: function() {
			const incompTodos = this.todos.filter(todo => { return !todo.done })
			const tagCount = {}
			_.map(incompTodos, todo => {
				_.map(todo.taskTags, tag => {
					if (tag in tagCount) {
						tagCount[tag] += 1
					}
					else {
						tagCount[tag] = 1
					}
				})
			})
			const mostFreqTagCount = _.max(_.values(tagCount))
			const mostFreqTag = _.findKey(tagCount, count => { return count === mostFreqTagCount })
			this.mostFreqTagCount = mostFreqTagCount
			return mostFreqTag
		}
	},
	template: '\
	<div class="column">\
		<div class="box notification is-success">\
			<div class="heading">Tag Total</div>\
			<div class="title">{{ totalCount }}</div>\
			<div class="level">\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Most freqently in incomplete</div>\
						<div class="title is-5">{{ mostFreqTag }} : {{ mostFreqTagCount }}</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	',
})

const weeklyDonePanel = Vue.component('weekly-done-panel', {
	data() {
		return {
			todos: store.todos.getDoneList().filter(todo => { return moment().add(-7, 'days').isSameOrBefore(todo.executeDate, 'day') })
		}
	},
	computed: {
		totalCount: function() {
			return this.todos.length
		},
		highCount: function() {
			return this.todos.filter(todo => { return todo.severity === 'High' }).length
		},
		mediumCount: function() {
			return this.todos.filter(todo => { return todo.severity === 'Medium' }).length
		},
		lowCount: function() {
			return this.todos.filter(todo => { return todo.severity === 'Low' }).length
		}
	},
	template: '\
	<div class="column">\
		<div class="box notification is-info">\
			<div class="heading">Weekly Done Total</div>\
			<div class="title">{{ totalCount }}</div>\
			<div class="level">\
				<div class="level-item">\
					<div class="">\
						<div class="heading">High</div>\
						<div class="title is-5">{{ highCount }}</div>\
					</div>\
				</div>\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Medium</div>\
						<div class="title is-5">{{ mediumCount }}</div>\
					</div>\
				</div>\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Low</div>\
						<div class="title is-5">{{ lowCount }}</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	',
})

const todoTotalPanel = Vue.component('todo-total-panel', {
	data() {
		return {
			todos: store.todos.list,
			doneRatio: 0
		}
	},
	computed: {
		totalCount: function() {
			return this.todos.length
		},
		doneCount: function() {
			const done = this.todos.filter(todo => { return todo.done }).length
			this.doneRatio = Math.floor(done / this.todos.length * 100)
			return done
		},
		incompleteCount: function() {
			return this.todos.filter(todo => { return !todo.done }).length
		}
	},
	template: '\
	<div class="column">\
		<div class="box notification is-danger">\
			<div class="heading">Todo Total</div>\
			<div class="title">{{ totalCount }}</div>\
			<div class="level">\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Done</div>\
						<div class="title is-5">{{ doneCount }}</div>\
					</div>\
				</div>\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Incomplete</div>\
						<div class="title is-5">{{ incompleteCount }}</div>\
					</div>\
				</div>\
				<div class="level-item">\
					<div class="">\
						<div class="heading">Done %</div>\
						<div class="title is-5">{{ doneRatio }}</div>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
	',
})

const listingApproachingLimitTodos = Vue.component('listing-approaching-limit-todos', {
	computed: {
		highSeverityTodos: function() {
			const todos = store.todos.list
			const highSevTodos = todos.filter(todo => { return !todo.done }).filter(todo => {
				const twoDaysAfter = moment().add(2, 'days')
				return twoDaysAfter.isSameOrAfter(moment(todo.limit, 'day'))
			})
			return highSevTodos
		}
	},
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
		},
		formatedDate(date) {
			return dateFormat(date)
		},
		getRowClass(row) {
			const today = moment()
			isSameOrAfter = today.isSameOrAfter(moment(row.limit), 'day')
			isSeverityHigh = row.severity === 'High'
			if (isSameOrAfter && isSeverityHigh) {
				return 'has-background-danger has-text-white'
			}
			else if (isSameOrAfter) {
				return 'has-background-warning'
			}
			else if (isSeverityHigh) {
				return 'has-background-info'
			}
			return ''
		}
	},
	template: '\
	<div>\
		<b-table\
			:data="highSeverityTodos"\
			ref="table"\
			paginated\
			per-page="5"\
			:row-class="getRowClass"\
			:narrowed="true"\
		>\
			<template slot-scope="props">\
				<b-table-column field="title" label="Title" sortable>\
					{{ props.row.title }}\
				</b-table-column>\
				<b-table-column field="severity" label="Severity" sortable>\
					{{ props.row.severity }}\
				</b-table-column>\
				<b-table-column field="limit" label="Deadline" sortable>\
					{{ formatedDate(props.row.limit) }}\
				</b-table-column>\
				<b-table-column field="done" label="Done" sortable>\
					<button v-if="props.row.done" @click.prevent="toggleDone(props.row.id)" class="button is-success">\
						<b-icon icon="check"></b-icon>\
					</button>\
					<button v-else @click.prevent="toggleDone(props.row.id)" class="button">\
						<b-icon icon="check-outline"></b-icon>\
					</button>\
				</b-table-column>\
				<b-table-column label="Edit">\
					<button @click.prevent="editTodoModal(props.row, false)" class="button is-white">\
						<b-icon icon="pencil"></b-icon>\
					</button>\
				</b-table-column>\
			</template>\
		</b-table>\
	</div>\
	'
})

const listingHighSeverityTodos = Vue.component('listing-high-severity-todos', {
	computed: {
		highSeverityTodos: function() {
			const todos = store.todos.list.filter(todo => { return (!todo.done && todo.severity === 'High') })
			return todos
		}
	},
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
		},
		formatedDate(date) {
			return dateFormat(date)
		}
	},
	template: '\
	<div>\
		<b-table\
			:data="highSeverityTodos"\
			ref="table"\
			paginated\
			per-page="5"\
			:narrowed="true"\
		>\
			<template slot-scope="props">\
				<b-table-column field="title" label="Title" sortable>\
					{{ props.row.title }}\
				</b-table-column>\
				<b-table-column field="limit" label="Deadline" sortable>\
					{{ formatedDate(props.row.limit) }}\
				</b-table-column>\
				<b-table-column field="done" label="Done" sortable>\
					<button v-if="props.row.done" @click.prevent="toggleDone(props.row.id)" class="button is-success">\
						<b-icon icon="check"></b-icon>\
					</button>\
					<button v-else @click.prevent="toggleDone(props.row.id)" class="button">\
						<b-icon icon="check-outline"></b-icon>\
					</button>\
				</b-table-column>\
				<b-table-column label="Edit">\
					<button @click.prevent="editTodoModal(props.row, false)" class="button is-white">\
						<b-icon icon="pencil"></b-icon>\
					</button>\
				</b-table-column>\
			</template>\
		</b-table>\
	</div>\
	'
})

const top10TagChart = Vue.component('top10tag-chart', {
	extends: VueChartJs.Doughnut,
	data () {
		return {
			tags: store.tags.list,
			todos: store.todos.list
		}
	},
	mounted () {
		this.renderChart(this.getTodoCountPerTop10Tags(), { responsive: true, maintainAspectRatio: false })
	},
	methods: {
		getTodoCountPerTop10Tags() {
			const fourWeekBefore = moment().add(-26, 'days')
			recentMonthTodo = this.todos.filter(todo => {
				return fourWeekBefore.isSameOrBefore(moment(todo.createDate))
			})

			const todoCount = []
			_.map(this.tags, tag => {
				todoCount.push({ name: tag, value: 0 })
			})

			_.map(recentMonthTodo, todo => {
				_.map(todo.taskTags, tag => {
					const index = todoCount.findIndex(elm => {
						return elm.name === tag
					})
					todoCount[index].value += 1
				})
			})
			const top10tags = _.take(_.orderBy(todoCount, 'value', 'desc'), 10)
			const labels = []
			const data = []
			const colors = []

			_.map(top10tags, elm => {
				labels.push(elm.name)
				data.push(elm.value)
				const r = Math.floor(Math.random() * 200)
				const g = Math.floor(Math.random() * 200)
				const b = Math.floor(Math.random() * 200)
				colors.push('rgb(' + r + ', ' + g + ', ' + b + ')')
			})

			const chartData = { labels: labels, datasets: [{ data: data, backgroundColor: colors }] }
			return chartData
		}
	}
})

const compAndCreateChart = Vue.component('comp-and-create-chart', {
	extends: VueChartJs.Line,
	data () {
		return {
			todos: store.todos.list
		}
	},
	mounted () {
		this.renderChart({
			labels: this.getMonthDays(),
			datasets: [
			{
				label: 'Comlete Count',
				borderColor: 'rgba(255, 0, 55, 0.8)',
				data: this.getMonthlyDoneCount()
			},
			{
				label: 'Create Count',
				borderColor: 'rgba(75, 192, 192, 0.8)',
				data: this.getMonthlyCreateCount(),
				steppedLine: 'after'
			}
		  ]
		},
		{ responsive: true, maintainAspectRatio: false })
	},
	methods: {
		getMonthDays() {
			const monthBefore = moment()
			monthBefore.add(-27, 'days')
			const monthDays = []
			for (i = 0; i < 28; ++i) {
				monthDays.push(monthBefore.format('MM/DD'))
				monthBefore.add(1, 'days')
			}
			return monthDays
		},
		getMonthlyDoneCount() {
			return this._baseGetMonthlyCount('done')
		},
		getMonthlyCreateCount() {
			return this._baseGetMonthlyCount('create')
		},
		_baseGetMonthlyCount(countTarget) {
			const monthBefore = moment()
			monthBefore.add(-27, 'days')
			const monthDate = []
			const monthlyCount = []

			for (i = 0; i < 28; ++i) {
				monthDate.push(monthBefore.format('YYYY/MM/DD'))
				monthlyCount.push(0)
				monthBefore.add(1, 'days')
			}
			todos = store.todos.list
			_.map(todos, (todo) => {
				if (countTarget === 'done') {
					if (todo.done) {
						const key = moment(todo.executeDate).format('YYYY/MM/DD')
						const index = monthDate.indexOf(key)
						if (index !== -1) {
							monthlyCount[index] += 1
						}
					}
				}
				else {
					const key = moment(todo.createDate).format('YYYY/MM/DD')
					const index = monthDate.indexOf(key)
					if (index !== -1) {
						monthlyCount[index] += 1
					}
				}
			})

			return monthlyCount
		}
	}
})
