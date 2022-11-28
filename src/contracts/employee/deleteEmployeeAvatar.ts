import { IsNotEmpty, IsNumber } from 'class-validator';

export namespace EmployeeDeleteAvatar {
  export const topic = 'employee.deleteavatar.query';

  export class Request {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  }

  export class Response {
    success: boolean;
  }
}
