import React, {useEffect} from 'react'
import {Table} from 'antd'
import columns from '../Table/TableForDetailers'
import {useSelector, useDispatch} from 'react-redux'
import {getDetailerOrdersThunk} from '../../store/activeOrders'

const TableByDetailer = () => {
	const dispatch = useDispatch()
	const orders = useSelector(state => state.activeOrders)

	useEffect(() => {
		dispatch(getDetailerOrdersThunk())
	}, [])

	return (
		<Table
			scroll={{x: 'max-content'}}
			columns={columns}
			dataSource={orders}
			pagination={false}
			size='small'
			rowKey='hash'
		/>
	)
}

export default TableByDetailer
