import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {me} from './Redux'
import {
	AllCustomers,
	SingleCustomer,
	AllOrders,
	SingleOrder,
	Account,
	Login,
	Dealers,
	CalendarView,
	AllServices,
	Drivers,
	Users,
	AllTripsView,
} from './components'

class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData()
	}

	render() {
		let show = true
		if (this.props.userRole !== 'unconfirmed' && this.props.isLoggedIn) {
			show = true
		} else {
			show = false
		}
		return (
			<Switch>
				<Route exact path='/' component={Account} />
				<Route path='/login' component={Login} />
				<Route path='/account' component={Account} />
				{show && (
					<Switch>
						<Route path='/allOrders' component={AllOrders} />
						<Route path='/allServices' component={AllServices} />
						<Route path='/allCustomers' component={AllCustomers} />
						{this.props.userRole === 'driver' && (
							<Route path='/alltrips' component={AllTripsView} />
						)}
						<Route
							path='/singlecustomer/:userid'
							component={SingleCustomer}
						/>
						<Route
							path='/singleorder/:orderid'
							component={SingleOrder}
						/>
						<Route path='/dealers' component={Dealers} />
						<Route path='/users' component={Users} />
						<Route path='/drivers' component={Drivers} />
						<Route path='/calendar' component={CalendarView} />
					</Switch>
				)}
			</Switch>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: state.user.id,
		userRole: state.user.role,
	}
}

const mapDispatch = dispatch => {
	return {
		loadInitialData() {
			dispatch(me())
		},
	}
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
