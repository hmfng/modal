function Modal() {
	this.container = null
	this.default = {
		title: '标题',
		unit: '单位'
	}
}

Modal.prototype.init = function( config ) {
	extend( this.default, config )

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
	close.innerHTML = 'close'
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
	sure.innerHTML = 'sure'
	sure.onclick = this.sure.bind( this )
	header.append(sure)

	var content_wrapper = document.createElement('div')
	content_wrapper.className = 'content-wrapper'
	main.append(content_wrapper)

	var content = document.createElement('div')
	content.className = 'main-content'
	content.innerHTML = '<div>'+
					'<input type="text" placeholder="请输入物品价值" id="window_weight"/>'+
					'<span style="position: absolute; right: 10px;">'+this.default.unit+'</span>'+
				'</div>'
	content_wrapper.append(content)

	//初始化位置
	this.container.style.top = getWinHeight() + 'px'
	main.style.top = getWinHeight() + 'px'

	//点击后位置
	this.container.style.top = 0
	main.style.top = getWinHeight() - main.offsetHeight + 'px'
	
};
Modal.prototype.close = function() {
	this.container.remove()
};
Modal.prototype.sure = function() {
	this.close();
	if (typeof this.default.sureCallback === 'function') {
		this.default.sureCallback()
	}
};
function extend( o1, o2 ) {
	for ( var key in o2 ) {
		o1[key] = o2[key]
	}
}
function getWinWidth() {
	return window.innerWidth
}
function getWinHeight() {
	return window.innerHeight
}