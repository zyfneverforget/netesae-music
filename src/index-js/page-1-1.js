{
	let view = {
		el:'section.playlists',
		init(){
			this.$el = $(this.el)
		}
	}
	let model = {}
	let controller = {
		init(view,model){
			this.view = view 
			this.view.init()
			this.model = model
			this.bindEvents()
		},
		bindEvents(){
			this.view.$el.on('click','li',(event)=>{
				window.location.href='./play-list.html'
			})
		}
	}
	controller.init(view,model)
}