import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleOrderThunk} from '../../Redux/orders/singleorder'
import SingleOrderEmails from './SingleOrderEmails'
import Invoice from './Invoice'
import SingleOrderServices from './SingleOrderServices'
import SingleOrderDetails from './SingleOrderDetails'
import OrderComments from './OrderComments'
import './styles.scss'

class SingleOrder extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount() {
		this.props.getOrder(this.props.match.params.orderid)
	}

	render() {
		const singleorder = this.props.order || {}
		const services = this.props.order.services || []
		const customer = singleorder.customer || {}
		const pickUpDriver = singleorder.pickUpDriver || {}
		const returnDriver = singleorder.returnDriver || {}
		const orderDealers = singleorder.dealers || []

		return (
			<div>
				<div className='singleordercontainer'>
					<div className='singleordertable'>
						<SingleOrderDetails
							order={singleorder}
							customer={customer}
							pickUpDriver={pickUpDriver}
							returnDriver={returnDriver}
							orderDealers={orderDealers}
						/>
						<SingleOrderEmails />
					</div>
					<div className='invoiceform'>
						<h3 className='sectionHeader'>Manage Order</h3>
						<Invoice />
						<h3 className='sectionHeader'>Add Services</h3>
						<div className='singleOrderServices'>
							<SingleOrderServices services={services} />
						</div>
						<h3 className='sectionHeader'>Internal Comments</h3>
						<OrderComments id={this.props.match.params.orderid} />
					</div>
				</div>
				<br />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		order: state.singleorder,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getOrder: id => dispatch(getSingleOrderThunk(id)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
