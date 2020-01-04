import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const UPDATE_SINGLE_ORDER = 'UPDATE_SINGLE_ORDER'
const UPDATE_ORDER_DETAILS = 'UPDATE_ORDER_DETAILS'
const ADD_ORDER_SERVICE = 'ADD_ORDER_SERVICE'
const REMOVE_ORDER_SERVICE = 'REMOVE_ORDER_SERVICE'

/**
 * INITIAL STATE
 */
const singleOrder = {}

/**
 * ACTION CREATORS
 */
const getSingleOrder = order => ({type: GET_SINGLE_ORDER, order})
const updateSingleOrder = order => ({type: UPDATE_SINGLE_ORDER, order})
const updateOrderDetails = order => ({type: UPDATE_ORDER_DETAILS, order})
const addOrderService = order => ({type: ADD_ORDER_SERVICE, order})
const removeOrderService = order => ({type: REMOVE_ORDER_SERVICE, order})

/**
 * THUNK CREATORS
 */
export const getSingleOrderThunk = orderid => async dispatch => {
	try {
		const res = await axios.get(`/api/orders/single/${orderid}`)
		dispatch(getSingleOrder(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const updateSingleOrderThunk = (orderid, obj) => async dispatch => {
	try {
		const res = await axios.put(`/api/orders/single/${orderid}`, obj)
		dispatch(updateSingleOrder(res.data))
	} catch (err) {
		console.error(err)
	}
}

export const updateOrderDetailsThunk = (id, obj) => async dispatch => {
	try {
		const res = await axios.put(`/api/orders/single/services/${id}`, obj)
		const resp = await axios.get(`/api/orders/single/${id}`)
		dispatch(updateOrderDetails(resp.data))
	} catch (err) {
		console.error(err)
	}
}

export const addOrderServiceThunk = (id, obj) => async dispatch => {
	try {
		const res = await axios.post(`/api/orders/single/services/${id}`, obj)
		const resp = await axios.get(`/api/orders/single/${id}`)
		dispatch(addOrderService(resp.data))
	} catch (err) {
		console.error(err)
	}
}

export const removeOrderServiceThunk = (id, obj) => async dispatch => {
	try {
		const res = await axios.put(
			`/api/orders/single/removeservice/${id}`,
			obj
		)
		const resp = await axios.get(`/api/orders/single/${id}`)
		dispatch(removeOrderService(resp.data))
	} catch (err) {
		console.error(err)
	}
}

/**
 * REDUCER
 */
export default function(state = singleOrder, action) {
	switch (action.type) {
		case GET_SINGLE_ORDER:
			return action.order
		case UPDATE_SINGLE_ORDER:
			return action.order
		case UPDATE_ORDER_DETAILS:
			return action.order
		case ADD_ORDER_SERVICE:
			return action.order
		case REMOVE_ORDER_SERVICE:
			return action.order
		default:
			return state
	}
}
