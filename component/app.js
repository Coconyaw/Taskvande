const app = new Vue({
	el: '#app',
	data: {
		currentMainComponent: store.currentMainComponent.name,
		updated: ''
	},
	methods: {
		setMainComponent(name) {
			this.currentMainComponent = name
			store.currentMainComponent.setCurrentMainComponent(name)
		}
	}
});
