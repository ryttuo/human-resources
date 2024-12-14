import { forwardRef, Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { PrismaModule } from '../shared/prisma/prisma.module';

@Module({
  imports: [forwardRef(() => PrismaModule)],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
