import React from "react";

export const useDrawerState = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return {
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  };
}
