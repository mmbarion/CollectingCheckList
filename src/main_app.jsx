var remote = require('remote');
var React = require('react');
var {Grid, Row, Col, Tabs, Tab} = require('react-bootstrap');
var Styles = require('../style/Styles');

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

var Row_2F = React.createClass({
	render: function() {
		return (
			<Row className="row_2F">
				<Col xs={1}>1-6</Col>
				<Col xs={1}>1-5</Col>
				<Col xs={1}>1-4</Col>
				<Col xs={1}>1-3</Col>
				<Col xs={1}>1-2</Col>
				<Col xs={1}>1-1</Col>

				<Col xs={1}>2-1</Col>
				<Col xs={1}>2-2</Col>
				<Col xs={1}>2-3</Col>
				<Col xs={1}>2-4</Col>
				<Col xs={1}>2-5</Col>
				<Col xs={1}>2-6</Col>
			</Row>
		);
	}
});

var Row_1F = React.createClass({
	render: function() {
		return (
			<Row className="row_1F">
				<Col xs={1}>1-6</Col>
				<Col xs={1}>1-5</Col>
				<Col xs={1}>1-4</Col>
				<Col xs={1}>1-3</Col>
				<Col xs={1}>1-2</Col>
				<Col xs={1}>1-1</Col>

				<Col xs={1}>2-1</Col>
				<Col xs={1}>2-2</Col>
				<Col xs={1}>2-3</Col>
				<Col xs={1}>2-4</Col>
				<Col xs={1}>2-5</Col>
				<Col xs={1}>2-6</Col>
			</Row>
		);
	}
});


var TabContainer = React.createClass({
	render: function() {
		return (
			<Tabs defaultActiveKey={1}>
				<Tab eventKey={1} title="一覧">
					<Row>
						<Col md={1}>
						</Col>
						<Col md={11}>
							<Row_2F />
							<Row_1F />
						</Col>
					</Row>
				</Tab>
				<Tab eventKey={2} title="１エリア">1area</Tab>
				<Tab eventKey={3} title="2エリア">2area</Tab>
			</Tabs>
		);
	}
});

var MainContainer = React.createClass({
	render: function() {
		return (
			<div className="MainContainer" style={Styles.MainContainer}>
				<TabContainer />
			</div>
		);
	}
});

var App = React.createClass({
	render:function() {
		return (
			<div>
				<Header text="main_app"/>
				<MainContainer />
			</div>
		);
	}
});

React.render(<App />,document.getElementById('main'));