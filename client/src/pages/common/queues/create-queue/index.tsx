import React, { FC, Fragment } from "react";
import { CreateQueueForm } from "./create-queue-form";
import { useModalState } from "../../../../common/components/modals/use-modal-state";
import { AddFloatingButton } from "../../../../common/components/add-floating-button";
import { BaseDialog } from '../../../../common/components/modals/base-dialog';
import { useInject } from "../../../../common/ioc/ioc-provider";
import { ApiUtils } from "../../../../common/api/utils";
import { DatasetUtils } from "../../../../common/dataset";
import { CreateQueueDataset, CreateQueueDataset$ } from "./create-queue-dataset";
import { Notification } from "../../../../common/modals/notification";
import { QueueApi } from "../../../../common/api/entities/queue-api";

type CreateQueueProps = Readonly<{
  onReset: () => void;
}>;

export const CreateQueue: FC<CreateQueueProps> = ({ onReset }) => {
  const queueApi = useInject(QueueApi);
  const createQueueDataset = useInject<CreateQueueDataset>(CreateQueueDataset$);
  const { isModalOpen, openModal, closeModal } = useModalState();

  const createQueue = async () => {
    await ApiUtils.processRequest(async () => {
      await queueApi.create(DatasetUtils.serialize(createQueueDataset));
      Notification.success('Queue successfully created');
      closeModal();
      DatasetUtils.reset(createQueueDataset);
    });
    onReset();
  };

  return (
    <Fragment>
      <AddFloatingButton onClick={openModal} />
      <BaseDialog
        title="Create new queue"
        submitLabel="Add"
        open={isModalOpen}
        content={<CreateQueueForm />}
        onCancel={closeModal}
        onSubmit={createQueue}
      />
    </Fragment>
  );
}