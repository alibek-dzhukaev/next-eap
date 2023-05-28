import MainLayout from '../../components/layout/MainLayout';
import { metaInfo } from '../../utils/meta';
import { GetStaticProps, NextPage } from 'next';
import { CommentsApi, TComment } from '../../api/comments.api';
import NestedComment from '../../components/comments/Comment';
import { Pagination } from 'antd';
import { Pages, paginationStorage } from '../../utils/pagination';
import { useState } from 'react';

interface IProps {
  comments: TComment[];
}

const Index: NextPage<IProps> = ({ comments }) => {
  const [current, setCurrent] = useState(1);
  const onPageChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <MainLayout
      breadcrumbList={['Comments']}
      meta={{
        title: metaInfo.comments,
        content: metaInfo.getMetadata('comments'),
      }}
    >
      {comments.map((it) => (
        <NestedComment key={it.id} author={it.name} content={it.body} />
      ))}
      <Pagination
        current={current}
        onChange={onPageChange}
        responsive
        total={paginationStorage.totalItems(Pages.COMMENTS)}
      />
    </MainLayout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const comments = await CommentsApi.getComments(
    paginationStorage.DEFAULT_PAGE,
    paginationStorage.itemsPerPage(Pages.COMMENTS)
  );
  return { props: { comments } };
};
