import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './users/user'
import emails from './google/emails'
import calendar from './google/calendar'
import contacts from './customers/contacts'
import singleemail from './google/singleemail'
import archivedOrders from './orders/archivedOrders'
import activeOrders from './orders/activeOrders'
import userorders from './users/userorders'
import customerorders from './customers/customerorders'
import singleorder from './orders/singleorder'
import dealers from './dealers/dealers'
import square from './square/square'
import singlecustomer from './customers/singlecustomer'
import services from './services/services'
import comments from './orders/comments'
import drivers from './drivers/drivers'
import users from './users/users'

const reducer = combineReducers({
	user,
	emails,
	calendar,
	contacts,
	singleemail,
	archivedOrders,
	activeOrders,
	userorders,
	singleorder,
	dealers,
	square,
	singlecustomer,
	services,
	comments,
	drivers,
	users,
	customerorders,
})

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './users/user'
