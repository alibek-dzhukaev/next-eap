import MainLayout from '../components/layout/MainLayout';
import { metaInfo } from '../utils/meta';
import { Typography } from 'antd';
import styles from '../styles/Home.module.scss';

const { Title, Text } = Typography;

const Home = () => {
  return (
    <MainLayout
      breadcrumbList={[]}
      meta={{ title: metaInfo.index, content: metaInfo.getMetadata('index') }}
    >
      <section className={styles.container}>
        <Title level={3}>Designed by me</Title>
        <Text type='success'>JSON Placeholder api</Text>
      </section>
    </MainLayout>
  );
};

export default Home;
