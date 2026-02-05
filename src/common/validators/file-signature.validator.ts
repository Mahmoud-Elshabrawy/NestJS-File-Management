import { FileValidator } from "@nestjs/common";
import { IFile } from "@nestjs/common/pipes/file/interfaces";
import magicBytes from 'magic-bytes.js'

export class FileSignatureValidator extends FileValidator {
    isValid(file?: any): boolean | Promise<boolean> {
        const fileSignature = magicBytes(file.buffer).map(file => file.mime)
        // console.log(fileSignature);
        if (!fileSignature.length) return false

        const isMatch = fileSignature.includes(file.mimetype)
        if (!isMatch) return false
        return true
    }
    buildErrorMessage(file: any): string {
        return "validation faield (file type doesn't match file signature)"
    }

}