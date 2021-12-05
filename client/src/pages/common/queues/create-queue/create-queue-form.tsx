import React, { FC, Fragment } from "react";
import { ValidTextInput } from "../../../../common/components/form-fields/valid-text-input";
import { useInject } from "../../../../common/ioc/ioc-provider";
import { CreateQueueDataset, CreateQueueDataset$ } from "./create-queue-dataset";
import { ValidDateField } from "../../../../common/components/form-fields/valid-date-field";
import { ValidNumericInput } from "../../../../common/components/form-fields/valid-numeric-input";

const day = 1000 * 60 * 60 * 24;

export const CreateQueueForm: FC = () => {
  const dataset = useInject<CreateQueueDataset>(CreateQueueDataset$);

  return (
    <Fragment>
      <ValidTextInput
        label="Name"
        autoFocus
        validDataStore={dataset.name}
      />
      <ValidTextInput
        label="Address"
        validDataStore={dataset.address}
      />
      <ValidDateField
        required={false}
        minDate={new Date(Date.now() + day)}
        label="Expires at"
        validDataStore={dataset.expiresAt}
      />
      <ValidNumericInput
        required={false}
        label="Max queue volume"
        validDataStore={dataset.maxVolume}
      />
    </Fragment>
  );
}