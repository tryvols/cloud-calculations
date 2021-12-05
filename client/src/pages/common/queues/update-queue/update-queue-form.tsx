import React, { FC, Fragment } from "react";
import { ValidTextInput } from "../../../../common/components/form-fields/valid-text-input";
import { useInject } from "../../../../common/ioc/ioc-provider";
import { UpdateQueueDataset, UpdateQueueDataset$ } from "./update-queue-dataset";

export const UpdateQueueForm: FC = () => {
  const dataset = useInject<UpdateQueueDataset>(UpdateQueueDataset$);

  return (
    <Fragment>
      <ValidTextInput
        label="Name"
        autoFocus
        defaultValue={dataset.name.value}
        validDataStore={dataset.name}
      />
      <ValidTextInput
        label="Address"
        defaultValue={dataset.address.value}
        validDataStore={dataset.address}
      />
    </Fragment>
  );
}