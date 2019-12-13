import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import emails from './emails'
import calendar from './calendar'
import contacts from './contacts'
import singleemail from './singleemail'
import orders from './orders'
import userorders from './userorders'

const reducer = combineReducers({
	user,
	emails,
	calendar,
	contacts,
	singleemail,
	orders,
	userorders,
})

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
