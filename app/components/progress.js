import React from "react";
import "./progress.less";
// 声明组件, 注意：jsx里 必须添加 结束符/，比如 <img /> 
let Progress = React.createClass({
	getDefaultProps() {
		return {
			// 进度条默认颜色
			barColor: '#2f9842'
		}
	},
	changeProgress(e) {
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		console.log(progress);
		// 父级的回调函数
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},
	render() {
		return (
			<div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style = {{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
			</div>
		);
	}
}); 
export default Progress;