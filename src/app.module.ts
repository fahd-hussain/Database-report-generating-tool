import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/Modules/Auth/auth.module';
import { UserModule } from 'src/Modules/User/user.module';
import { HttpErrorFilter } from 'src/Shared/Filter/http-error.filter';
import { DatabaseModule } from 'src/Modules/Database/database.module';
import { AuthGuard } from 'src/Shared/Guard/auth.guard';
import { ReportModule } from './Modules/Report/report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    DatabaseModule,
    ReportModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
