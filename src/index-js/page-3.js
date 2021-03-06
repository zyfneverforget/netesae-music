{
	let view = {
		el: '.page-3',
		init(){
			this.$el = $(this.el)
		}
	}
	let model={}
	let controller = {
		init(view,model){
			this.view =view 
			this.model= model
			this.view.init()
			this.bindEventHub()
		},
		bindEventHub(){
			window.eventHub.on('selectTab',(tabName)=>{
				if(tabName === 'page-3'){
					this.view.$el.addClass('active')
				}else{
					this.view.$el.removeClass('active')
				}
			})
		}
	}
	controller.init(view,model)
}