import { IsNumber } from 'class-validator';

export namespace EmployeeGetAvatar {
  export const topic = 'employee.getavatar.query';

  export class Request {
    @IsNumber()
    id: number;
  }

  export class Response {
    avatar_id: string;
  }
}
