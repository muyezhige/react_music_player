/* 行为的抽象，普通的js对象，由方法来生成，必须有一个type
 *
 */
 let nextTudoId = 0;
export const addTodo = (text) => {
	return {
		type: "ADD_TUDO",
		id: nextTudoId,
		text:
	}
}

export const setVisibility = (filter) => {
	return {
		type: "SET_VISIBILITY",
		filter:
	}
}
export const toggleTodo = (id) => {
	return {
		type: "TOGGLE_TODO",
		id:
	}
}