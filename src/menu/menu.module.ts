import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from 'src/role/entities/roleMenu.entity';
import { Menu } from './entities/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, RoleMenu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
