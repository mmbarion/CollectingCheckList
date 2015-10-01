'use strict';

var _ = require('lodash'),
    request = require('request'),
    remote = require('remote'),
    React = require('react');

//ComponentはReact.createClassに
//renderメソッドをもったオブジェクトを渡すことで作成することが出来ます。
var HelloWorld = React.createClass({
	displayName: 'HelloWorld',

	getDefaultProps: function getDefaultProps() {
		return {
			name: "React"
		};
	},
	//その際、renderメソッドはComponentを1つ返す必要があります。
	render: function render() {
		//Propは基本的にはCompnentのattributeとして定義してComponentの中ではthis.props.xxxとして参照する。
		//PropにはObjectでも関数でも何でも指定することが出来ます。
		return React.createElement(
			'div',
			null,
			React.createElement(
				'span',
				null,
				'Hello! ',
				this.props.name
			)
		);
	}
});

var user = {
	id: 10,
	name: "Hoge"
};

//Componentに新しいPropを渡して再度rerenderしたいような場合、
//setPropsとreplacePropsを使うことでPropを更新しつつrerenderすることが出来ます。
React.render(React.createElement(HelloWorld, null), document.getElementById('app'));

var Test = React.createClass({
	displayName: 'Test',

	getDefaultProps: function getDefaultProps() {
		return {
			id: 1
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			this.props.id,
			':',
			this.props.name
		);
	}
});

//setPropsとreplacePropsの違いは、Propの値をmergeするか置き換えるかです。
//また、それぞれ第二引数にcallback関数を指定することも出来ます。
// var component = React.render(<Test name="bar" />,document.body);
// component.setProps({name:"foo"},function(){ console.log("aaa"); });
//component.replaceProps({name:"hoge"},function(){ console.log("bbb"); });

//ReactのState
//基本的にはgetIntialStateでstateの初期値を返して、データに変更があった場合にthis.setStateで更新します。
//	Stateを使う場面
//一番よく使うのがtext fieldのようなComponent内でユーザーのアクションによって変化する値を管理するような場合です
//また、そのComponentが必要とするデータをComponent内でAjaxで取得し反映する場合なども、
//Ajaxのcallback関数内でresponseをsetStateするように使います。
var Counter = React.createClass({
	displayName: 'Counter',

	getInitialState: function getInitialState() {
		return { count: 0 };
	},
	onClick: function onClick() {
		this.setState({ count: this.state.count + 1 });
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'span',
				null,
				this.state.count
			),
			React.createElement(
				'button',
				{ onClick: this.onClick },
				'click'
			)
		);
	}
});

React.render(React.createElement(Counter, null), document.getElementById('counter'));

//親のStateを子のPropとして渡す
var User = React.createClass({
	displayName: 'User',

	render: function render() {
		return React.createElement(
			'div',
			null,
			this.props.id,
			':',
			this.props.name
		);
	}
});

var Users = React.createClass({
	displayName: 'Users',

	getInitialState: function getInitialState() {
		return {
			users: [{ id: 1, name: "foo" }, { id: 2, name: "bar" }]
		};
	},
	//ComponentがDOMツリーに追加された状態で呼ばれる
	componentDidMount: function componentDidMount() {
		this.setState({ users: [{ id: 1, name: "foo" }, { id: 2, name: "bar" }, { id: 3, name: "hoge" }, { id: 4, name: "kk" }] });
	},
	render: function render() {
		var users = this.state.users.map(function (user) {
			return React.createElement(User, { id: user.id, name: user.name, key: user.id });
		});
		return React.createElement(
			'div',
			null,
			React.createElement(
				'p',
				null,
				'ユーザー一覧'
			),
			users
		);
	}
});

React.render(React.createElement(Users, null), document.getElementById('users'));

//子でのイベントを親でハンドリングする
//子のComponentの中で発生するイベントで親がハンドリングしたい場合は、
//子がハンドリングするための関数をPropでI/Fとして公開し、親がそこに処理を渡す形になります。
//TodoListで各Todoが子のComponentになっていて子のComponentに削除や編集のUIがある時に、
//削除・編集処理はTodoListのComponentに定義しておいて各TodoのComponentから委譲されるイメージです。
var Todo = React.createClass({
	displayName: 'Todo',

	//propTypes で props のバリデーションを定義
	propTypes: {
		todo: React.PropTypes.shape({
			id: React.PropTypes.number.isRequired,
			text: React.PropTypes.string.isRequired
		}),
		// 削除するための処理をI/Fとして定義
		onDelete: React.PropTypes.func.isRequired
	},
	//Todoの状態管理は親コンポーネント（TodoList）のstateで行いたいのでイベントを委譲するかたちに
	_onDelete: function _onDelete() {
		this.props.onDelete(this.props.todo.id);
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'span',
				null,
				this.props.todo.text
			),
			React.createElement(
				'button',
				{ onClick: this._onDelete },
				'delete'
			)
		);
	}
});

var TodoList = React.createClass({
	displayName: 'TodoList',

	getInitialState: function getInitialState() {
		return {
			todos: [{ id: 1, text: "aaaaa" }, { id: 2, text: "bbbbb" }, { id: 3, text: "ccccc" }]
		};
	},
	// TodoListはこのComponentが管理しているので削除する処理もここにあるべき
	deleteTodo: function deleteTodo(id) {
		this.setState({
			todos: this.state.todos.filter(function (todo) {
				return todo.id !== id;
			})
		});
	},
	render: function render() {
		var _this = this;

		var todos = this.state.todos.map(function (todo) {
			console.log(todo);
			return React.createElement(
				'li',
				{ key: todo.id },
				React.createElement(Todo, { onDelete: _this.deleteTodo, todo: todo })
			);
		});
		console.log(todos);
		return React.createElement(
			'ul',
			null,
			todos
		);
	}
});

React.render(React.createElement(TodoList, null), document.getElementById('todo'));