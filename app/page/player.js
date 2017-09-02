import React from "react";
import Progress from "../components/progress";
import './player.less';
import { Link } from 'react-router';
import Pubsub from "pubsub-js";

let duration = null;
let Player = React.createClass({
	// 数据的定义
	getInitialState () {
		return {
			progress : 0,
			volume: 0,
			isPlay: true,
			leftTime: ""
		}
	},
	componentDidMount () {
		this._isMounted = true
		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
			// 总时长
			duration = e.jPlayer.status.duration;
			/*
			 *异步请求返回数据之前，或者图片加载完成之前，组件可能就已经被卸载，
			 *等数据回来再使用setState就会报出警告
			 */

	 		if (this._isMounted) {
				this.setState({
					volume: e.jPlayer.options.volume * 100,
					// 当前百分比进度
					progress: Math.round(e.jPlayer.status.currentPercentAbsolute),
					// progress: Math.round(e.jPlayer.status.currentTime) 当前播放时间

					leftTime: this.formatTime(duration*(1 - e.jPlayer.status.currentPercentAbsolute/100))
				});
			}
		});
	},
	// 组件被卸载时
	componentWillUnmount() {
		this._isMounted = false;
		$("#player").unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandle(progress){
		$("#player").jPlayer("play", duration*progress);
	},
	//改变音量
	changeVolumeHandler (progress) {
		$("#player").jPlayer("volume", progress);
	},
	// 播放按钮
	play() {
		if (this.state.isPlay) {
			$("#player").jPlayer("pause");
		} else {
			$("#player").jPlayer("play");
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	},
	playPrev() {
		Pubsub.publish("PLAY_PREV");
	},
	playNext() {
		Pubsub.publish("PLAY_NEXT");
	},
	formatTime(time) {
		time = Math.floor(time);
		let miniutes = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		return `${miniutes}:${seconds}`;
	},
	render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor='#aaa'
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.progressChangeHandle}
			                >
			                </Progress> 
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.playPrev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.playNext}></i>
                			</div>
                			<div className="-col-auto">
                				<i></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusicItem.cover} title={this.props.currentMusicItem.title}/>
                	</div>
                </div>
            </div>
        );
    }
});

export default Player;