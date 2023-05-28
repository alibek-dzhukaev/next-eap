import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useState } from 'react';
import { TodosApi } from '../../api/todos.api';
import { FormTypes, TodoFormFields } from '../../utils/types';
import { todo } from '../../utils/todo';

const { Option } = Select;

const CreateTodo = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      const response: FormTypes<TodoFormFields> = await form.validateFields();
      if (response.errorFields) {
        throw new Error('todo form validation failed');
      }
      const body = todo.todoBodyForRequest(response);
      await TodosApi.createTodo(body);
      message.success('Todo created');
      handleCancel();
      form.resetFields();
    } catch (e) {
      throw e;
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Create todo
      </Button>
      <Modal
        title='Title'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='title'
                label='Title'
                rules={[{ required: true, message: 'Enter todo' }]}
              >
                <Input placeholder='What to do?' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='complete'
                label='Is completed?'
                initialValue={true}
                rules={[{ required: true, message: 'Choose complete state' }]}
              >
                <Select>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTodo;
