'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var remote = require('remote');
var React = require('react');
/*
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
*/

var _require = require('react-router');

var Router = _require.Router;
var Route = _require.Route;
var Link = _require.Link;

var _require2 = require('react-bootstrap');

var Grid = _require2.Grid;
var Row = _require2.Row;
var Col = _require2.Col;
var Tabs = _require2.Tabs;
var Tab = _require2.Tab;
var Modal = _require2.Modal;
var Button = _require2.Button;

var Styles = require('../style/Styles');

var area_cols = ["1-6", "1-5", "1-4", "1-3", "1-2", "1-1", "2-1", "2-2", "2-3", "2-4", "2-5", "2-6"];

var Header = React.createClass({
	displayName: 'Header',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'navbar navbar-default navbar-static-top', role: 'navigation' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'navbar-header' },
					this.props.text
				),
				React.createElement(
					'ul',
					null,
					React.createElement(
						'li',
						null,
						React.createElement(
							Link,
							{ to: '/about' },
							'about'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							Link,
							{ to: '/inbox' },
							'inbox'
						)
					)
				)
			)
		);
	}
});

var Backheader = React.createClass({
	displayName: 'Backheader',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'navbar navbar-default navbar-static-top', role: 'navigation' },
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					Link,
					{ to: '/' },
					'戻る'
				),
				React.createElement(
					'div',
					{ className: 'navbar-header' },
					this.props.text
				),
				React.createElement(
					'ul',
					null,
					React.createElement(
						'li',
						null,
						React.createElement(
							Link,
							{ to: '/about' },
							'about'
						)
					),
					React.createElement(
						'li',
						null,
						React.createElement(
							Link,
							{ to: '/inbox' },
							'inbox'
						)
					)
				)
			)
		);
	}
});

var Inbox = React.createClass({
	displayName: 'Inbox',

	render: function render() {
		return React.createElement(
			'h3',
			null,
			'Inbox'
		);
	}
});

var About = React.createClass({
	displayName: 'About',

	render: function render() {
		return React.createElement(
			'h3',
			null,
			'About'
		);
	}
});

var Row_CollectingList = React.createClass({
	displayName: 'Row_CollectingList',

	getInitialState: function getInitialState() {
		return {
			cols: area_cols,
			lgShow: false,
			line: '0-0'
		};
	},
	render: function render() {
		var _this = this;

		var lgClose = function lgClose() {
			return _this.setState({ lgShow: false });
		};

		var cols2F = this.state.cols.map(function (col) {
			return React.createElement(
				Col,
				{ xs: 1,
					key: '2F_' + col,
					className: 'areacol',
					onClick: function () {
						return _this.setState({ lgShow: true, line: col });
					} },
				col
			);
		});
		var cols1F = this.state.cols.map(function (col) {
			return React.createElement(
				Col,
				{ xs: 1,
					key: '1F_' + col,
					className: 'areacol',
					onClick: function () {
						return _this.setState({ lgShow: true, line: col });
					} },
				col
			);
		});
		return React.createElement(
			Col,
			{ md: 11 },
			React.createElement(
				Row,
				{ id: 'row_2F' },
				cols2F
			),
			React.createElement(
				Row,
				{ id: 'row_1F' },
				cols1F
			),
			React.createElement(InputModal, { show: this.state.lgShow, onHide: lgClose, line: this.state.line })
		);
	}
});

var InputModal = React.createClass({
	displayName: 'InputModal',

	render: function render() {
		return React.createElement(
			Modal,
			_extends({}, this.props, { bsSize: 'large', 'aria-labelledby': 'contained-modal-title-lg' }),
			React.createElement(
				Modal.Header,
				{ closeButton: true },
				React.createElement(
					Modal.Title,
					{ id: 'contained-modal-title-lg' },
					this.props.line
				)
			),
			React.createElement(Modal.Body, null),
			React.createElement(
				Modal.Footer,
				null,
				React.createElement(
					Button,
					{ onClick: this.props.onHide },
					'Close'
				)
			)
		);
	}
});

var TabContainer = React.createClass({
	displayName: 'TabContainer',

	render: function render() {
		return React.createElement(
			Tabs,
			{ defaultActiveKey: 1 },
			React.createElement(
				Tab,
				{ eventKey: 1, title: '一覧' },
				React.createElement(
					Row,
					{ className: 'tabContents' },
					React.createElement(
						Col,
						{ md: 1, id: 'area_space' },
						React.createElement(
							Row,
							null,
							React.createElement(
								Col,
								{ xs: 12 },
								'2F'
							)
						),
						React.createElement(
							Row,
							null,
							React.createElement(
								Col,
								{ xs: 12 },
								'1F'
							)
						)
					),
					React.createElement(Row_CollectingList, null)
				)
			),
			React.createElement(
				Tab,
				{ eventKey: 2, title: '１エリア' },
				'1area'
			),
			React.createElement(
				Tab,
				{ eventKey: 3, title: '2エリア' },
				'2area'
			)
		);
	}
});

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		var children = this.props.children;

		return React.createElement(
			'div',
			null,
			children ? children.header : React.createElement(Header, { text: 'main_app' }),
			React.createElement(
				'div',
				{ className: 'MainContainer', style: Styles.MainContainer },
				children ? children.content : React.createElement(TabContainer, null)
			)
		);
	}
});

//React.render(<App />,document.getElementById('main'));
React.render(React.createElement(
	Router,
	null,
	React.createElement(
		Route,
		{ path: '/', component: App },
		React.createElement(Route, { path: '/inbox', component: { content: Inbox, header: Backheader } }),
		React.createElement(Route, { path: '/about', component: { content: About, header: Backheader } })
	)
), document.getElementById('main'));