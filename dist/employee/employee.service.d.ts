import { EmployeeGetAvatar, EmployeeGetInfo, EmployeeUpdateInfo, EmployeeSetAvatar, EmployeeDeleteAvatar, ValidateEmployeeEmail, GenerateRefreshPasswordLinkEmployee, ConfirmRefreshPasswordLinkEmployee } from 'src/contracts';
import { MailerService } from 'src/mailer/mailer.service';
export declare class EmployeeService {
    private readonly mailerService;
    directus: any;
    constructor(mailerService: MailerService);
    getEmployeeInfo(id: number): Promise<EmployeeGetInfo.Response>;
    updateEmployeeInfo(dto: EmployeeUpdateInfo.Request): Promise<EmployeeUpdateInfo.Response>;
    getEmployeeAvatar(id: number): Promise<EmployeeGetAvatar.Response>;
    setEmployeeAvatar(dto: EmployeeSetAvatar.Request): Promise<EmployeeSetAvatar.Response>;
    deleteEmployeeAvatar(id: number): Promise<EmployeeDeleteAvatar.Response>;
    validateEmployeeEmail(email: string): Promise<ValidateEmployeeEmail.Response>;
    generateRefreshPasswordLink(email: string, new_password: string): Promise<GenerateRefreshPasswordLinkEmployee.Response>;
    confirmRefreshPasswordLink(hash: string): Promise<ConfirmRefreshPasswordLinkEmployee.Response>;
}
