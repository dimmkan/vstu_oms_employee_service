import { Directus } from '@directus/sdk';
import { Injectable } from '@nestjs/common';
import {
  EmployeeGetAvatar,
  EmployeeGetInfo,
  EmployeeUpdateInfo,
  EmployeeSetAvatar,
  EmployeeDeleteAvatar,
  ValidateEmployeeEmail,
  GenerateRefreshPasswordLinkEmployee,
  ConfirmRefreshPasswordLinkEmployee,
} from 'src/contracts';
import { MailerService } from 'src/mailer/mailer.service';
import * as _ from 'ramda';
import * as FormData from 'form-data';
import { Readable } from 'stream';
import * as bcrypt from 'bcrypt';
import { RMQError } from 'nestjs-rmq';
import { ERROR_TYPE } from 'nestjs-rmq/dist/constants';

@Injectable()
export class EmployeeService {
  directus: any;
  constructor(private readonly mailerService: MailerService) {
    this.directus = new Directus(process.env.DIRECTUS_HOST, {
      auth: {
        staticToken: process.env.ADMIN_API_KEY,
      },
    });
  }

  async getEmployeeInfo(id: number): Promise<EmployeeGetInfo.Response> {
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

  async updateEmployeeInfo(
    dto: EmployeeUpdateInfo.Request,
  ): Promise<EmployeeUpdateInfo.Response> {
    const employee_profiles_collection =
      this.directus.items('employee_profiles');
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

  async getEmployeeAvatar(id: number): Promise<EmployeeGetAvatar.Response> {
    const employee_avatar_collection = this.directus.items('employee_avatar');
    const result = await employee_avatar_collection
      .readByQuery({
        filter: {
          employee_id: id,
        },
        fields: ['avatar'],
      })
      .then(_.compose(_.head, _.path(['data'])));
    return { avatar_id: (result && result.avatar) ?? '' };
  }

  async setEmployeeAvatar(
    dto: EmployeeSetAvatar.Request,
  ): Promise<EmployeeSetAvatar.Response> {
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
    form.append('file', Readable.from(Buffer.from(dto.avatar, 'base64')), {
      filename: dto.filename,
    });
    const fileId = await this.directus.files.createOne(
      form,
      {},
      {
        requestOptions: {
          headers: {
            ...form.getHeaders(),
          },
        },
      },
    );

    if (!!employee_avatar) {
      const result = await employee_avatar_collection.updateOne(
        employee_avatar.id,
        {
          avatar: fileId,
        },
      );
      return { avatar_id: result.avatar };
    } else {
      const result = await employee_avatar_collection.createOne({
        user_id: dto.id,
        avatar: fileId,
      });
      return { avatar_id: result.avatar };
    }
  }

  async deleteEmployeeAvatar(
    id: number,
  ): Promise<EmployeeDeleteAvatar.Response> {
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

  async validateEmployeeEmail(
    email: string,
  ): Promise<ValidateEmployeeEmail.Response> {
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

  async generateRefreshPasswordLink(
    email: string,
    new_password: string,
  ): Promise<GenerateRefreshPasswordLinkEmployee.Response> {
    const refresh_password_collection = this.directus.items('refresh_password');
    const hash = await bcrypt.hash(new_password, 10);
    await refresh_password_collection.createOne({
      email,
      new_password: hash,
    });

    await this.mailerService.sendRefreshMail(hash, email);

    return { success: true };
  }

  async confirmRefreshPasswordLink(
    hash: string,
  ): Promise<ConfirmRefreshPasswordLinkEmployee.Response> {
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
      throw new RMQError(
        'Данные для изменения пароля не найдены!',
        ERROR_TYPE.RMQ,
        400,
      );
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
}
