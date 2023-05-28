import { TUser } from '../../../api/users.api';
import { FC } from 'react';
import styles from './Popup.module.scss';

interface IProps {
  user: TUser;
}

export const CompanyBlockHover: FC<IProps> = ({ user }) => {
  return (
    <>
      <div className={styles.wrapper}>
        {Object.keys(user.company).map((key) => (
          <span className={styles.field} key={key}>
            {key}
          </span>
        ))}
      </div>
    </>
  );
};

export const CompanyBlockClick: FC<IProps> = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      {Object.entries(user.company).map(([key, value]) => (
        <span className={styles.field} key={key}>
          <b>{key}:</b>
          {value}
        </span>
      ))}
    </div>
  );
};
