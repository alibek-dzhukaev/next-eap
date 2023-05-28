import { FC } from 'react';
import { TUser } from '../../api/users.api';
import { Avatar, Card, Image } from 'antd';
import Link from 'next/link';
import styles from '../../styles/Users.module.scss';
import { FaRegAddressBook } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiOutlineBank } from 'react-icons/ai';
import InformationPopup from './popup/InformationPopup';
import { AddressBlockClick, AddressBlockHover } from './popup/AddressBlock';
import { CompanyBlockClick, CompanyBlockHover } from './popup/CompanyBlock';
import { EmailBlockClick, EmailBlockHover } from './popup/EmailBlock';
import { routes } from '../../utils/routes';

const { Meta } = Card;

interface IProps {
  user: TUser;
}

const UserCard: FC<IProps> = ({ user }) => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <Image
          alt={user.username}
          src={'https://source.unsplash.com/random/200x200?sig='.concat(
            user.id.toString()
          )}
        />
      }
      actions={[
        <InformationPopup
          icon={FaRegAddressBook}
          key='address'
          title='Address'
          data={{
            hoverContent: <AddressBlockHover user={user} />,
            clickContent: <AddressBlockClick user={user} />,
          }}
        />,
        <InformationPopup
          icon={AiOutlineBank}
          key='company'
          title='Company'
          data={{
            clickContent: <CompanyBlockClick user={user} />,
            hoverContent: <CompanyBlockHover user={user} />,
          }}
        />,
        <InformationPopup
          icon={MdOutlineAlternateEmail}
          key='contacts'
          title='Contacts'
          data={{
            clickContent: <EmailBlockClick user={user} />,
            hoverContent: <EmailBlockHover user={user} />,
          }}
        />,
      ]}
    >
      <Meta
        avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
        title={
          <Link passHref href={routes.setUserRoute(user.id)}>
            <span className={styles.link}>{user.username}</span>
          </Link>
        }
        description={
          <Link passHref href={routes.setUserRoute(user.id)}>
            <span className={styles.link}>{user.name}</span>
          </Link>
        }
      />
    </Card>
  );
};

export default UserCard;
