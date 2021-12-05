import React, { FC, Fragment } from "react";
import { useModalState } from "../../../../common/components/modals/use-modal-state";
import { Button } from "@material-ui/core";
import { BaseAlert } from "../../../../common/components/modals/base-alert";
import { ApiUtils } from "../../../../common/api/utils";
import { useInject } from "../../../../common/ioc/ioc-provider";
import { Notification } from "../../../../common/modals/notification";
import { QueueApi } from "../../../../common/api/entities/queue-api";

type DeleteQueueProps = Readonly<{
  id: number;
  onReset: () => void;
}>;

export const DeleteQueue: FC<DeleteQueueProps> = ({ id, onReset }) => {
  const queueApi = useInject(QueueApi);
  const { isModalOpen, openModal, closeModal } = useModalState();

  const deleteQueue = async () => {
    ApiUtils.processRequest(async () => {
      await queueApi.delete(id);
      Notification.success('Queue successfully deleted');
      onReset();
      closeModal();
    });
  };

  return (
    <Fragment>
      <Button
        size="small"
        color="secondary"
        onClick={openModal}
      >
        Delete
      </Button>
      <BaseAlert
        title="Delete this queue?"
        open={isModalOpen}
        description="If you will delete this queue, you cannot recover it."
        onCancel={closeModal}
        onSubmit={deleteQueue}
      />
    </Fragment>
  );
}