import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

class TableOrdersByStatus extends Component {
	render() {
		const array = this.props.ordersArray || []
		return (
			<tbody>
				{array.map(ord => (
					<tr key={ord.hash}>
						<td>
							<Link to={`/singleorder/${ord.hash}`} id={ord.hash}>
								Details
							</Link>
						</td>
						<td>{ord.status}</td>
						<td>{ord.pickupDate}</td>
						<td>{ord.dropoffDate}</td>
						<td>
							<Link
								to={`/singlecustomer/${ord.customerPhoneNumber}`}
								id={ord.customerPhoneNumber}>
								{ord.customer.firstName} {ord.customer.lastName}
							</Link>
						</td>
						<td>{ord.carMake}</td>
						<td>{ord.carModel}</td>
						<td>{ord.pickupLocation}</td>
					</tr>
				))}
			</tbody>
		)
	}
}

// const mapStateToProps = state => {
// 	return {
// 		orders: state.userorders,
// 		customer: state.singlecustomer,
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		getOrders: id => dispatch(getUserOrdersThunk(id)),
// 		getCustomer: id => dispatch(getSingleCustomerThunk(id)),
// 	}
// }
export default withRouter(connect(null, null)(TableOrdersByStatus))
