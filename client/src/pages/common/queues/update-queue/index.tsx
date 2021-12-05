import React, { FC, Fragment } from "react";
import { Button } from "@material-ui/core";
import { UpdateQueueForm } from "./update-queue-form";
import { useModalState } from "../../../../common/components/modals/use-modal-state";
import { BaseDialog } from "../../../../common/components/modals/base-dialog";
import { useInject } from "../../../../common/ioc/ioc-provider";
import { ApiUtils } from "../../../../common/api/utils";
import { DatasetUtils } from "../../../../common/dataset";
import { Notification } from "../../../../common/modals/notification";
import { UpdateQueueDataset, UpdateQueueDataset$ } from "./update-queue-dataset";
import { useObserver } from "mobx-react";
import { useOnMount } from "../../../../common/hooks/use-on-mount";
import { QueuePayload } from "../../../../common/api/types";
import { QueueApi } from "../../../../common/api/entities/queue-api";

type UpdateQueueProps = Readonly<{
  queue: QueuePayload;
  onReset: () => void;
}>;

export const UpdateQueue: FC<UpdateQueueProps> = ({ queue, onReset }) => {
  const queueApi = useInject(QueueApi);
  const updateQueueDataset = useInject<UpdateQueueDataset>(UpdateQueueDataset$);
  const { isModalOpen, openModal, closeModal } = useModalState();

  const updateQueue = async () => {
    ApiUtils.processRequest(async () => {
      await queueApi.update(queue.id, DatasetUtils.serialize(updateQueueDataset));
      Notification.success('Queue successfully updated');
      onReset();
      closeModal();
      DatasetUtils.reset(updateQueueDataset);
    });
  };

  useOnMount(async () => {
    console.log('here');
  });

  return useObserver(() => {
    updateQueueDataset.name.set(queue.name);
    updateQueueDataset.address.set(queue.address);

    return (
      <Fragment>
        <Button
          size="small"
          color="primary"
          onClick={openModal}
        >
          Edit
        </Button>
        <BaseDialog
          title="Update queue"
          submitLabel="Save"
          open={isModalOpen}
          content={<UpdateQueueForm />}
          onCancel={closeModal}
          onSubmit={updateQueue}
        />
      </Fragment>
    );
  });
}