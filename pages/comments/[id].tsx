import MainLayout from '../../components/layout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { CommentsApi, TComment } from '../../api/comments.api';

interface IProps {
  comment: TComment;
}

const Comment: NextPage<IProps> = ({ comment }) => {
  return (
    <MainLayout
      breadcrumbList={['Comments', comment.id.toString()]}
      meta={{
        title: comment.name,
        content: [comment.name, comment.email].join(' '),
      }}
    >
      cokmment
    </MainLayout>
  );
};

export default Comment;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  if (typeof id === 'string') {
    const comment = await CommentsApi.getComment(id);
    return { props: { comment } };
  }
  return { props: {} };
};
