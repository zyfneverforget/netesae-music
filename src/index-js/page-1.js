{
	let view = {
		el: '.page-1',
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
			this.loadModel()
			this.bindEventHub()
		},
		bindEventHub(){
			window.eventHub.on('selectTab',(tabName)=>{
				if(tabName === 'page-1'){
					this.view.$el.addClass('active')
				}else{
					this.view.$el.removeClass('active')
				}
			})
		},
		loadModel(){
			let script1 = document.createElement('script')
			script1.src = '../src/index-js/page-1-1.js'
			document.body.appendChild(script1)
			let script2 = document.createElement('script')
			script2.src = '../src/index-js/page-1-2.js'
			document.body.appendChild(script2)
		},
	}
	controller.init(view,model)
}