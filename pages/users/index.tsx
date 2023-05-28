import MainLayout from '../../components/layout/MainLayout';
import { GetStaticProps, NextPage } from 'next';
import { TUser, UsersApi } from '../../api/users.api';
import UserCard from '../../components/users/UserCard';
import { Col, Row, Space } from 'antd';
import { metaInfo } from '../../utils/meta';
import CreateUserDrawer from '../../components/users/CreateUser';

interface IProps {
  users: TUser[];
}

const Index: NextPage<IProps> = ({ users }) => {
  return (
    <MainLayout
      breadcrumbList={['Users']}
      meta={{ title: metaInfo.users, content: metaInfo.getMetadata('user') }}
    >
      <Space direction='vertical'>
        <CreateUserDrawer />
        <Row gutter={[8, 24]}>
          {users.map((it) => (
            <Col key={it.id} span={6}>
              <UserCard user={it} />
            </Col>
          ))}
        </Row>
      </Space>
    </MainLayout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async (context) => {
  const users = await UsersApi.getUsers();
  return { props: { users } };
};
