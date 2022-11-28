import { IsBase64, IsNumber, IsString } from 'class-validator';

export namespace EmployeeSetAvatar {
  export const topic = 'employee.setavatar.query';

  export class Request {
    @IsNumber()
    id: number;

    @IsBase64()
    avatar: string;

    @IsString()
    filename: string;
  }

  export class Response {
    avatar_id: string;
  }
}
