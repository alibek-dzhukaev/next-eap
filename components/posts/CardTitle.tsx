import { FC } from 'react';
import { Space, Typography } from 'antd';
import styles from './CardTitle.module.scss';

const { Text } = Typography;

interface IProps {
  title: string;
  id: number;
}

export const CardTitle: FC<IProps> = ({ title, id }) => (
  <Space>
    <Text code>{id}</Text>
    <Text className={styles.title}>{title}</Text>
  </Space>
);
