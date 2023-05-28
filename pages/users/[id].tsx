import { GetServerSideProps, NextPage } from 'next';
import { TUser, UsersApi } from '../../api/users.api';
import { Descriptions } from 'antd';
import MainLayout from '../../components/layout/MainLayout';
import { metaInfo } from '../../utils/meta';

const { Item } = Descriptions;

interface IProps {
  user: TUser;
}

const User: NextPage<IProps> = ({ user }) => {
  return (
    <MainLayout
      breadcrumbList={['Users', user.id.toString()]}
      meta={{
        title: metaInfo.users,
        content: [user.name, user.username, user.email].join(' '),
      }}
    >
      <Descriptions title={user.name} layout='vertical' bordered>
        <Item label='Name'>{user.name}</Item>
        <Item label='Username'>{user.username}</Item>
        <Item label='Email'>{user.email}</Item>
        <Item label='Phone'>{user.phone}</Item>
        <Item label='Website'>{user.website}</Item>
      </Descriptions>
      <Descriptions title='Address' layout='vertical' bordered>
        <Item label='Street'>{user.address.street}</Item>
        <Item label='Suite'>{user.address.suite}</Item>
        <Item label='City'>{user.address.city}</Item>
        <Item label='Zip Code'>{user.address.zipcode}</Item>
      </Descriptions>
      <Descriptions title='Company' layout='vertical' bordered>
        <Item label='Street'>{user.company.name}</Item>
        <Item label='Bs'>{user.company.bs}</Item>
        <Item label='Catch Phrase'>{user.company.catchPhrase}</Item>
      </Descriptions>
    </MainLayout>
  );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  if (typeof id === 'string') {
    const user = await UsersApi.getUser(id);
    return { props: { user } };
  }
  return { props: {} };
};
