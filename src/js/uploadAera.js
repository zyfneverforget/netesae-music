{
	let view = {
		el: $('.uploadAera'),
		template:`
			<div id="container">
				<div style="text-align:center">
					<i class="plus" id="button"></i>
					<p style="color: #999">可拖拽上传</p>
				</div>
			</div>`,
		init(){
			this.$el = this.el
		},
		render(data){
			this.$el.html(this.template)
		}
	}
	let model = {
		data:{}
	}
	let controller= {
		init(view,model){
			this.view = view 
			this.model = model 
			this.view.init()
			this.view.render(this.model.data)
			this.bindEvents()
		},
		bindEvents(){
			window.eventHub.on('uploaded',()=>{
				this.view.$el.addClass('collapse')
			})
			window.eventHub.on('create',(data)=>{
				this.view.$el.removeClass('collapse')
			})
			window.eventHub.on('updata',(data)=>{
				this.view.$el.removeClass('collapse')
			})
			window.eventHub.on('liclick',()=>{
				this.view.$el.addClass('collapse')
			})
		}
	}
	controller.init(view,model)
}