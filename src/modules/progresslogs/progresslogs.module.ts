import { Module } from '@nestjs/common';
import { ProgresslogsService } from './progresslogs.service';
import { PrismaService } from 'src/core/services/prisma.service';

@Module({
  providers: [ProgresslogsService , PrismaService],
  exports : [ProgresslogsService] , 

})
export class ProgresslogsModule {}
