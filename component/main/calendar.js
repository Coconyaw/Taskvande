const now = moment(new Date().setDate(1))

const getEmptyDate = () => {
	return { date: null, class: 'is-hidden-mobile disable' }
}

const keyFormat = 'YYYY-MM-DD'

const getDates = (start) => {
	const days = Array.apply(null, { length: start.daysInMonth() })
			.map(Number.call, Number)
			.map(function (i) {
				const d = start.clone().add(i, 'days')
				return { date: d.format('DD ddd'), key: d.format(keyFormat) }
			})

	const dates = new Array(start.day()).fill(getEmptyDate()).concat(days)
	const length = dates.length
	dates.length = 36
	dates.fill(getEmptyDate(), length)

	return dates
}

getEvents = (todos) => {
	const events = {}
	_.map(todos, todo => {
		key = moment(todo.limit).format(keyFormat)
		if (_.has(events, key)) {
			events[key].push({ title: todo.title, viewtitle: todo.title.slice(0, 5) })
		}
		else {
			events[key] = [{ title: todo.title, viewtitle: todo.title.slice(0, 5) }]
		}
	})

	return events
}

const calendar = Vue.component('calendar', {
	template: '\
    <div class="container">\
        <div class="columns is-hidden-mobile">\
            <div class="column has-text-left"><a v-on:click="previous()"><i class="fa button is-primary fa-chevron-left"></i></a></div>\
            <div class="column has-text-centered"><h2 class="title is-2">{{currentMonth.format("MMMM YYYY")}}</h2></div>\
            <div class="column has-text-right"><a v-on:click="next()"><i class="fa button is-primary fa-chevron-right"></i></a></div>\
        </div>\
\
        <div class="rows is-hidden-tablet">\
            <div class="row has-text-centered"><a v-on:click="previous()"><i class="button is-primary is-fullwidth fa fa-chevron-up"></i></a></div>\
            <hr/>\
            <div class="row has-text-centered"><h2 class="title is-2">{{currentMonth.format("MMMM YYYY")}}</h2></div>\
            <hr/>\
            <div class="row has-text-centered"><a v-on:click="next()"><i class="button is-primary is-fullwidth fa fa-chevron-down"></i></a></div>\
        </div>\
\
        <div class="tile is-ancestor">\
            <div v-for="weekday in weekdays" class="tile card is-vertical is-hidden-mobile">\
                <header class="card-header">\
                    <p class="card-header-title">\
                        {{weekday}}\
                    </p>\
                </header>\
            </div>\
        </div>\
\
        <calendar-date :dates="dates" :events="events" :offset="0"></calendar-date>\
        <calendar-date :dates="dates" :events="events" :offset="7"></calendar-date>\
        <calendar-date :dates="dates" :events="events" :offset="14"></calendar-date>\
        <calendar-date :dates="dates" :events="events" :offset="21"></calendar-date>\
        <calendar-date :dates="dates" :events="events" :offset="28"></calendar-date>\
    </div>\
	',
	data () {
		return {
			todos: store.todos.list,
			showDates: true,
			currentMonth: now,
			dates: getDates(now),
			events: getEvents(todos),
			weekdays: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]
		}
	},
	methods: {
		previous: function (offset) {
			this.currentMonth.subtract(1, "months")
			this.dates = getDates(this.currentMonth)
		},
		next: function (offset) {
			this.currentMonth.add(1, "months")
			this.dates = getDates(this.currentMonth)
		}
	}
})

const calendarDate = Vue.component('calendar-date', {
	template: '\
    <div class="tile is-ancestor">\
        <div v-for="n in 7" class="tile card is-vertical is-parent" v-bind:class="dates[n + offset].class">\
            <header>\
                <p class="has-text-left">{{dates[n + offset].date}}</p>\
            </header>\
\
            <div class="card-content">\
                <div class="has-text-left" v-if="events[dates[n + offset].key]">\
					<b-tooltip :label="getEventTitles(n)" type="is-dark" multilined>\
						<b-icon icon="calendar-text"></b-icon>\
					</b-tooltip>\
                </div>\
            </div>\
        </div>\
    </div>\
	',
	props: ['dates', 'events', 'offset'],
	methods: {
		getEventTitles: function(n) {
			let str = ""
			dayEvents = this.events[this.dates[n + this.offset].key]
			_.map(dayEvents, e => {
				str += e.title + '*'.repeat(35)
			})
			return str
		}
	}
})
