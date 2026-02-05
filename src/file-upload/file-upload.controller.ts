import { BadRequestException, Controller, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { error } from 'console';
import { FileSignatureValidator } from 'src/common/validators/file-signature.validator';

@Controller('file-upload')
export class FileUploadController {
    @Post('/single')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators: [
            // 1) Validate the file size
            new MaxFileSizeValidator({
                maxSize: 1024 * 1024, // 1MB
                message: (maxSize) => `File is too big, max size is ${maxSize}`
            }),
            // 2) Validate the file type (extension)
            new FileTypeValidator({
                fileType: /png|jpg|jpeg|pdf/
            }),

            // 3) Custom Validation (check file signature)
            new FileSignatureValidator({})
        ],
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        exceptionFactory: (error: string) => {
            throw new BadRequestException(error)
        },
        fileIsRequired: true //DEFAULT

    })) file: Express.Multer.File) {
        return file
    }

    @Post('/multiple')
    @UseInterceptors(FilesInterceptor('files', 3, {
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB
        }
    }))
    uploadFiles(@UploadedFiles(new ParseFilePipe({
        validators: [
            // 1) Validate the file size
            new MaxFileSizeValidator({
                maxSize: 5 * 1024 * 1024, // 1MB
                message: (maxSize) => `File is too big, max size is ${maxSize}`
            }),
            // 2) Validate the file type (extension)
            new FileTypeValidator({
                fileType: /png|jpg|jpeg/
            }),

            // 3) Custom Validation (check file signature)
            new FileSignatureValidator({})
        ],
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        exceptionFactory: (error: string) => {
            throw new BadRequestException(error)
        },
        fileIsRequired: true //DEFAULT

    })) files: Express.Multer.File[]) {
        return files.map((file) => file.originalname)
    }
}

