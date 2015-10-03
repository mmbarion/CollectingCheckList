var remote = require('remote');
var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
			<div className="navbar navbar-default navbar-static-top" role="navigation">
				<div className="container">
					<div className="navbar-header">{this.props.text}</div>
				</div>
			</div>
		);
	}
});

var App = React.createClass({
	render:function() {
		return (
			<div>
				<Header text="main_app"/>
			</div>
		);
	}
});

React.render(<App />,document.getElementById('main'));