"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rmq_1 = require("nestjs-rmq");
const contracts_1 = require("../contracts");
const employee_service_1 = require("./employee.service");
let EmployeeController = class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async getUserInfo({ id }) {
        return this.employeeService.getEmployeeInfo(id);
    }
    async updateUserInfo(dto) {
        return this.employeeService.updateEmployeeInfo(dto);
    }
    async getUserAvatar({ id }) {
        return this.employeeService.getEmployeeAvatar(id);
    }
    async setUserAvatar(dto) {
        return this.employeeService.setEmployeeAvatar(dto);
    }
    async deleteUserAvatar({ id }) {
        return this.employeeService.deleteEmployeeAvatar(id);
    }
    async validateUserEmail({ email }) {
        return this.employeeService.validateEmployeeEmail(email);
    }
    async generateRefreshPasswordLink({ email, new_password }) {
        return this.employeeService.generateRefreshPasswordLink(email, new_password);
    }
    async confirmRefreshPasswordLink({ hash }) {
        return this.employeeService.confirmRefreshPasswordLink(hash);
    }
};
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.EmployeeGetInfo.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.EmployeeGetInfo.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getUserInfo", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.EmployeeUpdateInfo.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.EmployeeUpdateInfo.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updateUserInfo", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.EmployeeGetAvatar.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.EmployeeGetAvatar.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getUserAvatar", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.EmployeeSetAvatar.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.EmployeeSetAvatar.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "setUserAvatar", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.EmployeeDeleteAvatar.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.EmployeeDeleteAvatar.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteUserAvatar", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.ValidateEmployeeEmail.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.ValidateEmployeeEmail.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "validateUserEmail", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.GenerateRefreshPasswordLinkEmployee.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.GenerateRefreshPasswordLinkEmployee.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "generateRefreshPasswordLink", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.ConfirmRefreshPasswordLinkEmployee.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.ConfirmRefreshPasswordLinkEmployee.Request]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "confirmRefreshPasswordLink", null);
EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map