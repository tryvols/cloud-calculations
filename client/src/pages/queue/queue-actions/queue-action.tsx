import React, { FC, ReactNode } from "react";
import { Button } from "@material-ui/core";

type QueueActionProps = Readonly<{
  label: string;
  color?: 'inherit' | 'secondary';
  icon?: ReactNode;
  className?: string;
  onClick: () => void;
}>;

export const QueueAction: FC<QueueActionProps> = (
  { label, color, className, icon, onClick }
) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      variant="outlined"
      startIcon={icon}
      color={color}
    >
      {label}
    </Button>
  );
}