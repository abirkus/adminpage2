import React from 'react'
import {Table} from 'antd'
import columns from '../Table/HomeTableColumns'

const DefaultTable = props => {
	const array = props.ordersArray || []
	const pagination = props.pagination || false

	return (
		<Table
			scroll={{x: 'max-content'}}
			columns={columns}
			dataSource={array}
			pagination={pagination}
			size='small'
			rowKey='hash'
		/>
	)
}

export default DefaultTable
