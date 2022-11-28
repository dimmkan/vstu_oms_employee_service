import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/mailer.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [MailerModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
