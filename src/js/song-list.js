{
	let view = {
		el: $('#song-list'),
		template: `	
		<h3>歌曲列表</h3>`,
		init(){
			this.$el = this.el
		},
		render(data){
			this.$el.html(this.template)
			let {songs} = data
			let liList= songs.map((song)=>{
				return $('<li></li>').text(song.name).attr('song-id',song.id)
			})
			liList.map((list)=>{
				this.$el.append(list)
			})
		}
	}
	let model= {
		data:{
			songs:[]
		},
		fetch(){
			let query = new AV.Query('Song')
  		return  query.find().then((songs)=>{
				this.data.songs = songs.map((song)=>{
					return {id:song.id, ...song.attributes}
				})
				return songs
			})
		}
	}
	let controller = {
		init(view,model){
			this.view = view 
			this.model = model
			this.view.init()
			this.view.render(this.model.data)
			this.bindEvents()
			this.model.fetch().then(()=>{
				this.view.render(this.model.data)
			})
		},
		bindEvents(){
			window.eventHub.on('updata',(song)=>{
				let songs = this.model.data.songs
				for(let i =0;i<songs.length;i++){
					if(songs[i].id ===song.id){
						Object.assign(songs[i],song)
					}
				}
				this.view.render(this.model.data)
			})
			window.eventHub.on('create',(data)=>{
					this.model.data.songs.push(data)
					this.view.render(this.model.data)
			})
			this.view.$el.on('click','li',(event)=>{
				$(event.currentTarget).addClass('active').siblings('.active').removeClass('active')
				let id = event.currentTarget.getAttribute('song-id')
				let data = {}
				for(let i=0;i<this.model.data.songs.length;i++){
					if(this.model.data.songs[i].id===id){
						data = this.model.data.songs[i]
						break
					}
				}
				let string = JSON.stringify(data)
				let object = JSON.parse(string)
				window.eventHub.emit('liclick',object)
			})
		}
	}
	controller.init(view,model)
}