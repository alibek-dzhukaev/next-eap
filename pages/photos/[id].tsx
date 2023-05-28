import { GetServerSideProps, NextPage } from 'next';
import { PhotosApi, TPhoto } from '../../api/photos.api';
import MainLayout from '../../components/layout/MainLayout';
import { Avatar, Card, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from '../../styles/Photos.module.scss';

const { Meta } = Card;

interface IProps {
  photo: TPhoto;
}

const Photo: NextPage<IProps> = ({ photo }) => {
  return (
    <MainLayout
      breadcrumbList={['Photos', photo.id.toString()]}
      meta={{ title: photo.title, content: Object.keys(photo).join(' ') }}
    >
      <article className={styles.container}>
        <Card
          style={{ width: 300 }}
          cover={<Image alt={photo.title} src={photo.url} />}
          actions={[
            <SettingOutlined key='setting' />,
            <EditOutlined key='edit' />,
            <EllipsisOutlined key='ellipsis' />,
          ]}
        >
          <Meta
            avatar={<Avatar src={photo.thumbnailUrl} />}
            title={photo.title}
            description={'Album ID: ' + photo.albumId}
          />
        </Card>
      </article>
    </MainLayout>
  );
};

export default Photo;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  if (typeof id === 'string') {
    const photo = await PhotosApi.getPhoto(id);
    return { props: { photo } };
  }
  return { props: {} };
};
