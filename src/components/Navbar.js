/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Popover} from 'antd'
import {logout} from '../Redux'
import {
	FolderOutlined,
	TeamOutlined,
	ToolOutlined,
	CalendarOutlined,
	TableOutlined,
	FireOutlined,
	LogoutOutlined,
	CarOutlined,
} from '@ant-design/icons'
import './styles/navbar.scss'

class Navbar extends React.Component {
	constructor() {
		super()
		// this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
		// this.state = {
		// 	width: window.innerWidth,
		// }
	}

	handleLogout() {
		this.props.handleClick()
	}

	// componentDidMount() {
	// 	window.addEventListener('resize', this.handleWindowSizeChange)
	// }

	// componentWillUnmount() {
	// 	window.removeEventListener('resize', this.handleWindowSizeChange)
	// }

	// handleWindowSizeChange = () => {
	// 	this.setState({width: window.innerWidth})
	// }
	render() {
		// const {width} = this.state
		// const isMobile = width <= 500

		return (
			<div className='navbar1'>
				<Popover content='Click here to book for client'>
					<a
						className='link'
						href='https://www.carrectly.com/book/'
						rel='noreferrer'
						target='_blank'>
						<img
							id='logo'
							src='https://www.carrectly.com/wp-content/uploads/2016/11/logo.png'
						/>
					</a>
				</Popover>
				<Link to='/account' className='link'>
					<FireOutlined className='icon' />
					{this.props.userRole === 'driver' ? (
						<span>My Trips</span>
					) : (
						<span>Active Orders</span>
					)}
				</Link>
				{this.props.userRole === 'driver' && (
					<Link to='/alltrips' className='link'>
						<CarOutlined className='icon' />
						All Trips
					</Link>
				)}

				<Link to='/allOrders' className='link'>
					<FolderOutlined className='icon' />
					Archived Orders
				</Link>
				<Link to='/allCustomers' className='link'>
					<TeamOutlined className='icon' />
					All Customers
				</Link>
				{this.props.userRole !== 'driver' && (
					<Link to='/dealers' className='link'>
						<ToolOutlined className='icon' />
						Service Shops
					</Link>
				)}
				{this.props.userRole !== 'driver' && (
					<Link to='/drivers' className='link'>
						<CarOutlined className='icon' />
						Drivers
					</Link>
				)}
				{this.props.userRole !== 'driver' && (
					<Link to='/calendar' className='link'>
						<CalendarOutlined className='icon' />
						Calendar
					</Link>
				)}
				{this.props.userRole !== 'driver' && (
					<Link to='/users' className='link'>
						<CalendarOutlined className='icon' />
						Users
					</Link>
				)}
				{this.props.userRole !== 'driver' && (
					<Link to='/allServices' className='link'>
						<TableOutlined className='icon' />
						Services
					</Link>
				)}

				{this.props.isLoggedIn ? (
					<a className='link' onClick={this.handleLogout}>
						<LogoutOutlined className='icon' />
						Log out
					</a>
				) : (
					<div />
				)}
			</div>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
		userRole: state.user.role,
	}
}

const mapDispatch = dispatch => {
	return {
		handleClick: () => dispatch(logout()),
	}
}
export default connect(mapState, mapDispatch)(Navbar)

// isMobile ? (
// 			<div className='dropdown'>
// 				<button className='dropbtn'>
// 					<div className='fa fa-bars fa-2x link' />
// 				</button>
// 				<div id='myDropdown' className='dropdown-content'>
// 					<Link to='/account' className='link'>
// 						Home
// 					</Link>

// 					<Link to='/allOrders' className='link'>
// 						<FolderOutlined />
// 						<span>Archived Orders</span>
// 					</Link>
// 					<Link to='/allCustomers' className='link'>
// 						<TeamOutlined />
// 						All Customers
// 					</Link>
// 					<Link to='/dealers' className='link'>
// 						<ToolOutlined />
// 						Service Shops
// 					</Link>

// 					<Link to='/calendar' className='link'>
// 						<CalendarOutlined />
// 						Calendar
// 					</Link>
// 					<Link to='/allServices' className='link'>
// 						<TableOutlined />
// 						Services
// 					</Link>
// 				</div>
// 			</div>
// 		)
