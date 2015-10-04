'use strict';

var remote = require('remote');
var React = require('react');

var _require = require('react-bootstrap');

var Grid = _require.Grid;
var Row = _require.Row;
var Col = _require.Col;
var Tabs = _require.Tabs;
var Tab = _require.Tab;

var Styles = require('../style/Styles');

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
				)
			)
		);
	}
});

var Row_2F = React.createClass({
	displayName: 'Row_2F',

	render: function render() {
		return React.createElement(
			Row,
			{ className: 'row_2F' },
			React.createElement(
				Col,
				{ xs: 1 },
				'1-6'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-5'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-4'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-3'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-2'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-1'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-1'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-2'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-3'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-4'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-5'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-6'
			)
		);
	}
});

var Row_1F = React.createClass({
	displayName: 'Row_1F',

	render: function render() {
		return React.createElement(
			Row,
			{ className: 'row_1F' },
			React.createElement(
				Col,
				{ xs: 1 },
				'1-6'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-5'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-4'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-3'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-2'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'1-1'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-1'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-2'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-3'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-4'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-5'
			),
			React.createElement(
				Col,
				{ xs: 1 },
				'2-6'
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
					null,
					React.createElement(Col, { md: 1 }),
					React.createElement(
						Col,
						{ md: 11 },
						React.createElement(Row_2F, null),
						React.createElement(Row_1F, null)
					)
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

var MainContainer = React.createClass({
	displayName: 'MainContainer',

	render: function render() {
		return React.createElement(
			'div',
			{ className: 'MainContainer', style: Styles.MainContainer },
			React.createElement(TabContainer, null)
		);
	}
});

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Header, { text: 'main_app' }),
			React.createElement(MainContainer, null)
		);
	}
});

React.render(React.createElement(App, null), document.getElementById('main'));