import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileUploadController } from './file-upload/file-upload.controller';

@Module({
  imports: [FileUploadModule],
  controllers: [AppController, FileUploadController],
  providers: [AppService],
})
export class AppModule {}
