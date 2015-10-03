'use strict';

var remote = require('remote');
var React = require('react');

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

var App = React.createClass({
	displayName: 'App',

	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(Header, { text: 'main_app' })
		);
	}
});

React.render(React.createElement(App, null), document.getElementById('main'));