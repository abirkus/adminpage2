import React from 'react'
import {Table} from 'antd'

const DefaultTable = props => {
	const array = props.ordersArray || []
	const cols = props.columns
	const pagination = props.pagination || false

	return (
		<Table
			scroll={{x: 'max-content'}}
			columns={cols}
			dataSource={array}
			pagination={pagination}
			size='small'
			rowKey='hash'
		/>
	)
}

export default DefaultTable
