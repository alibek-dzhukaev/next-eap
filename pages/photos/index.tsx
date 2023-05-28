import MainLayout from '../../components/layout/MainLayout';
import { Avatar, List, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { PhotosApi, TPhoto } from '../../api/photos.api';
import { metaInfo } from '../../utils/meta';
import { Pages, paginationStorage } from '../../utils/pagination';
import Link from 'next/link';
import { routes } from '../../utils/routes';
import styles from '../../styles/Todos.module.scss';
import { useRouter } from 'next/router';

interface IProps {
  photos: TPhoto[];
}

const Index: NextPage<IProps> = ({ photos }) => {
  const router = useRouter();

  const [current, setCurrent] = useState(1);
  const onPageChange = async (page: number) => {
    setCurrent(page);

    const pageSize = paginationStorage.itemsPerPage(Pages.PHOTOS);
    const queries = paginationStorage.setPaginationQueries(
      (page - 1) * pageSize,
      pageSize
    );
    paginationStorage.setPagination(Pages.PHOTOS, queries);
    await router.push(routes.photos.concat(queries));
  };

  useEffect(() => {
    const query = paginationStorage.getPagination(Pages.PHOTOS);
    if (!query) return;
    router.push(routes.photos.concat(query)).then(() => {
      setCurrent(paginationStorage.extractCurrentPage(query));
    });
  }, []);

  return (
    <MainLayout
      breadcrumbList={['Photos']}
      meta={{ title: metaInfo.photos, content: metaInfo.getMetadata('photos') }}
    >
      <List
        itemLayout='horizontal'
        dataSource={photos}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.thumbnailUrl} />}
              title={
                <Link href={routes.photos.concat('/', item.id.toString())}>
                  <a>{item.title}</a>
                </Link>
              }
              description='Hover to see photo'
            />
          </List.Item>
        )}
      />
      <Pagination
        className={styles.pagination}
        current={current}
        onChange={onPageChange}
        responsive
        total={paginationStorage.totalItems(Pages.PHOTOS)}
      />
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { _start, _limit },
  } = context;
  let photos: TPhoto[];

  if (_start && _limit) {
    photos = await PhotosApi.getPhotos(Number(_start), Number(_limit));
  } else {
    photos = await PhotosApi.getPhotos(
      paginationStorage.DEFAULT_PAGE,
      paginationStorage.itemsPerPage(Pages.PHOTOS)
    );
  }
  return { props: { photos } };
};
