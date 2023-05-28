import BaseLayout from '../components/layout/BaseLayout';
import RegistrationForm from '../components/home/RegistrationForm';
import styles from '../styles/Login.module.scss';
import { Typography } from 'antd';

const { Text } = Typography;

const Registration = () => {
  return (
    <BaseLayout>
      <div className={styles.wrapper}>
        <Typography.Title level={4} className={styles.title}>
          <Text type='secondary'>Sign up</Text>
        </Typography.Title>
        <RegistrationForm />
      </div>
    </BaseLayout>
  );
};

export default Registration;
