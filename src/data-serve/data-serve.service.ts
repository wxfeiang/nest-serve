import { Injectable } from '@nestjs/common';
import { generateTelemetryIds } from 'src/common/utils/telemetry';
import { CreateDataServeDto } from './dto/create-data-serve.dto';
import { UpdateDataServeDto } from './dto/update-data-serve.dto';

@Injectable()
export class DataServeService {
  create(createDataServeDto: CreateDataServeDto) {
    return 'This action adds a new dataServe';
  }

  findAll() {
    return `This action returns all dataServe`;
  }

  findOne(id: number) {
    let decsion =
      '退出cursor的登录账号，确保 Cursor 完全关闭（包括后台进程），一般关闭Cursor就可以了。打开工具页面，点击"重新生成 ID"按钮。页面地址在这里,或看简介链接根据您的操作系统，找到并打开对应的配置文件：Windows（win键+R，输入）: %APPDATA%\Cursor\User\globalStorage\storage.jsonmacOS: ~/Library/Application Support/Cursor/User/globalStorage/storage.jsonLinux: ~/.config/Cursor/User/globalStorage/storage.json将生成的三个标识码复制替换到配置文件中：telemetry.macMachineIdtelemetry.machineIdtelemetry.devDeviceId保存文件重新启动 Cursor 并登录确保Cursor Pro Trial（pro测试） 账号正常，就可以正常使用了。'
    return { ...generateTelemetryIds(), decsion }
  }

  update(id: number, updateDataServeDto: UpdateDataServeDto) {
    return `This action updates a #${id} dataServe`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataServe`;
  }
}
