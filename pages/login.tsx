import BaseLayout from '../components/layout/BaseLayout';
import NormalLoginForm from '../components/home/NormalLoginForm';
import { Typography } from 'antd';
import styles from '../styles/Login.module.scss';

const { Text } = Typography;

const Login = () => {
  return (
    <BaseLayout>
      <div className={styles.wrapper}>
        <Typography.Title level={4} className={styles.title}>
          <Text type='secondary'>Sign In</Text>
        </Typography.Title>
        <NormalLoginForm />
      </div>
    </BaseLayout>
  );
};

export default Login;
