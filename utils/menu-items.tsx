import { GiPostStamp } from 'react-icons/gi';
import { AiOutlineComment, AiOutlineUserAdd } from 'react-icons/ai';
import { BiPhotoAlbum } from 'react-icons/bi';
import { MdOutlineMonochromePhotos } from 'react-icons/md';
import { FcTodoList } from 'react-icons/fc';
import { IconType } from 'react-icons';

type TMenuItem = {
  icon: IconType;
  title: string;
  path: string;
};

export const menuItems: Array<TMenuItem> = [
  {
    icon: GiPostStamp,
    title: 'Posts',
    path: '/posts',
  },
  {
    icon: AiOutlineComment,
    title: 'Comments',
    path: '/comments',
  },
  {
    icon: BiPhotoAlbum,
    title: 'Albums',
    path: '/albums',
  },
  {
    icon: MdOutlineMonochromePhotos,
    title: 'Photos',
    path: '/photos',
  },
  {
    icon: FcTodoList,
    title: 'Todos',
    path: '/todos',
  },
  {
    icon: AiOutlineUserAdd,
    title: 'Users',
    path: '/users',
  },
];
