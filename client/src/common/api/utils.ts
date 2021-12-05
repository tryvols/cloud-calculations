import { IValidDataset } from "../dataset/types";
import { DatasetUtils } from "../dataset";
import { Notification } from "../modals/notification";

function processError(error: any, dataset?: IValidDataset<any>): void {
  const message = error?.response?.data?.message;

  if (!message) {
    Notification.error('Unknown server error!');
    return;
  }

  if (!Array.isArray(message)) {
    Notification.error(message);
    return;
  }

  message?.forEach((message: any) => {
    const [errorMessage] = Object.values(message.constraints) as string[];

    if (dataset && message.property in dataset) {
      dataset[message.property].setError(errorMessage);
    } else {
      Notification.error(errorMessage);
    }
  });
}

type Callback = () => Promise<void>;

export class ApiUtils {
  static async processRequest(callback: Callback): Promise<void>;
  static async processRequest(dataset: IValidDataset<any>, callback: Callback): Promise<void>;
  static async processRequest(first: any, second?: Callback): Promise<void> {
    const callback: Callback = second ?? first;
    const dataset: IValidDataset<any> | undefined = second ? first : undefined;

    if (dataset && !DatasetUtils.isValid(dataset)) {
      return;
    }
  
    try {
      await callback();
    } catch(e) {
      console.log(e);
      processError(e, dataset);
    }
  }
}
