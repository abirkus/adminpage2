import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateDealerThunk} from '../store/dealers.js'
import {Modal, Button, Form, Input} from 'antd'

const layout = {
	labelCol: {span: 8},
	wrapperCol: {span: 16},
}

const UpdateDealer = props => {
	const [form] = Form.useForm()
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const onFinish = values => {
		console.log(props)
		console.log('values inside modal', values)
		dispatch(updateDealerThunk(props.dealer.id, values))
		handleClose()
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Button type='primary' onClick={() => handleShow(true)}>
				Edit
			</Button>
			<Modal
				title={`${props.dealer.name}`}
				visible={show}
				footer={null}
				closable={false}>
				<Form
					{...layout}
					form={form}
					name='control-hooks'
					size='large'
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}>
					<Form.Item
						name='name'
						label='Dealer Name'
						initialValue={`${props.dealer.name}`}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='price'
						label='Service Price'
						initialValue={props.dealer.email}
						rules={[{required: true}]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='phoneNumber'
						label='Phone number'
						initialValue={props.dealer.phoneNumber}>
						<Input />
					</Form.Item>
					<Form.Item
						name='specialty'
						label='Specialty'
						initialValue={props.dealer.specialty || ''}>
						<Input />
					</Form.Item>
					<Form.Item
						name='location'
						label='Address'
						initialValue={props.dealer.location || ''}>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button
							htmlType='button'
							type='secondary'
							onClick={handleClose}>
							Cancel
						</Button>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default UpdateDealer
