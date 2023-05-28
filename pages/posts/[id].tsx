import { GetServerSideProps, NextPage } from 'next';
import { PostsApi, TPost } from '../../api/posts.api';
import { Card, Image } from 'antd';
import MainLayout from '../../components/layout/MainLayout';
import styles from '../../styles/Posts.module.scss';

const { Meta } = Card;

interface IProps {
  post: TPost;
}

const Post: NextPage<IProps> = ({ post }) => {
  return (
    <MainLayout
      breadcrumbList={['Posts', post.id.toString()]}
      meta={{ title: `Post ${post.id}`, content: post.title }}
    >
      <article className={styles.post}>
        <Card
          hoverable
          style={{ width: 'auto', maxWidth: 400 }}
          cover={
            <Image
              alt='example'
              src={'https://source.unsplash.com/random/200x200?sig='.concat(
                post.id.toString()
              )}
            />
          }
        >
          <Meta title={post.title} description={post.body} />
        </Card>
      </article>
    </MainLayout>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  if (typeof id === 'string') {
    const post = await PostsApi.getPost(id);
    return { props: { post } };
  }
  return { props: {} };
};
