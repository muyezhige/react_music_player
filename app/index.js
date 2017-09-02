// var react = require("react");
// import ES6 写法
import React from "react";
// 将react组件挂载到真实的DOM元素上
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./root";

// console.log(react.version);

render(
	<AppContainer>
		<Root />
	</AppContainer>,
	document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./root', () => {
        const NewRoot = require('./root').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}