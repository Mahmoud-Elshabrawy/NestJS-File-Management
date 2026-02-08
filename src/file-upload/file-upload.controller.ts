import { BadRequestException, Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { error } from 'console';
import { CreateParseFilePipe } from 'src/common/file-validators-factory';
import { FileSignatureValidator } from 'src/common/validators/file-signature.validator';

@Controller('file-upload')
export class FileUploadController {
    @Post('/single')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(CreateParseFilePipe(2 * 1024 * 1024, ['png', 'jpg', 'jpeg', 'pdf']),) file: Express.Multer.File) {
        return file.originalname
    }

    @Post('/multiple')
    @UseInterceptors(FilesInterceptor('files', 3, {
    }))
    uploadFiles(@UploadedFiles(
        CreateParseFilePipe(2 * 1024 * 1024, ['png', 'jpg', 'jpeg', 'pdf']),) files: Express.Multer.File[]) {
        return files.map((file) => file.originalname)
    }
}

