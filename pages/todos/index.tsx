import React, { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { GetServerSideProps, NextPage } from 'next';
import { TodosApi, TTodo } from '../../api/todos.api';
import { metaInfo } from '../../utils/meta';
import { Collapse, Pagination } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import cn from 'classnames';
import styles from '../../styles/Todos.module.scss';
import { Pages, paginationStorage } from '../../utils/pagination';
import { useRouter } from 'next/router';
import { routes } from '../../utils/routes';
import CreateTodo from '../../components/todos/CreateTodo';

const { Panel } = Collapse;

function callback(key: any) {
  console.log(key);
}

interface IProps {
  todos: TTodo[];
}

const genExtra = () => (
  <SettingOutlined
    onClick={(event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

const Index: NextPage<IProps> = ({ todos }) => {
  const router = useRouter();

  const [current, setCurrent] = useState(1);
  const onPageChange = async (page: number) => {
    setCurrent(page);

    const pageSize = paginationStorage.itemsPerPage(Pages.TODOS);
    const queries = paginationStorage.setPaginationQueries(
      (page - 1) * pageSize,
      pageSize
    );
    paginationStorage.setPagination(Pages.TODOS, queries);
    await router.push(routes.todos.concat(queries));
  };

  useEffect(() => {
    const query = paginationStorage.getPagination(Pages.TODOS);
    if (!query) return;
    router.push(routes.todos.concat(query)).then(() => {
      setCurrent(paginationStorage.extractCurrentPage(query));
    });
  }, []);

  return (
    <MainLayout
      breadcrumbList={['Todos']}
      meta={{ title: metaInfo.todos, content: metaInfo.getMetadata('todos') }}
    >
      <CreateTodo />
      <Collapse
        defaultActiveKey={['1']}
        onChange={callback}
        expandIconPosition='left'
        accordion
      >
        {todos.map((it) => (
          <Panel header={it.title} key={it.id} extra={genExtra()}>
            <div
              className={cn({
                [styles.complete]: it.completed,
                [styles.incomplete]: !it.completed,
              })}
            >
              <div className={styles.todo}>
                <span className={styles.id}>{it.id}</span>
                {it.title}
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>
      <Pagination
        className={styles.pagination}
        current={current}
        onChange={onPageChange}
        responsive
        total={paginationStorage.totalItems(Pages.TODOS)}
      />
    </MainLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { _start, _limit },
  } = context;
  let todos: TTodo[];

  if (_start && _limit) {
    todos = await TodosApi.getTodos(Number(_start), Number(_limit));
  } else {
    todos = await TodosApi.getTodos(
      paginationStorage.DEFAULT_PAGE,
      paginationStorage.itemsPerPage(Pages.TODOS)
    );
  }
  return { props: { todos } };
};
