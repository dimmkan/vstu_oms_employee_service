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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const sdk_1 = require("@directus/sdk");
const common_1 = require("@nestjs/common");
const mailer_service_1 = require("../mailer/mailer.service");
const _ = require("ramda");
const FormData = require("form-data");
const stream_1 = require("stream");
const bcrypt = require("bcrypt");
const nestjs_rmq_1 = require("nestjs-rmq");
const constants_1 = require("nestjs-rmq/dist/constants");
let EmployeeService = class EmployeeService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.directus = new sdk_1.Directus(process.env.DIRECTUS_HOST, {
            auth: {
                staticToken: process.env.ADMIN_API_KEY,
            },
        });
    }
    async getEmployeeInfo(id) {
        const employees_collection = this.directus.items('employees');
        return employees_collection.readOne(id, {
            fields: [
                'id',
                'email',
                'confirmed',
                'employee_profile.id',
                'employee_profile.full_name',
                'employee_profile.sex',
                'employee_profile.birthday',
                'employee_profile.specify',
            ],
        });
    }
    async updateEmployeeInfo(dto) {
        const employee_profiles_collection = this.directus.items('employee_profiles');
        const { id } = await employee_profiles_collection
            .readByQuery({
            filter: {
                employee_id: dto.id,
            },
            fields: ['id'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        await employee_profiles_collection.updateOne(id, dto.user_profile);
        return { success: true };
    }
    async getEmployeeAvatar(id) {
        var _a;
        const employee_avatar_collection = this.directus.items('employee_avatar');
        const result = await employee_avatar_collection
            .readByQuery({
            filter: {
                employee_id: id,
            },
            fields: ['avatar'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        return { avatar_id: (_a = (result && result.avatar)) !== null && _a !== void 0 ? _a : '' };
    }
    async setEmployeeAvatar(dto) {
        const employee_avatar_collection = this.directus.items('employee_avatar');
        const employee_avatar = await employee_avatar_collection
            .readByQuery({
            filter: {
                employee_id: dto.id,
            },
            fields: ['id'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        const form = new FormData();
        form.append('file', stream_1.Readable.from(Buffer.from(dto.avatar, 'base64')), {
            filename: dto.filename,
        });
        const fileId = await this.directus.files.createOne(form, {}, {
            requestOptions: {
                headers: Object.assign({}, form.getHeaders()),
            },
        });
        if (!!employee_avatar) {
            const result = await employee_avatar_collection.updateOne(employee_avatar.id, {
                avatar: fileId,
            });
            return { avatar_id: result.avatar };
        }
        else {
            const result = await employee_avatar_collection.createOne({
                employee_id: dto.id,
                avatar: fileId,
            });
            return { avatar_id: result.avatar };
        }
    }
    async deleteEmployeeAvatar(id) {
        const employee_avatar_collection = this.directus.items('employee_avatar');
        const result = await employee_avatar_collection
            .readByQuery({
            filter: {
                employee_id: id,
            },
            fields: ['avatar'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        if (!!result && !!result.avatar) {
            await this.directus.files.deleteOne(result.avatar);
        }
        return { success: true };
    }
    async validateEmployeeEmail(email) {
        const employees_collection = this.directus.items('employees');
        const result = await employees_collection
            .readByQuery({
            filter: {
                email,
            },
            fields: ['id'],
        })
            .then(_.path(['data']));
        return { validate: !!result.length };
    }
    async generateRefreshPasswordLink(email, new_password) {
        const refresh_password_collection = this.directus.items('refresh_password');
        const hash = await bcrypt.hash(new_password, 10);
        await refresh_password_collection.createOne({
            email,
            new_password: hash,
        });
        await this.mailerService.sendRefreshMail(hash, email);
        return { success: true };
    }
    async confirmRefreshPasswordLink(hash) {
        const refresh_password_collection = this.directus.items('refresh_password');
        const employees_collection = this.directus.items('employees');
        const result = await refresh_password_collection
            .readByQuery({
            filter: {
                new_password: hash,
            },
            fields: ['id,email'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        if (!result) {
            throw new nestjs_rmq_1.RMQError('Данные для изменения пароля не найдены!', constants_1.ERROR_TYPE.RMQ, 400);
        }
        const employee = await employees_collection
            .readByQuery({
            filter: {
                email: result.email,
            },
            fields: ['id'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        await employees_collection.updateOne(employee.id, { password: hash });
        await refresh_password_collection.deleteOne(result.id);
        return { success: true };
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_service_1.MailerService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map