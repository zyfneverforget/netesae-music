{
	let view = {
		el:'section.songs',
		init(){
			this.$el = $(this.el)
		},
		template:`
		<li>
			<h3>{{song.name}}</h3>
			<p>
				<svg class="icon icon-sq">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
				</svg>
				{{song.singer}}
			</p>
			<a class="playButton" href="./song.html?id={{song.id}}">
				<svg class="icon icon-play">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
				</svg>
			</a>
		</li>
		`,
		render(data){
			let songs = data.songs
			songs.map((song)=>{
				let $li = $(this.template
				.replace('{{song.name}}',song.name)
				.replace('{{song.singer}}',song.singer)
				.replace('{{song.id}}',song.id)
				)
				this.$el.find('ol.list').append($li)
			})
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