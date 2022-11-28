import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
  ConfirmRefreshPasswordLinkEmployee,
  EmployeeDeleteAvatar,
  EmployeeGetAvatar,
  EmployeeGetInfo,
  EmployeeSetAvatar,
  EmployeeUpdateInfo,
  GenerateRefreshPasswordLinkEmployee,
  ValidateEmployeeEmail,
} from 'src/contracts';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @RMQRoute(EmployeeGetInfo.topic)
  @RMQValidate()
  async getEmployeeInfo(
    @Body() { id }: EmployeeGetInfo.Request,
  ): Promise<EmployeeGetInfo.Response> {
    return this.employeeService.getEmployeeInfo(id);
  }

  @RMQRoute(EmployeeUpdateInfo.topic)
  @RMQValidate()
  async updateEmployeeInfo(
    @Body() dto: EmployeeUpdateInfo.Request,
  ): Promise<EmployeeUpdateInfo.Response> {
    return this.employeeService.updateEmployeeInfo(dto);
  }

  @RMQRoute(EmployeeGetAvatar.topic)
  @RMQValidate()
  async getEmployeeAvatar(
    @Body() { id }: EmployeeGetAvatar.Request,
  ): Promise<EmployeeGetAvatar.Response> {
    return this.employeeService.getEmployeeAvatar(id);
  }

  @RMQRoute(EmployeeSetAvatar.topic)
  @RMQValidate()
  async setEmployeeAvatar(
    @Body() dto: EmployeeSetAvatar.Request,
  ): Promise<EmployeeSetAvatar.Response> {
    return this.employeeService.setEmployeeAvatar(dto);
  }

  @RMQRoute(EmployeeDeleteAvatar.topic)
  @RMQValidate()
  async deleteEmployeeAvatar(
    @Body() { id }: EmployeeDeleteAvatar.Request,
  ): Promise<EmployeeDeleteAvatar.Response> {
    return this.employeeService.deleteEmployeeAvatar(id);
  }

  @RMQRoute(ValidateEmployeeEmail.topic)
  @RMQValidate()
  async validateEmployeeEmail(
    @Body() { email }: ValidateEmployeeEmail.Request,
  ): Promise<ValidateEmployeeEmail.Response> {
    return this.employeeService.validateEmployeeEmail(email);
  }

  @RMQRoute(GenerateRefreshPasswordLinkEmployee.topic)
  @RMQValidate()
  async generateRefreshPasswordLink(
    @Body()
    { email, new_password }: GenerateRefreshPasswordLinkEmployee.Request,
  ): Promise<GenerateRefreshPasswordLinkEmployee.Response> {
    return this.employeeService.generateRefreshPasswordLink(
      email,
      new_password,
    );
  }

  @RMQRoute(ConfirmRefreshPasswordLinkEmployee.topic)
  @RMQValidate()
  async confirmRefreshPasswordLink(
    @Body() { hash }: ConfirmRefreshPasswordLinkEmployee.Request,
  ): Promise<ConfirmRefreshPasswordLinkEmployee.Response> {
    return this.employeeService.confirmRefreshPasswordLink(hash);
  }
}
