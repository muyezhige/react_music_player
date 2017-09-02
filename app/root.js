import React from "react";
import Header from "./components/header";
import Player from "./page/player";
import MusicList from "./page/musiclist";
import { Router, IndexRoute, Link, Route, browserHistory, hashHistory} from 'react-router';
// 组件内没有default定义，就需要加 {}
import { MUSIC_LIST } from "./config/musiclist";
import Pubsub from "pubsub-js";

let App = React.createClass({
	getInitialState () {
		return {
			musicList : MUSIC_LIST,
			currentMusicItem : MUSIC_LIST[0]
		}
	},
	playMusic(item) {
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play');

		this.setState({
			currentMusicItem: item
		});
	},
	playNext(type) {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null;
		// 注意这里的算法
		let musiclistlen = this.state.musicList.length;
		if (type === 'next') {		
			newIndex = (index + 1) % musiclistlen;
		} else {
			newIndex = (index - 1 + musiclistlen) % musiclistlen;
		}
		let musicItem = this.state.musicList[newIndex];
		this.setState({
			currentMusicItem: musicItem
		});
		this.playMusic(musicItem);
	},
	findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	},
	// dom挂载后执行
	componentDidMount () {

		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
		
		this.playMusic(this.state.currentMusicItem);

		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playNext("next");
		});
		
		Pubsub.subscribe("DELETE_MUSIC", (msg, musicItem) => {
			this.setState({
				musicList : this.state.musicList.filter((item) => {
					return item != musicItem;
				})
			});
		});

		Pubsub.subscribe("PLAY_MUSIC", (msg, musicItem) => {
			this.playMusic(musicItem);
		});

		Pubsub.subscribe("PLAY_PREV", (msg, musicItem) => {
			this.playNext("prev");
		});

		Pubsub.subscribe("PLAY_NEXT", (msg, musicItem) => {
			this.playNext("next");
		});
	},
	componentWillUnmout(){
		Pubsub.unsubscribe("DELETE_MUSIC");
		Pubsub.unsubscribe("PLAY_MUSIC");
		PubSub.unsubscribe('CHANAGE_REPEAT');
		PubSub.unsubscribe('PLAY_NEXT');
		PubSub.unsubscribe('PLAY_PREV');
		
		$("#player").unbind($.jPlayer.event.ended);
	},
	render () {
		return (
			<div>
				<Header />
				{React.cloneElement(this.props.children, this.state)}
			</div>
		);
	}
});

let Root = React.createClass({
	render () {
		return (
		    <Router history={hashHistory}>
		        <Route path="/" component={App}>
		            <IndexRoute component={Player} />
		            <Route path="/list" component={MusicList} />
		        </Route>
		    </Router>
		);
	}
});

export default Root;