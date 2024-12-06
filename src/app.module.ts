import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { ProgresslogsController } from './modules/progresslogs/progresslogs.controller';
import { ProgresslogsModule } from './modules/progresslogs/progresslogs.module';


@Module({
  imports: [
    CoreModule,
    ProgresslogsModule,
  ],
  controllers: [ProgresslogsController],
})
export class AppModule {}
