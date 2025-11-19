import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { AccountsModule } from '../accounts/accounts.module';

/**
 * Gestisce le definizioni di ruolo e le assegnazioni verso gli account.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Role]), forwardRef(() => AccountsModule)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
