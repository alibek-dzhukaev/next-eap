import { Button, Col, Drawer, Form, Input, message, Row, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FormTypes, UserFormFields } from '../../utils/types';
import { UsersApi } from '../../api/users.api';
import { user } from '../../utils/user';

const CreateUserDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSubmit = async () => {
    try {
      const response: FormTypes<UserFormFields> = await form.validateFields();
      if (response.errorFields) {
        throw new Error('user form validation failed');
      }
      const body = user.userBodyForRequest(response);
      const data = await UsersApi.createUser(body);
      message.success(data.message);
      onClose();
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        New user
      </Button>
      <Drawer
        title='Create a new user'
        width={'60vw'}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} type='primary'>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder='Please enter user name' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='username'
                label='Username'
                rules={[{ required: true, message: 'Please enter username' }]}
              >
                <Input placeholder='Please enter username' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='email'
                label='Email'
                rules={[{ required: true, message: 'Please enter email' }]}
              >
                <Input type='email' placeholder='Please enter your email' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name='address_street'
                label='Street'
                rules={[{ required: true, message: 'Please enter street' }]}
              >
                <Input placeholder='Please enter street' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name='address_suite'
                label='Suit'
                rules={[{ required: true, message: 'Please enter suit' }]}
              >
                <Input placeholder='Please enter suit' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name='address_city'
                label='City'
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input placeholder='Please enter city' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name='address_zipcode'
                label='Zipcode'
                rules={[
                  { required: true, message: 'Please enter the zipcode' },
                ]}
              >
                <Input placeholder='Please enter the zipcode' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='phone'
                label='Phone'
                rules={[
                  { required: true, message: 'Please enter phone number' },
                  { len: 12, message: 'Length must be 12' },
                ]}
              >
                <Input placeholder='Please enter phone number' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='website'
                label='Url'
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  addonBefore='https://'
                  addonAfter='.com'
                  placeholder='Please enter url'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name='company_name'
                label='Company name'
                rules={[
                  { required: true, message: 'Please enter company name' },
                ]}
              >
                <Input placeholder='Please enter company name' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='company_catchPhrase'
                label='Catch Phrase'
                rules={[
                  {
                    required: true,
                    message: 'please enter catch phrase',
                  },
                ]}
              >
                <Input placeholder='Please enter catch phrase' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name='company_bs'
                label='BS'
                rules={[
                  {
                    required: true,
                    message: 'please enter bs',
                  },
                ]}
              >
                <Input placeholder='Please enter bs' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateUserDrawer;
