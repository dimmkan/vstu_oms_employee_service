import { IsEmail } from 'class-validator';

export namespace ValidateEmployeeEmail {
  export const topic = 'employee.validateemail.command';

  export class Request {
    @IsEmail()
    email: string;
  }

  export class Response {
    validate: boolean;
  }
}
