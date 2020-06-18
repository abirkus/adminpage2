import {withRouter, Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddDealer from './AddDealer.js'
import {removeDealerThunk, fetchDealersThunk} from '../store/dealers.js'
import DealerCard from './DealerCard'
import {Button} from 'react-bootstrap'

class Dealers extends Component {
	constructor(props) {
		super(props)
		this.setModalShow = this.setModalShow.bind(this)
		this.state = {
			modalShow: false,
		}
	}

	setModalShow(bool) {
		this.setState({modalShow: bool})
	}

	async componentDidMount() {
		try {
			await this.props.fetchDealers()
		} catch (err) {
			console.log(err)
		}
	}

	render() {
		const dealers = this.props.dealers
		return dealers.length ? (
			<div>
				<h1 className='center'>
					Here you can manage all your shops and dealers
				</h1>
				<div className='alldealersview'>
					<div className='dealerscontainer'>
						{dealers.map(dlr => (
							<DealerCard
								dealer={dlr}
								delete={this.props.remove}
								key={dlr.id}
							/>
						))}
					</div>
					<div className='adddealersform'>
						<Button
							variant='primary'
							onClick={() => this.setModalShow(true)}>
							Launch vertically centered modal
						</Button>
						<AddDealer
							show={this.state.modalShow}
							onHide={() => this.setModalShow(false)}
						/>
					</div>
				</div>
			</div>
		) : (
			<div>
				<h1>No dealers Found</h1>
				<AddDealer />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		dealers: state.dealers,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		remove: id => dispatch(removeDealerThunk(id)),
		fetchDealers: () => dispatch(fetchDealersThunk()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dealers))
