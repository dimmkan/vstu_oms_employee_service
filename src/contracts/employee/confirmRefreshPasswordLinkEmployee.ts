import { IsNotEmpty, IsString } from 'class-validator';

export namespace ConfirmRefreshPasswordLinkEmployee {
  export const topic = 'employee.confirmrefreshpasswordlink.command';

  export class Request {
    @IsString()
    @IsNotEmpty()
    hash: string;
  }

  export class Response {
    success: boolean;
  }
}
