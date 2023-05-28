import { GetServerSideProps, NextPage } from 'next';
import { AlbumsApi, TAlbum } from '../../api/albums.api';
import { Avatar, Card } from 'antd';
import MainLayout from '../../components/layout/MainLayout';

const { Meta } = Card;

interface IProps {
  album: TAlbum;
}

const Album: NextPage<IProps> = ({ album }) => {
  return (
    <MainLayout
      breadcrumbList={['Albums', album.id.toString()]}
      meta={{ title: album.title, content: album.title }}
    >
      <Card>
        <Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title={album.title}
          description={album.title}
        />
      </Card>
    </MainLayout>
  );
};

export default Album;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  if (typeof id === 'string') {
    const album = await AlbumsApi.getAlbum(id);
    return { props: { album } };
  }
  return { props: {} };
};
