import MainLayout from '../../components/layout/MainLayout';
import React, { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { AlbumsApi, TAlbum } from '../../api/albums.api';
import { metaInfo } from '../../utils/meta';
import { Avatar, List, Pagination } from 'antd';
import { Pages, paginationStorage } from '../../utils/pagination';
import Link from 'next/link';
import { routes } from '../../utils/routes';

interface IProps {
  albums: TAlbum[];
}

const Index: NextPage<IProps> = ({ albums }) => {
  const [current, setCurrent] = useState(1);
  const onPageChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <MainLayout
      breadcrumbList={['Albums']}
      meta={{ title: metaInfo.albums, content: metaInfo.getMetadata('albums') }}
    >
      <List
        itemLayout='horizontal'
        dataSource={albums}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
              title={
                <Link href={routes.albums.concat('/', item.id.toString())}>
                  <a>{item.title}</a>
                </Link>
              }
            />
          </List.Item>
        )}
      />
      <Pagination
        current={current}
        onChange={onPageChange}
        responsive
        total={paginationStorage.totalItems(Pages.ALBUMS)}
      />
    </MainLayout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const albums = await AlbumsApi.getAlbums(
    paginationStorage.DEFAULT_PAGE,
    paginationStorage.itemsPerPage(Pages.ALBUMS)
  );
  return { props: { albums } };
};
