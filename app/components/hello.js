import React from "react";
import "./hello.less";

// 声明组件
let Hello = React.createClass({
	render() {
		return (
			<div className = "hello-component">
				Hello World, React, Ok..
			</div>
		);
	}
}); 

export default Hello;