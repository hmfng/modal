
(function( root, factory, plugin ) {
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = root.document ?
			factory( root, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "modal requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( root );
	}
})(window, function( root ) {
	var document = root.document
	

	function O( config ) {
		this.container = null
		this.default = {
			title: '标题',
			unit: '单位'
		}
		this.extend( this.default, config )
		this.appendStyle()
		this.init()
	}

	O.prototype.init = function() {
		this.container = document.createElement('div')
		this.container.className = 'modal'
		document.body.append(this.container)

		var mask = document.createElement('div')
		mask.className = 'modal-mask'
		mask.onclick = this.close.bind( this )
		this.container.append(mask)
		
		var main = document.createElement('div')
		main.className = 'modal-main'
		this.container.append(main)
		
		var header = document.createElement('div')
		header.className = 'main-header'
		main.append(header)
		//关闭
		var close = document.createElement('div')
		close.className = 'modal-close'
		close.innerHTML = '取消'
		close.onclick = this.close.bind( this )
		header.append(close)
		//标题
		var title = document.createElement('h1')
		title.className = 'header-title'
		title.innerHTML = this.default.title
		header.append(title)
		//确定
		var sure = document.createElement('div')
		sure.className = 'modal-sure'
		sure.style.color = this.default.rightColor
		sure.innerHTML = '确定'
		sure.onclick = this.sure.bind( this )
		header.append(sure)

		var content_wrapper = document.createElement('div')
		content_wrapper.className = 'content-wrapper'
		main.append(content_wrapper)

		var content = document.createElement('div')
		content.className = 'main-content'
		content.innerHTML = '<div>'+
						'<input type="text" placeholder="请输入物品信息" id="val"/>'+
						'<span>'+this.default.unit+'</span>'+
					'</div>'
		content_wrapper.append(content)

		//初始化位置
		this.container.style.top = this.getWinHeight() + 'px'
		main.style.top = this.getWinHeight() + 'px'

		//点击后位置
		this.container.style.top = 0
		main.style.top = this.getWinHeight() - main.offsetHeight + 'px'
		
	};
	O.prototype.close = function() {
		this.style.remove()
		this.container.remove()
	};
	O.prototype.sure = function() {
		var val = document.querySelector('#val').value
		if (typeof this.default.callback === 'function') {
			this.default.callback(val)
		}
		this.close();
	};
	O.prototype.extend = function( o1, o2 ) {
		for ( var key in o2 ) {
			o1[key] = o2[key]
		}
	}
	O.prototype.getWinWidth = function() {
		return root.screen.availWidth
	}
	O.prototype.getWinHeight = function() {
		return root.screen.availHeight
	}
	O.prototype.appendStyle = function() {
		var str = '.modal {position: absolute;width: 100%;height: 100%;z-index: 9;}.modal-mask {position: fixed;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.2);}.modal-main {position: absolute;width: 100%;max-height: 40%;background-color: #fff;font-size: 14px;-webkit-transition: top 0.2s linear;-o-transition: top 0.2s linear;transition: top 0.2s linear;}.main-header {display: -webkit-flex;display: -moz-flex;display: -ms-flex;display: -o-flex;display: flex;justify-content: space-between;padding: 0 15px;height: 45px;line-height: 45px;border-top: 1px solid #e4dce4;border-bottom: 1px solid #e4dce4;}.main-header h1 {font-size: 16px;font-weight: normal;}.content-wrapper {padding: 15px;}.main-content {position: relative;padding: 10px;border: 1px solid #e4dce4;border-radius: 5px;font-size: 15px;}.main-content input {width: 90%;border: none;outline: none;}.main-content span {position: absolute;top: 10px;right: 10px;}'
		this.style = document.createElement('style')
		this.style.innerHTML = str
		document.head.appendChild(this.style)
	}
	root.Modal = O
	return O
}, 'Modal')
