import MainLayout from '../../components/layout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { PostsApi, TPost } from '../../api/posts.api';
import { Card, Col, Pagination, Row } from 'antd';
import styles from '../../styles/Posts.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pages, paginationStorage } from '../../utils/pagination';
import { CardTitle } from '../../components/posts/CardTitle';
import { metaInfo } from '../../utils/meta';
import { useRouter } from 'next/router';
import { routes } from '../../utils/routes';

interface IProps {
  posts: TPost[];
}

const Index: NextPage<IProps> = ({ posts }) => {
  const router = useRouter();

  const [current, setCurrent] = useState(1);
  const onPageChange = async (page: number) => {
    setCurrent(page);

    const pageSize = paginationStorage.itemsPerPage(Pages.POSTS);
    const queries = paginationStorage.setPaginationQueries(
      (page - 1) * pageSize,
      pageSize
    );
    paginationStorage.setPagination(Pages.POSTS, queries);
    await router.push(routes.posts.concat(queries));
  };

  useEffect(() => {
    const query = paginationStorage.getPagination(Pages.POSTS);
    if (!query) return;
    router.push(routes.posts.concat(query)).then(() => {
      setCurrent(paginationStorage.extractCurrentPage(query));
    });
  }, []);

  return (
    <MainLayout
      breadcrumbList={['Posts']}
      meta={{ title: metaInfo.posts, content: metaInfo.getMetadata('posts') }}
    >
      <div className='site-card-wrapper'>
        <Row gutter={16}>
          {posts.map((it) => (
            <Link
              key={it.id}
              href={routes.posts.concat('/', it.id.toString())}
              passHref
            >
              <Col span={8} className={styles.card}>
                <Card
                  title={<CardTitle title={it.title} id={it.id} />}
                  bordered={false}
                >
                  {it.body}
                </Card>
              </Col>
            </Link>
          ))}
        </Row>
        <Pagination
          current={current}
          onChange={onPageChange}
          responsive
          total={paginationStorage.totalItems(Pages.POSTS)}
        />
      </div>
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { _start, _limit },
  } = context;
  let posts: TPost[];

  if (_start && _limit) {
    posts = await PostsApi.getPosts(Number(_start), Number(_limit));
  } else {
    posts = await PostsApi.getPosts(
      paginationStorage.DEFAULT_PAGE,
      paginationStorage.itemsPerPage(Pages.POSTS)
    );
  }
  return { props: { posts } };
};
