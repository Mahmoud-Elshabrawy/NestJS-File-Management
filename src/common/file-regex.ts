import { FileTypes } from "./types/file.types";


export const CreateFileTypeRegex = (fileType: FileTypes[]): RegExp =>
    new RegExp(fileType.join('|'))
