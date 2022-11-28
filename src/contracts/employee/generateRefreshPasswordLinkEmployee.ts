import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export namespace GenerateRefreshPasswordLinkEmployee {
  export const topic = 'employee.generaterefreshpasswordlink.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    new_password: string;
  }

  export class Response {
    success: boolean;
  }
}
