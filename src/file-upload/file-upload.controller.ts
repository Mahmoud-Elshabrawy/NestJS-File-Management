import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('file-upload')
export class FileUploadController {
    @Post('/single')
    @UseInterceptors(FileInterceptor('file', {
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return file
    }

    @Post('/multiple')
    @UseInterceptors(FilesInterceptor('files', 3, {
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    }))
    uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        return files.map((file) => file.originalname)
    }
}

