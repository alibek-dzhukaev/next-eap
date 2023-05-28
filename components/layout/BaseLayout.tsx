import React, { FC } from 'react';
import { Layout } from 'antd';
import styles from './Layout.module.scss';

const { Content, Header, Footer, Sider } = Layout;

const BaseLayout: FC = ({ children }) => {
  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.header}>
        <img
          className={styles.header__image}
          src='https://bit.ly/35pCgka'
          alt='header'
        />
      </Header>
      <Layout hasSider className={styles.inner_layout}>
        <Sider className={styles.sider}>
          <img
            className={styles.sider__image_left}
            src='https://bit.ly/3s5gJVE'
            alt='sider'
          />
        </Sider>
        <Content className={styles.content}>{children}</Content>
        <Sider className={styles.sider}>
          <img
            className={styles.sider__image_right}
            src='https://bit.ly/3s5gJVE'
            alt='sider'
          />
        </Sider>
      </Layout>
    </Layout>
  );
};

function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);
  return isClient;
}
const ParentComponent: FC = ({ children }) => {
  const isClient = useIsClient();
  return <>{isClient && <BaseLayout>{children}</BaseLayout>}</>;
};
export default ParentComponent;
