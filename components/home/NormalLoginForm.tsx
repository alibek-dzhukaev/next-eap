import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import styles from './Home.module.scss';
import { LoginFormFields } from '../../utils/types';
import { AuthAPi } from '../../api/auth.api';
import Link from 'next/link';
import { routes } from '../../utils/routes';

const NormalLoginForm = () => {
  const onFinish = (values: LoginFormFields) => {
    return AuthAPi.login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className={styles.form}>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email address'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className='login-form-forgot' href=''>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
          {' Or '}
          <Link href={routes.registration}>
            <a>register now!</a>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NormalLoginForm;
