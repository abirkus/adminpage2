import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateSingleOrderThunk} from '../store/singleorder'
import {Form, Button} from 'react-bootstrap'

class UpdateOrder extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			pickupDate: '',
			dropoffDate: '',
			pickupLocation: '',
			carYear: '',
			carMake: '',
			carModel: '',
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		})
	}
	handleSubmit(evt) {
		evt.preventDefault()
		let obj = {}
		if (this.state.pickupDate) {
			obj.pickupDate = this.state.pickupDate
		}
		if (this.state.dropoffDate) {
			obj.dropoffDate = this.state.dropoffDate
		}
		if (this.state.pickupLocation) {
			obj.firstpickupLocationName = this.state.pickupLocation
		}
		if (this.state.carYear) {
			obj.carYear = this.state.carYear
		}
		if (this.state.carMake) {
			obj.carMake = this.state.carMake
		}
		if (this.state.carModel) {
			obj.carModel = this.state.carModel
		}
		let id = this.props.id
		console.log('inside update form', id)
		this.props.update(id, obj)
		obj = {}
		this.setState({
			pickupDate: '',
			dropoffDate: '',
			pickupLocation: '',
			carYear: '',
			carMake: '',
			carModel: '',
		})
	}

	render() {
		return (
			<div className='form'>
				<h3>Update Order info</h3>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId='formBasicName'>
						<Form.Label>pickupDate</Form.Label>
						<Form.Control
							type='datetime-local'
							name='pickupDate'
							value={this.state.pickupDate}
							placeholder='Enter address'
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicEmail'>
						<Form.Label>dropoffDate</Form.Label>
						<Form.Control
							type='datetime-local'
							name='dropoffDate'
							value={this.state.dropoffDate}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicSpecialty'>
						{/* <Form.Label>pickupLocation</Form.Label> */}
						<Form.Control
							type='text'
							name='pickupLocation'
							placeholder='pickupLocation'
							value={this.state.pickupLocation}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						{/* <Form.Label>carYear</Form.Label> */}
						<Form.Control
							type='text'
							name='carYear'
							placeholder='carYear'
							value={this.state.carYear}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						{/* <Form.Label>carMake</Form.Label> */}
						<Form.Control
							type='text'
							name='carMake'
							placeholder='carMake'
							value={this.state.carMake}
							onChange={this.handleChange}
						/>
					</Form.Group>

					<Form.Group controlId='formBasicPassword'>
						{/* <Form.Label>carModel</Form.Label> */}
						<Form.Control
							type='text'
							name='carModel'
							placeholder='carModel'
							value={this.state.carModel}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Button variant='primary' type='submit'>
						Update
					</Button>
				</Form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update: (id, obj) => dispatch(updateSingleOrderThunk(id, obj)),
	}
}
export default connect(null, mapDispatchToProps)(UpdateOrder)