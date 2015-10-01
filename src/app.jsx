var _ = require('lodash'),
	request = require('request'),
	remote = require('remote'),
	React = require('react');

//ComponentはReact.createClassに
//renderメソッドをもったオブジェクトを渡すことで作成することが出来ます。
var HelloWorld = React.createClass({
	getDefaultProps(){
		return {
			name: "React"
		}
	},
	//その際、renderメソッドはComponentを1つ返す必要があります。
	render: function(){
		//Propは基本的にはCompnentのattributeとして定義してComponentの中ではthis.props.xxxとして参照する。
		//PropにはObjectでも関数でも何でも指定することが出来ます。
		return (
			<div>
				<span>Hello! {this.props.name}</span>
			</div>
		);
	}
});

var user = {
	id:10,
	name:"Hoge"
};

//Componentに新しいPropを渡して再度rerenderしたいような場合、
//setPropsとreplacePropsを使うことでPropを更新しつつrerenderすることが出来ます。
React.render(<HelloWorld />,document.getElementById('app'));

var Test = React.createClass({
	getDefaultProps: function(){
		return {
			id:1
		};
	},
	render: function() {
		return (<div>{this.props.id}:{this.props.name}</div>);
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
	getInitialState() {
		return { count:0 };
	},
	onClick() {
		this.setState({ count: this.state.count + 1});
	},
	render() {
		return (
			<div>
				<span>{this.state.count}</span>
				<button onClick={this.onClick}>click</button>
			</div>
		);
	}
});

React.render(<Counter />,document.getElementById('counter'));


//親のStateを子のPropとして渡す
var User = React.createClass({
	render() {
		return (
			<div>{this.props.id}:{this.props.name}</div>
		);
	}
});

var Users = React.createClass({
	getInitialState() {
		return {
			users: [ {id:1,name:"foo"},{id:2,name:"bar"} ]
		}
	},
	//ComponentがDOMツリーに追加された状態で呼ばれる
	componentDidMount() {
		this.setState({users:[{id:1,name:"foo"},{id:2,name:"bar"},{id:3,name:"hoge"},{id:4,name:"kk"}]});
	},
	render() {
		var users = this.state.users.map((user) => {
			return <User id={user.id} name={user.name} key={user.id} />
		});
		return (
			<div>
				<p>ユーザー一覧</p>
				{users}
			</div>
		)
	}
});

React.render(<Users />,document.getElementById('users'));

//子でのイベントを親でハンドリングする
//子のComponentの中で発生するイベントで親がハンドリングしたい場合は、
//子がハンドリングするための関数をPropでI/Fとして公開し、親がそこに処理を渡す形になります。
//TodoListで各Todoが子のComponentになっていて子のComponentに削除や編集のUIがある時に、
//削除・編集処理はTodoListのComponentに定義しておいて各TodoのComponentから委譲されるイメージです。
var Todo = React.createClass({
	//propTypes で props のバリデーションを定義
	propTypes:{
		todo: React.PropTypes.shape({
			id: React.PropTypes.number.isRequired,
			text: React.PropTypes.string.isRequired
		}),
		// 削除するための処理をI/Fとして定義
		onDelete: React.PropTypes.func.isRequired
	},
	//Todoの状態管理は親コンポーネント（TodoList）のstateで行いたいのでイベントを委譲するかたちに
	_onDelete(){
		this.props.onDelete(this.props.todo.id);
	},
	render() {
		return (
			<div>
				<span>{this.props.todo.text}</span>
				<button onClick={this._onDelete}>delete</button>
			</div>
		)
	}
});

var TodoList = React.createClass({
	getInitialState() {
		return {
			todos: [
				{id:1,text:"aaaaa"},
				{id:2,text:"bbbbb"},
				{id:3,text:"ccccc"}
			]
		}
	},
	// TodoListはこのComponentが管理しているので削除する処理もここにあるべき
	deleteTodo(id){
		this.setState({
			todos: this.state.todos.filter((todo) => {
				return todo.id !== id;
			})
		});
	},
	render(){
		var todos = this.state.todos.map((todo) => {
			console.log(todo);
			return <li key={todo.id}><Todo onDelete={this.deleteTodo} todo={todo} /></li>
		});
		console.log(todos);
		return <ul>{todos}</ul>
	}
});

React.render(<TodoList />,document.getElementById('todo'));