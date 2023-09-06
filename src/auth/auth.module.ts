import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EmployeeModule } from '../employee/employee.module';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { getConfig } from 'src/common/utils/ymlConfig';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Global()
@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    JwtModule.register({ ...getConfig('JWT') }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
