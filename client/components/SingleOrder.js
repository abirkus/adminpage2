import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
	getSingleOrderThunk,
	updateOrderDetailsThunk,
	removeOrderServiceThunk,
} from '../store/singleorder'
import Gmail from './Gmail'
import Invoice from './Invoice'
import {Table, Button} from 'react-bootstrap'
import UpdateOrder from './UpdateOrder'
import {getEmailsThunk} from '../store/emails'
import AddOrderServices from './AddOrderServices'

class SingleOrder extends Component {
	constructor(props) {
		super(props)
		this.handleServiceUpdate = this.handleServiceUpdate.bind(this)
		this.handleRemoveService = this.handleRemoveService.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.fetchEmails = this.fetchEmails.bind(this)
		this.state = {}
	}

	handleChange(evt) {
		if (!this.state[evt.target.id]) {
			this.setState({
				[evt.target.id]: {
					[evt.target.name]: evt.target.value,
				},
			})
		} else {
			let temp = this.state[evt.target.id]
			this.setState({
				[evt.target.id]: {...temp, [evt.target.name]: evt.target.value},
			})
		}
	}

	async fetchEmails() {
		let id = this.props.match.params.orderid
		await this.props.getEmails(id)
	}

	handleServiceUpdate(evt) {
		evt.preventDefault()
		let obj = {...this.state}
		let id = this.props.match.params.orderid
		this.props.updateServices(id, obj)
		obj = {}
		this.setState({})
	}

	handleRemoveService(evt) {
		console.log('event target', evt.target)
		let obj = {
			serviceid: evt.target.id,
		}
		let orderid = this.props.match.params.orderid
		this.props.removeService(orderid, obj)
		obj = {}
		this.setState({})
	}

	componentDidMount() {
		this.props.getOrder(this.props.match.params.orderid)
	}

	render() {
		console.log('state', this.state)
		const singleorder = this.props.order || {}
		const services = this.props.order.services || []

		let arr = []
		for (let [key, value] of Object.entries(singleorder)) {
			arr.push(`${key}: ${value}`)
		}
		return (
			<div>
				<h3>Order Details</h3>
				<div className='singleordercontainer'>
					<Table striped bordered hover variant='dark'>
						<tbody>
							{arr.map((details, index) => (
								<tr key={index}>
									<th>{details.split(':')[0]}</th>
									<td>{details.split(':')[1]}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className='invoiceform'>
						<UpdateOrder id={this.props.match.params.orderid} />
						<Invoice fetchEmails={this.fetchEmails} />
					</div>
				</div>
				<br />
				<div>
					<Table striped bordered hover size='sm' variant='dark'>
						<thead>
							<tr>
								<th>Service</th>
								<th>Customer Price</th>
								<th>Dealer Price</th>
								<th>Update Customer Price</th>
								<th>Update Dealer Price</th>
								<th>Remove Service</th>
							</tr>
						</thead>
						<tbody>
							{services.map(service => (
								<tr key={service.id} id={service.id}>
									<td>{service.name}</td>
									<td>
										{service.orderdetails.customerPrice}
									</td>
									<td>{service.orderdetails.dealerPrice}</td>
									<td>
										<input
											className='priceupdateform'
											id={service.id}
											name='customerPrice'
											type='text'
											placeholder='$$$'
											onChange={this.handleChange}
										/>
									</td>
									<td>
										<input
											id={service.id}
											className='priceupdateform'
											name='dealerPrice'
											type='text'
											placeholder='$$$'
											onChange={this.handleChange}
										/>
									</td>
									<td>
										<button
											id={service.id}
											type='button'
											onClick={id =>
												this.handleRemoveService(id)
											}>
											Remove from Order
										</button>
									</td>
								</tr>
							))}
							<tr>
								<td colSpan='3'>
									<AddOrderServices
										orderid={
											this.props.match.params.orderid
										}
									/>
								</td>
								<td colSpan='2'>
									<Button
										size='lg'
										block
										variant='primary'
										onClick={id =>
											this.handleServiceUpdate(id)
										}>
										Update prices
									</Button>
								</td>
								<td></td>
							</tr>
						</tbody>
					</Table>
				</div>

				<h3>Order Email History</h3>
				<Gmail fetchEmails={this.fetchEmails} />
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
		updateServices: (id, obj) => dispatch(updateOrderDetailsThunk(id, obj)),
		getEmails: id => dispatch(getEmailsThunk(id)),
		removeService: (id, obj) => dispatch(removeOrderServiceThunk(id, obj)),
	}
}
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
)
