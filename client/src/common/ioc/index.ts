import { Container } from 'inversify';
import { bindPages } from '../../pages/index.module';
import { commonModule } from './common.module';
import { queuesModule } from '../../pages/common/queues/index.module';

export const container = new Container();
container.load(commonModule);
container.load(queuesModule);
bindPages(container);
