import { ConfirmRefreshPasswordLinkEmployee, EmployeeDeleteAvatar, EmployeeGetAvatar, EmployeeGetInfo, EmployeeSetAvatar, EmployeeUpdateInfo, GenerateRefreshPasswordLinkEmployee, ValidateEmployeeEmail } from 'src/contracts';
import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getEmployeeInfo({ id }: EmployeeGetInfo.Request): Promise<EmployeeGetInfo.Response>;
    updateEmployeeInfo(dto: EmployeeUpdateInfo.Request): Promise<EmployeeUpdateInfo.Response>;
    getEmployeeAvatar({ id }: EmployeeGetAvatar.Request): Promise<EmployeeGetAvatar.Response>;
    setEmployeeAvatar(dto: EmployeeSetAvatar.Request): Promise<EmployeeSetAvatar.Response>;
    deleteEmployeeAvatar({ id }: EmployeeDeleteAvatar.Request): Promise<EmployeeDeleteAvatar.Response>;
    validateEmployeeEmail({ email }: ValidateEmployeeEmail.Request): Promise<ValidateEmployeeEmail.Response>;
    generateRefreshPasswordLink({ email, new_password }: GenerateRefreshPasswordLinkEmployee.Request): Promise<GenerateRefreshPasswordLinkEmployee.Response>;
    confirmRefreshPasswordLink({ hash }: ConfirmRefreshPasswordLinkEmployee.Request): Promise<ConfirmRefreshPasswordLinkEmployee.Response>;
}
