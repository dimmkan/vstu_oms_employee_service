import { ConfirmRefreshPasswordLinkEmployee, EmployeeDeleteAvatar, EmployeeGetAvatar, EmployeeGetInfo, EmployeeSetAvatar, EmployeeUpdateInfo, GenerateRefreshPasswordLinkEmployee, ValidateEmployeeEmail } from 'src/contracts';
import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getUserInfo({ id }: EmployeeGetInfo.Request): Promise<EmployeeGetInfo.Response>;
    updateUserInfo(dto: EmployeeUpdateInfo.Request): Promise<EmployeeUpdateInfo.Response>;
    getUserAvatar({ id }: EmployeeGetAvatar.Request): Promise<EmployeeGetAvatar.Response>;
    setUserAvatar(dto: EmployeeSetAvatar.Request): Promise<EmployeeSetAvatar.Response>;
    deleteUserAvatar({ id }: EmployeeDeleteAvatar.Request): Promise<EmployeeDeleteAvatar.Response>;
    validateUserEmail({ email }: ValidateEmployeeEmail.Request): Promise<ValidateEmployeeEmail.Response>;
    generateRefreshPasswordLink({ email, new_password }: GenerateRefreshPasswordLinkEmployee.Request): Promise<GenerateRefreshPasswordLinkEmployee.Response>;
    confirmRefreshPasswordLink({ hash }: ConfirmRefreshPasswordLinkEmployee.Request): Promise<ConfirmRefreshPasswordLinkEmployee.Response>;
}
