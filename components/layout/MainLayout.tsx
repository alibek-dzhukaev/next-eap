import React, { FC } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { menuItems } from '../../utils/menu-items';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { routes } from '../../utils/routes';
import Head from 'next/head';

const { Header, Content, Footer, Sider } = Layout;

type TMeta = {
  title: string;
  content: string;
};

interface IProps {
  breadcrumbList: string[];
  meta: TMeta;
}

const MainLayout: React.FC<IProps> = ({
  children,
  breadcrumbList = [],
  meta,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <link
          rel='icon'
          type='image/x-icon'
          href='./../../public/favicon.ico'
        />
        <title>{meta.title}</title>
        <meta name='keywords' content={meta.content} />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className='header'>
          <div className='logo' />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {['Home', ...breadcrumbList].map((it) => (
              <Breadcrumb.Item key={it}>
                <Link href={routes.setBreadcrumbRoute(it)}>
                  <a>{it}</a>
                </Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <Layout
            className='site-layout-background'
            style={{ padding: '24px 0' }}
          >
            <Sider className='site-layout-background' width={200}>
              <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                selectedKeys={[router.pathname]}
                style={{ height: '100%' }}
              >
                {menuItems.map((it) => (
                  <Menu.Item key={it.path} icon={React.createElement(it.icon)}>
                    <Link href={it.path}>
                      <a>{it.title}</a>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          JSONPlaceholder ©{new Date().getFullYear()} Designed by @alibek
        </Footer>
      </Layout>
    </>
  );
};

function useIsClient() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);
  return isClient;
}
const ParentComponent: FC<{ breadcrumbList: string[]; meta: TMeta }> = ({
  children,
  breadcrumbList,
  meta,
}) => {
  const isClient = useIsClient();
  return (
    <>
      {isClient && (
        <MainLayout breadcrumbList={breadcrumbList} meta={meta}>
          {children}
        </MainLayout>
      )}
    </>
  );
};
export default ParentComponent;
