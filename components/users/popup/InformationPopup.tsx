import { Popover } from 'antd';
import React, { FC, useState } from 'react';
import { IconType } from 'react-icons';

interface IProps {
  icon: IconType;
  title: string;
  data: TPopupData;
}

type TPopupData = {
  hoverContent: React.ReactNode;
  clickContent: React.ReactNode;
};

const InformationPopup: FC<IProps> = ({ icon, title, data }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const hide = () => {
    setClicked(false);
    setHovered(false);
  };

  const handleHoverChange = (visible: boolean) => {
    setClicked(false);
    setHovered(visible);
  };
  const handleClickChange = (visible: boolean) => {
    setClicked(visible);
    setHovered(false);
  };

  return (
    <Popover
      style={{ width: 500 }}
      content={data.hoverContent}
      title={title}
      trigger='hover'
      visible={hovered}
      onVisibleChange={handleHoverChange}
    >
      <Popover
        content={
          <div>
            {data.clickContent}
            <a onClick={hide}>Close</a>
          </div>
        }
        title={title}
        trigger='click'
        visible={clicked}
        onVisibleChange={handleClickChange}
      >
        {React.createElement(icon)}
      </Popover>
    </Popover>
  );
};

export default InformationPopup;
