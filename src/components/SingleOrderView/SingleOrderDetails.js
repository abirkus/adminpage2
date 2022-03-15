import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Descriptions, Tabs, Button, Dropdown, Menu, Select} from 'antd'
import {Link, useParams} from 'react-router-dom'
const {TabPane} = Tabs
import moment from 'moment'
import {
	LocationCell,
	StatusCell,
	ConciergeCell,
	GoogleVoiceLinkCell,
} from '../Table/Cells.js'
import {getStatusArray} from '../util'
import {
	updateSingleOrderThunk,
	addOrderDriverThunk,
	addOrderDealerThunk,
	removeOrderDealerThunk,
} from '../../Redux/orders/singleorder'
import './styles.scss'

const statusArray = getStatusArray()
const {Option} = Select

const menuList = fn => {
	return (
		<Menu onClick={fn}>
			{statusArray.map((status, index) => (
				<Menu.Item key={status} id={index}>
					{status}
				</Menu.Item>
			))}
		</Menu>
	)
}

const driversList = (arr, fn, tripType) => {
	return (
		<Menu onClick={fn}>
			{arr.map(driver => (
				<Menu.Item key={driver.id} id={tripType}>
					{driver.name}
				</Menu.Item>
			))}
		</Menu>
	)
}

const flattenDealersArray1 = arr => {
	return arr.map(el => {
		return (
			<Option value={el.name} key={el.id}>
				{el.name}
			</Option>
		)
	})
}

const flattenDealersArray2 = arr => {
	return arr.map(el => el.name)
}

const SingleOrderDetails = props => {
	const dispatch = useDispatch()
	const params = useParams()
	const orderId = params.orderid
	const singleorder = props.order
	const pickUpDriver = props.pickUpDriver
	const returnDriver = props.returnDriver
	const customer = props.customer
	const orderDealers = flattenDealersArray2(props.orderDealers)
	const drivers = useSelector(state => state.drivers)
	const shops = useSelector(state => state.dealers)

	const handleStatusUpdate = e => {
		let obj = {
			status: e.key,
		}
		if (e.key === 'cancelled') {
			if (
				window.confirm(
					'Changing the status to cancelled will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				dispatch(updateSingleOrderThunk(orderId, obj))
			} else {
				console.log('changed my mind')
			}
		} else if (e.key === 'paid') {
			if (
				window.confirm(
					'Changing the status to paid will remove the order from the home page and will move it to archives. Do you want to proceed?'
				)
			) {
				dispatch(updateSingleOrderThunk(orderId, obj))
			} else {
				console.log('changed my mind')
			}
		} else if (e.key === 'confirmed') {
			const diff = moment(singleorder.dropoffDate).diff(
				moment(singleorder.pickupDate)
			)
			if (diff < 0 || !diff) {
				window.alert(
					'Please enter a valid drop off date before marking the order as confirmed. Drop off date must be after pick up date'
				)
			} else {
				dispatch(updateSingleOrderThunk(orderId, obj))
			}
		} else {
			dispatch(updateSingleOrderThunk(orderId, obj))
		}
	}

	const handleAddDealer = dealerName => {
		dispatch(addOrderDealerThunk(orderId, dealerName))
	}

	const handleRemoveDealer = dealerName => {
		dispatch(removeOrderDealerThunk(orderId, dealerName))
	}

	const changeDriver = evt => {
		dispatch(
			addOrderDriverThunk(orderId, {
				driverId: evt.key,
				tripType: evt.item.props.id,
			})
		)
	}

	return (
		<Tabs type='card' style={{margin: '0px 0px 10px 0px'}}>
			<TabPane tab='Order Details' key='1'>
				<Descriptions
					className='order-descriptions'
					layout='vertical'
					column={{
						xxl: 3,
						xl: 2,
						lg: 2,
						md: 2,
						sm: 1,
						xs: 1,
					}}>
					<Descriptions.Item>
						<Descriptions
							title='Order'
							layout='horizontal'
							bordered={false}
							column={1}
							size='small'>
							<Descriptions.Item label='Order ID'>
								{singleorder.hash}
							</Descriptions.Item>
							<Descriptions.Item label='Status'>
								<Dropdown
									overlay={() =>
										menuList(handleStatusUpdate)
									}>
									<Button
										size='small'
										style={{padding: '0px'}}>
										<StatusCell
											value={singleorder.status}
											dropDown={true}
										/>
									</Button>
								</Dropdown>
							</Descriptions.Item>
							<Descriptions.Item label='Pickup Date'>
								{moment(singleorder.pickupDate).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
							<Descriptions.Item label='Drop Off Date'>
								{moment(singleorder.dropoffDate).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
							<Descriptions.Item label='Pickup Location'>
								<LocationCell
									value={singleorder.pickupLocation}
								/>
							</Descriptions.Item>
							<Descriptions.Item label='PROMO CODE'>
								{singleorder.promoCode}
							</Descriptions.Item>
							<Descriptions.Item label='Discount'>
								{singleorder.discount}
							</Descriptions.Item>
							<Descriptions.Item label='Flexible on Time'>
								{singleorder.flexibleOnTime}
							</Descriptions.Item>
							<Descriptions.Item label='Created at'>
								{moment(singleorder.createAt).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
							<Descriptions.Item label='Updated at'>
								{moment(singleorder.updatedAt).format(
									'M/D/YY hh:mm A'
								)}
							</Descriptions.Item>
						</Descriptions>
					</Descriptions.Item>

					<Descriptions.Item>
						<Descriptions
							title='Car'
							layout='horizontal'
							bordered={false}
							size='small'
							column={1}
							className='descriptionsAntd'>
							<Descriptions.Item label='Car Make'>
								{singleorder.carMake}
							</Descriptions.Item>
							<Descriptions.Item label='Car Model'>
								{singleorder.carModel}
							</Descriptions.Item>
							<Descriptions.Item label='Car Year'>
								{singleorder.carYear}
							</Descriptions.Item>
							<Descriptions.Item label='Car Color'>
								{singleorder.carColor}
							</Descriptions.Item>
							<Descriptions.Item label='VIN'>
								{singleorder.vin}
							</Descriptions.Item>
							<Descriptions.Item label='Stick shift'>
								{singleorder.stickShift}
							</Descriptions.Item>
						</Descriptions>
					</Descriptions.Item>

					<Descriptions.Item>
						<Descriptions
							title='Customer'
							layout='horizontal'
							bordered={false}
							size='small'
							column={1}
							className='descriptionsAntd'>
							<Descriptions.Item label='Customer Phone Number'>
								<GoogleVoiceLinkCell
									value={customer.phoneNumber}
								/>
							</Descriptions.Item>
							<Descriptions.Item label='Customer Name'>
								<Link
									to={`/singlecustomer/${customer.phoneNumber}`}>
									{customer.firstName} {customer.lastName}
								</Link>
							</Descriptions.Item>
							<Descriptions.Item label='Customer Comments'>
								{singleorder.customerComments}
							</Descriptions.Item>
						</Descriptions>
					</Descriptions.Item>

					<Descriptions.Item>
						<Descriptions
							title='Driver'
							layout='horizontal'
							bordered={false}
							size='small'
							column={1}
							className='descriptionsAntd'>
							<Descriptions.Item label='Shops servicing'>
								<Select
									mode='multiple'
									allowClear={false}
									style={{width: '50%'}}
									placeholder='Please select'
									onSelect={handleAddDealer}
									onDeselect={handleRemoveDealer}
									value={orderDealers}>
									{flattenDealersArray1(shops)}
								</Select>
							</Descriptions.Item>
							<Descriptions.Item label='Concierge'>
								<div>{singleorder.concierge}</div>
							</Descriptions.Item>
							<Descriptions.Item label='Driver picking up'>
								<Dropdown
									overlay={() =>
										driversList(
											drivers,
											changeDriver,
											'pickUp'
										)
									}>
									<Button
										size='small'
										style={{padding: '0px', border: '0px'}}>
										<ConciergeCell
											value={pickUpDriver}
											dropDown={true}
										/>
									</Button>
								</Dropdown>
							</Descriptions.Item>
							<Descriptions.Item label='Driver dropping off'>
								{moment(singleorder.dropoffDate).diff(
									moment(singleorder.pickupDate)
								) > 0 ? (
									<Dropdown
										overlay={() =>
											driversList(
												drivers,
												changeDriver,
												'return'
											)
										}>
										<Button
											size='small'
											style={{
												padding: '0px',
												border: '0px',
											}}>
											<ConciergeCell
												value={returnDriver}
												dropDown={true}
											/>
										</Button>
									</Dropdown>
								) : (
									<div>
										Please enter a valid drop off date in
										order to assign a driver
									</div>
								)}
							</Descriptions.Item>
						</Descriptions>
					</Descriptions.Item>
				</Descriptions>
			</TabPane>
			<TabPane tab='Change log' key='2'>
				Change log coming soon ...
			</TabPane>
		</Tabs>
	)
}

export default SingleOrderDetails
