{
	let view = {
		el: '#tabs',
		init(){
			this.$el = $(this.el)
		}
	}
	let model = {}
	let controller = {
		init(view,model){
			this.view = view 
			this.model = model
			this.view.init()
			this.bindEvent()
		},
		bindEvent(){
			this.view.$el.on('click','.tabs-nav>li',(event)=>{
				$(event.currentTarget).addClass('active').siblings().removeClass('active')
				let tabName = $(event.currentTarget).attr('data-name')
				window.eventHub.emit('selectTab',tabName)
			})
		}
	}
	controller.init(view,model)
}