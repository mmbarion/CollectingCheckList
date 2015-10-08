var remote = require('remote');
var React = require('react');
/*
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
*/

var {Router, Route, Link} = require('react-router');

var {Grid, Row, Col, Tabs, Tab, Modal, Button} = require('react-bootstrap');
var Styles = require('../style/Styles');

var area_cols = ["1-6","1-5","1-4","1-3","1-2","1-1","2-1","2-2","2-3","2-4","2-5","2-6"];

var Header = React.createClass({
	render: function() {
		return (
			<div className="navbar navbar-default navbar-static-top" role="navigation">
				<div className="container">
					<div className="navbar-header">{this.props.text}</div>
					<ul>
						<li><Link to="/about">about</Link></li>
						<li><Link to="/inbox">inbox</Link></li>
					</ul>
				</div>


			</div>
		);
	}
});

var Backheader = React.createClass({
	render:function() {
		return (
			<div className="navbar navbar-default navbar-static-top" role="navigation">
				<div className="container">
					<Link to="/">戻る</Link>
					<div className="navbar-header">{this.props.text}</div>
					<ul>
						<li><Link to="/about">about</Link></li>
						<li><Link to="/inbox">inbox</Link></li>
					</ul>
				</div>
			</div>
		);
	}
});


const Inbox = React.createClass({
	render: function() {
		return (<h3>Inbox</h3>);
	}
});

const About = React.createClass({
	render: function() {
		return (<h3>About</h3>);
	}
});

var Row_CollectingList = React.createClass({
	getInitialState(){
		return {
			cols:area_cols,
			lgShow: false,
			line:'0-0'
		}
	},
	render: function() {
		let lgClose = () => this.setState({lgShow: false });

		var cols2F = this.state.cols.map((col) => {
			return <Col xs={1}
			key={'2F_'+col}
			className="areacol"
			onClick={()=>this.setState({ lgShow:true,line:col})} >{col}</Col>
		});
		var cols1F = this.state.cols.map((col) => {
			return <Col xs={1}
			key={'1F_'+col}
			className="areacol"
			onClick={()=>this.setState({ lgShow:true,line:col})} >{col}</Col>
		});
		return (
			<Col md={11}>
				<Row id="row_2F">
					{cols2F}
				</Row>
				<Row id="row_1F">
					{cols1F}
				</Row>
				<InputModal show={this.state.lgShow} onHide={lgClose} line={this.state.line}/>
			</Col>
		);
	}
});

var InputModal = React.createClass({
	render: function(){
		return (
			<Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">{this.props.line}</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
});


var TabContainer = React.createClass({
	render: function() {
		return (
			<Tabs defaultActiveKey={1}>
				<Tab eventKey={1} title="一覧">
					<Row className="tabContents">
						<Col md={1} id="area_space">
							<Row><Col xs={12}>2F</Col></Row>
							<Row><Col xs={12}>1F</Col></Row>
						</Col>
							<Row_CollectingList />
					</Row>
				</Tab>
				<Tab eventKey={2} title="１エリア">1area</Tab>
				<Tab eventKey={3} title="2エリア">2area</Tab>
			</Tabs>
		);
	}
});



var App = React.createClass({
	render:function() {
		const { children } = this.props;
		return (
			<div>
				{children ? children.header : <Header text="main_app"/>}
				<div className="MainContainer" style={Styles.MainContainer}>
					{children ? children.content : <TabContainer />}
				</div>
			</div>
		);
	}
});

//React.render(<App />,document.getElementById('main'));
React.render((
	<Router>
		<Route path="/" component={App}>
			<Route path="/inbox" component={{ content: Inbox, header:Backheader}} />
			<Route path="/about" component={{ content: About, header:Backheader}} />
		</Route>
	</Router>
),document.getElementById('main'));