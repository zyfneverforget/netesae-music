{
	let view = {
		el:'.songList',
		init(){
			this.$el = $(this.el)
		},
		template:`
		<li class="song">
			<div class="number">{{number}}</div>
			<div class="nameWrapper">
				<div class="name">{{song.name}}</div>
				<div class="singer">{{song.singer}}</div>
			</div>
			<a class="playButton" href="./song.html?id={{song.id}}">
				<svg class="icon icon-play">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
				</svg>
			</a>
		</li>
		`,
		render(data){
			let songs = data.songs
			songs.map((song,key)=>{
				let $li = $(this.template
				.replace('{{number}}',key+1)
				.replace('{{song.name}}',song.name)
				.replace('{{song.singer}}',song.singer)
				.replace('{{song.id}}',song.id)
				)
				this.$el.find('ol.list').append($li)
			})
			console.loh(this.template)
		}
	}
	let model = {
		data:{
			songs:[]
		},
		find(){
			let query = new AV.Query('Song');
			return query.find().then( (songs)=>{
				this.data.songs = songs.map((song)=>{
					//return {id: song.id, ...song.attributes}
					return Object.assign({id:song.id}, song.attributes)
				})
				return songs
			})
		}
	}
	let controller = {
		init(view,model){
			this.view = view 
			this.view.init()
			this.model = model
			this.model.find()
				.then((songs)=>{
					this.view.render(this.model.data)
					console.log('成功获取歌曲')
				})
		}
	}
	controller.init(view,model)
}