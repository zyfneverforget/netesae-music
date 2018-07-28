{
	let view = {
		el: $('.editSong'),
		template:`
		<form class="editForm">
			<div class="row">
				<label for="">
					歌名
				</label>
				<input name='name' type="text" value="__name__">
			</div>
			<div class="row">
				<label >
					歌手
				</label>
				<input name='singer' type="text" value="__singer__">
			</div>
			<div class="row">
				<label >
					链接
				</label>
				<input name='url' type="text" value="__url__">
			</div>
			<div class="row">
				<label >
					封面
				</label>
				<input name='cover' type="text" value="__cover__">
			</div>
			<div class="row">
				<label for="">
					歌词
				</label>
				<input name='lyrics' type="text" value="__lyrics__">
			</div>
				<div class="row">
					<button type="submit">保存</button>
				</div>
		</form>`,
		init(){
			this.$el = this.el
		},
		render(data={}){
			let need = ['name','singer','url','cover','lyrics']
			let html = this.template
			need.map((string)=>{
				html = html.replace(`__${string}__`, data[string] || '')
			})
			this.$el.html(html)
		}
	}
	let model={
		data:{
			name:'',url:'',id:'',lyrics:'',singer:'',cover:''
		},
		create(data){
			let Song = AV.Object.extend('Song')
			let song = new Song()
			song.set('name',data.name)
			song.set('url',data.url)
			song.set('lyrics',data.lyrics)
			song.set('singer',data.singer)
			song.set('cover',data.cover)
			return song.save().then((song)=> {
				let{id,attributes} = song
				Object.assign(this.data,{id,...attributes}
				)
				alert('成功')
			})
		},
		updata(data){
			let song = AV.Object.createWithoutData('Song', this.data.id);
  		song.set('name',data.name)
			song.set('url',data.url)
			song.set('lyrics',data.lyrics)
			song.set('singer',data.singer)
			song.set('cover',data.cover)
  		return song.save().then((response)=>{
				Object.assign(this.data,data)
				return response
			});
		}
	}
	let controller ={
		init(view,model){
			this.view = view 
			this.model = model 
			this.view.init()
			this.view.render(this.model.data)
			this.bindEvents()
		},
		create(){
			let needs ='url name singer lyrics cover'.split(' ')
			let data={}
			needs.map((string)=>{
				data[string] = this.view.$el.find(`[name='${string}']`,).val()
			})
			this.model.create(data).then(()=>{
				this.view.render()
				let string = JSON.stringify(this.model.data)
				let object = JSON.parse(string)
				this.view.$el.removeClass('show')
				window.eventHub.emit('create',object)
			})
		},
		updata(){
			let needs ='url name singer lyrics cover'.split(' ')
			let data={}
			needs.map((string)=>{
				data[string] = this.view.$el.find(`[name='${string}']`,).val()
			})
			this.model.updata(data).then(()=>{
				this.view.render()
				this.view.$el.removeClass('show')
				let string = JSON.stringify(this.model.data)
				let object = JSON.parse(string)
				window.eventHub.emit('updata',object)
			})
		},
		bindEvents(){
			window.eventHub.on('uploaded',(data)=>{
				this.model.data = data
				this.view.$el.addClass('show')
				this.view.render(this.model.data)
			})
			window.eventHub.on('liclick',(data)=>{
				this.view.$el.addClass('show')
				console.log(data)
				this.model.data = data
				this.view.render(data)
			})
			this.view.$el.on('submit','form',(event)=>{
				event.preventDefault()
				if(this.model.data.id){
					console.log('ID')
					this.updata()
				}else{
					this.create()
				}
			})
		}
	}
	controller.init(view,model)
}