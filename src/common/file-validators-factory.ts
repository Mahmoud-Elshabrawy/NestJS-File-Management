import { BadRequestException, FileTypeValidator, HttpStatus, MaxFileSizeValidator, ParseFilePipe } from "@nestjs/common"
import { FileSignatureValidator } from "./validators/file-signature.validator"
import { FileTypes } from "./types/file.types"
import { CreateFileTypeRegex } from "./file-regex"




export const CreateFileValidator = (maxSize: number, fileType: FileTypes[]) => {
    const fileTypeRegex = CreateFileTypeRegex(fileType)
    return [
        // 1) Validate the file size
        new MaxFileSizeValidator({
            maxSize,
            message: (maxSize) => `File is too big, max size is ${maxSize}`
        }),
        // 2) Validate the file type (extension)
        new FileTypeValidator({
            fileType: fileTypeRegex,
        }),

        // 3) Custom Validation (check file signature)
        new FileSignatureValidator({})
    ]
}




export const CreateParseFilePipe = (maxSize: number, fileType: FileTypes[]): ParseFilePipe => {

    return new ParseFilePipe({
        validators: CreateFileValidator(maxSize, fileType),
        errorHttpStatusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        exceptionFactory: (error: string) => {
            throw new BadRequestException(error)
        },
        fileIsRequired: true
    })
}