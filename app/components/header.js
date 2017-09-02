import React from "react";
import "./header.less";
// 声明组件, 注意：jsx里 必须添加 结束符/，比如 <img /> 
let Header = React.createClass({
	render() {
		return (
			<div className="components-header row">
				<img src="/static/images/logo.png" width="40" className="-col-auto" />
				<h1 className="caption">React Music Player</h1>
			</div>
		);
	}
}); 
export default Header;