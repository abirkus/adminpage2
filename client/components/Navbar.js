import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Menu from './Menu'

class Navbar extends React.Component {
	render() {
		return (
			<div className='nav'>
				<Link to='/account' className='link'>
					Home
				</Link>

				<Link to='/allOrders' className='link'>
					Orders Archive
				</Link>

				<Link to='/allcustomers' className='link'>
					All Customers
				</Link>

				<Link to='/dealers' className='link'>
					Service Shops
				</Link>

				<Link to='/calendar' className='link'>
					Calendar
				</Link>

				<a
					className='link'
					href='https://www.carrectly.com/book/'
					target='_blank'>
					<div>Create a booking on client's behalf</div>
				</a>

				<div className='dropdown'>
					<button type='button' className='dropbtn'>
						Chat
					</button>
					<div id='myDropdown' className='dropdown-content'>
						<Menu />
					</div>
				</div>
			</div>
		)
	}
}

const mapState = state => {
	return {
		isLoggedIn: !!state.user.id,
	}
}

export default connect(mapState, null)(Navbar)
