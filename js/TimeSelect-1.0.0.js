!function(root){
	function TimeModal( config ) {
		this.container = null
		this.default = {
			title: '标题'
		}

		this.extend( this.default, config )
		this.appendStyle()
		this.init()
	}
	TimeModal.prototype = {
		appendStyle: function() {
			this.style = this.getElem('style', 'style')
			var str = '.fr{float: right;}.tab-right{line-height: 3rem;width: 70%;height: 12.5rem;text-align: center;background-color: #fff;overflow: auto;}.tab-right li{border-bottom: 1px solid #e4dce4;}.tab-right li.current{color: #278bf8;}.tab-left{line-height: 3rem;width: 30%;text-align: center;}.tab-left li{border-bottom: 1px solid #f2f6f8;}.tab-left li.current{background-color: #fff;border-color: #e4dce4;}.modal-mask{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.2);}.modal-main{position:absolute;bottom:0;width:100%;height:40%;font-size:1rem;background:#fff;padding-bottom:1rem;-webkit-transition: top 0.2s linear;-o-transition: top 0.2s linear;transition: top 0.2s linear;}.main-header{position: relative;height:3rem;line-height: 3rem;border-bottom:1px solid #eaeaea;}.main-header span:nth-of-type(1){position:absolute;left:2%;}.main-header span:nth-of-type(2) {position: absolute;left: 20%;right: 20%;font-size: 1.2rem;text-align: center;}.main-header span:nth-of-type(3){position:absolute;right:2%;color:#278cf8;}.main-body{overflow: auto;}.modal{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}.btn{width: 200px;height: 100px;line-height: 100px;}'
			this.style.innerHTML = str
			document.head.appendChild(this.style)
		},
		init: function() {
			var winHeight = window.screen.height
			var document = root.document

			this.container = this.getElem('div', 'modal')
			document.body.appendChild(this.container)

			var mask = this.getElem('div', 'modal-mask')
			mask.onclick = this.close.bind(this)
			this.container.appendChild(mask)

			var main = this.getElem('div', 'modal-main')
			main.style.backgroundColor = '#f2f6f8'
			this.container.appendChild(main)

			var header = this.getElem('div', 'main-header')
			main.appendChild(header)

			var close = this.getElem('span', 'close')
			close.innerHTML = '取消'
			close.onclick = this.close.bind(this)
			header.appendChild(close)
			var title = this.getElem('span', 'title')
			title.innerHTML = this.default.title
			header.appendChild(title)
			var sure = this.getElem('span', 'sure')
			sure.innerHTML = '确定'
			sure.onclick = this.sure.bind( this )
			header.appendChild(sure)

			var body = this.getElem('div', 'main-body')
			main.appendChild(body)

			this.right = this.getElem('ul', 'tab-right fr')
			body.appendChild(this.right)

			this.left = this.getElem('ul', 'tab-left')
			this.renderLeft( this.left )
			body.appendChild( this.left )

			main.style.top = winHeight + 'px'

			main.style.top = winHeight - main.offsetHeight + 'px'

		},
		renderLeft: function( leftUl ) {
			var self = this
			var d = new Date();
			var nowDate = d.getDate();
			
			//移除上次的标签
			this.empty( this.left )

			var str = ''
			for (var j = nowDate; j < nowDate+3; j++) { //设置左边的月日信息
				var jD = new Date();
				jD.setDate(j);
				var jYear = jD.getFullYear();
				var jMonth = jD.getMonth();
				var jDate = jD.getDate();
				var jDay = jD.getDay();
				
				if (j == nowDate) {
					str += '<li class="first_day current" data-time='+jYear+'-'+(jMonth+1)+'-'+jDate+'>今天</li>'
				}
				if (j == nowDate + 1) {
					str += '<li class="other_day" data-time='+jYear+'-'+(jMonth+1)+'-'+jDate+'>明天</li>'
				}
				if (j == nowDate + 2) {
					str += '<li class="other_day" data-time='+jYear+'-'+(jMonth+1)+'-'+jDate+'>后天</li>'
				}
			}
			leftUl.innerHTML = str

			var leftLis = leftUl.querySelectorAll('li')
			for (var i = 0; i < leftLis.length; i++) {
				if (0 === i) {
					leftLis[i].onclick = function() {
						leftUl.querySelector('li.current').classList.remove('current')
						this.classList.add('current')
						self.today()
					}
					
				} else {
					leftLis[i].onclick = function() {
						leftUl.querySelector('li.current').classList.remove('current')
						this.classList.add('current')
						self.otherDay()
					}
					
				}
			}
			self.today()
		},
		today: function() {
			var d = new Date();
			var hour=d.getHours();
			var min=d.getMinutes();

			//移除上一次的标签
			this.empty( this.right )
			
			//设置标签
			var str = '<li class="time current">'+(hour<10?"0"+hour:hour)+":"+(min<10?"0"+min:min)+'</li>'
			this.right.innerHTML = str

			var count=0;
			if(min>=30){
			   	count=(23-hour)*2-1;
			}else{
			   	count=(23-hour)*2;
			} 
			for(var i=0;i<=count;i++){
				if(min+30>=60){
			    	min=min+30-60;
			    	hour=hour+1;
			   	}else{
			    	min=min+30;
			   }
			   str += '<li class="time">'+(hour<10?"0"+hour:hour)+":"+(min<10?"0"+min:min)+'</li>'
			}
			this.right.innerHTML = str
			//时间修正
			if(hour==23) {
				str += '<li>'+24+":"+"00"+'</li>'
				this.right.innerHTML = str
			}
			this.timeBindClick();
		},
		otherDay: function() {
			this.empty( this.right )
			var str = '<li class="time current">01:00</li><li class="time">02:00</li><li class="time">03:00</li><li class="time">04:00</li><li class="time">05:00</li>'+
								'<li class="time">06:00</li><li class="time">07:00</li><li class="time">08:00</li><li class="time">09:00</li><li class="time">10:00</li><li class="time">11:00</li>'+
								'<li class="time">12:00</li><li class="time">13:00</li><li class="time">14:00</li><li class="time">15:00</li><li class="time">16:00</li><li class="time">17:00</li>'+
								'<li class="time">18:00</li><li class="time">19:00</li><li class="time">20:00</li><li class="time">21:00</li><li class="time">22:00</li><li class="time">23:00</li>'
			this.right.innerHTML = str
			this.timeBindClick()
		},
		timeBindClick: function() {
			var self = this
			for (var i = 0; i < this.right.childNodes.length; i++) {
				self.right.childNodes[i].onclick = function() {
					if (self.right.querySelector('li.current').classList.contains('current')) {
						self.right.querySelector('li.current').classList.remove('current')
					}
					this.classList.add('current')
				}
			}
		},
		empty: function( dom ) {
			for (var i = 0; i < dom.childNodes.length; i++) {
				dom.childNodes[i].remove()
			}
		},
		extend: function( o1, o2 ) {
			for( var key in o2 ) {
				o1[key] = o2[key]
			}
		},
		getElem: function( el, className ) {
			var o = document.createElement(el)
			o.className = className
			return o
		},
		close: function() {
			this.style.remove()
			this.container.remove()
		},
		sure: function() {
			var ymd = this.left.querySelector('li.current').getAttribute('data-time')
			var arr1 = ymd.split('-')
			var hm = this.right.querySelector('li.current').innerHTML
			var arr2 = hm.split(':')
			arr1.push(arr2[0],arr2[1])
			if ( typeof this.default.callback === 'function') {
				this.default.callback(arr1)
			}
			this.close();
		}
	}

	root.TimeModal = TimeModal
}(window)