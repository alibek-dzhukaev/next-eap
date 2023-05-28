import { FC } from 'react';
import { TUser } from '../../../api/users.api';
import { Divider } from 'antd';
import styles from './Popup.module.scss';

interface IProps {
  user: TUser;
}

export const EmailBlockHover: FC<IProps> = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.field}>email</span>
        <span className={styles.field}>phone</span>
        <span className={styles.field}>website</span>
      </div>
      <Divider />
      <p>Click to see full info</p>
    </>
  );
};

export const EmailBlockClick: FC<IProps> = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.field}>
        <b>email:</b>
        {user.email}
      </span>
      <span className={styles.field}>
        <b>phone:</b>
        {user.phone}
      </span>
      <span className={styles.field}>
        <b>website:</b>
        {user.website}
      </span>
    </div>
  );
};
