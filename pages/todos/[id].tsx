import MainLayout from '../../components/layout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { TodosApi, TTodo } from '../../api/todos.api';

interface IProps {
  todo: TTodo;
}

const Todo: NextPage<IProps> = ({ todo }) => {
  return (
    <MainLayout
      breadcrumbList={['Todos', todo.id.toString()]}
      meta={{ title: todo.title, content: todo.title }}
    >
      todo
    </MainLayout>
  );
};

export default Todo;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id },
  } = context;

  if (typeof id === 'string') {
    const todo = await TodosApi.getTodo(id);
    return { props: { todo } };
  }
  return { props: {} };
};
