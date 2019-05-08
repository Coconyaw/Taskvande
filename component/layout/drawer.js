const drawer = Vue.component('drawer', {
	template: '\
	<aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">\
		<p class="menu-label is-hidden-touch">menu</p>\
		<ul class="menu-list">\
			<li>\
			<a href="#"  @click="setMainComponent(\'dashboard\')">\
			<span class="icon"><i class="fa fa-home"></i></span>Dashboard\
			</a>\
			</li>\
			<li>\
				<a href="#"  @click="setMainComponent(\'list-table\')">\
					<span class="icon"><i class="fa fa-list"></i></span>List\
				</a>\
			</li>\
			<li>\
				<a href="#"  @click="setMainComponent(\'calendar\')" class="">\
					<span class="icon"><i class="fa fa-calendar"></i></span>Calendar\
				</a>\
			</li>\
			<li>\
				<a href="#" class="">\
					<span class="icon"><i class="fa fa-info"></i></span>About\
				</a>\
			</li>\
		</ul>\
	</aside>\
	',
	methods: {
		setMainComponent(name) {
			this.$emit('set-main-component', name)
		}
	}
})
