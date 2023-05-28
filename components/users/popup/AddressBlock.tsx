import { TUser } from '../../../api/users.api';
import { FC } from 'react';
import styles from './Popup.module.scss';
import { Divider } from 'antd';

interface IProps {
  user: TUser;
}

export const AddressBlockClick: FC<IProps> = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.field}>
        <b>city:</b>
        {user.address.city}
      </span>
      <span className={styles.field}>
        <b>suite:</b>
        {user.address.suite}
      </span>
      <span className={styles.field}>
        <b>street:</b>
        {user.address.street}
      </span>
      <span className={styles.field}>
        <b>zipCode:</b>
        {user.address.zipcode}
      </span>
    </div>
  );
};

export const AddressBlockHover: FC<IProps> = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.field}>city</span>
        <span className={styles.field}>suite</span>
        <span className={styles.field}>street</span>
        <span className={styles.field}>zipCode</span>
      </div>
      <Divider />
      <p>Click to see full info</p>
    </>
  );
};
