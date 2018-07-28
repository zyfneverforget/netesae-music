{
	let view = {
		el: '.page',
		init(){
			this.$el = $(this.el)
		},
		render(data){
			let {song}=data
			this.$el.find('.bg').css('background-img',`${song.cover}`)
			this.$el.find('audio').attr('src',song.url)
			this.$el.find('.song-description > h1').text(song.name)
			let array = song.lyrics.split('\n')
			console.log(array)
			array.map((string)=>{
				let regex = /\[([\d:.]+)\](.+)/
				let x = string.match(regex)
				let parts = x[1].split(':')
				let minutes = parts[0]
				let seconds = parts[1]
				let newTime = parseInt(minutes,10)*60 + parseFloat(seconds,10)
				let p = document.createElement('p')
				p.textContent=x[2]
				p.setAttribute('data-time',newTime)
				this.$el.find('.lines').append(p)
				
			})
		},
		play(){
			 let audio = this.$el.find('audio')[0]
			 audio.play()
			 audio.ontimeupdate = ()=>{
				 this.showLyrics(audio.currentTime)
			 }
			 this.$el.find('.disc-container').addClass('playing')
		},
		pause(){
			let pause = this.$el.find('audio')[0]
			pause.pause()
			this.$el.find('.disc-container').removeClass('playing')
		},
		showLyrics(time){
			let allP = this.$el.find('.lyric>.lines>p')
			for(let i=0 ;i<allP.length;i++){
				let previous = allP.eq(i).attr('data-time')
				let next = allP.eq(i+1).attr('data-time')
				if(previous<=time&& time<next){
					let pHeight = allP[i].getBoundingClientRect().top
					let dHeight = this.$el.find('.lyric>.lines')[0].getBoundingClientRect().top
					console.log('pHeight')
					console.log(pHeight)
					console.log('--')
					console.log(dHeight)
					this.$el.find('.lyric>.lines').css({transform:`translateY(${-(pHeight-dHeight)+25}px)`})
					$(allP[i]).addClass('active').siblings('.active').removeClass('active')
				}
			} 
		}
	}
	let model = {
		data:{
		 song:{
			url: '',
			id: '',
			singer: '',
			name:'',
			cover:'',
			lyrics:''
		 },
		status: 'pause'	
		},
		get(id){
			console.log(id)
			let query = new AV.Query('Song');
			return query.get(id).then((song)=> {
				this.data.song.id = song.id
				this.data.song.url = song.attributes.url
				this.data.song.name = song.attributes.name
				this.data.song.singer = song.attributes.singer
				this.data.song.cover = song.attributes.cover
				this.data.song.lyrics = song.attributes.lyrics
				//Object.assign(this.data.song,{id:song.id,...song.attributes})
				return song
			});
		}
	}
	let controller = {
		init(view,model){
			this.view = view 
			this.model = model
			this.view.init()
			let id = this.getId()
			this.model.get(id)
				.then(()=>{
					console.log(this.model.data)
					this.view.render(this.model.data)
					this.view.$el.find('audio')[0].onended = ()=>{
						window.eventHub.emit('onended')
					}
				})
			this.bindEvents()
			window.eventHub.on('onended',()=>{
				this.view.pause()
			})
		},
		bindEvents(){
			this.view.$el.on('click','.icon-play',(event)=>{
				this.view.play()
			})
			this.view.$el.on('click','.icon-pause',(event)=>{
				this.view.pause()
			})

		},
		getId(){
			let search = window.location.search
			if(search.indexOf('?')===0){
				search = search.substring(1)
			}
			let array = search.split('&').filter((v=>v))
			let id = ''
			for(let i=0;i<array.length;i++){
				let kv = array[i].split('=')
				let key = kv[0]
				let value = kv[1]
				if(key === 'id'){
					id = value
				}
			}
			return id
		}
	}
	controller.init(view,model)
}