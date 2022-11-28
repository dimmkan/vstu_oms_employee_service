import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQModule } from 'nestjs-rmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRMQConfig } from './configs/rmq.config';
import { EmployeeModule } from './employee/employee.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [ConfigModule.forRoot(), RMQModule.forRootAsync(getRMQConfig()), EmployeeModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
