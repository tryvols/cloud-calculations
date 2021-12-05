import React, { FC } from "react";
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import { QueueAction } from "./queue-action";

type ShowMoreActionProps = Readonly<{
  className?: string;
  loadMore(): void;
}>;

export const ShowMoreAction: FC<ShowMoreActionProps> = ({ className, loadMore }) => {
  return (
    <QueueAction
      label="Show more"
      icon={<LoopOutlinedIcon />}
      className={className}
      onClick={loadMore}
    />
  );
}