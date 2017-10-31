import { FileInput } from './file-input.model';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

export class FileValidators {

    /**
     * Function to control content of files
     *
     * @param control
     *
     * @returns
     */
    static maxContentSize(bytes: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            console.log(typeof control, control);
            const size = control && control.value ? (control.value as FileInput).files.map(f => f.size).reduce((acc, i) => acc + i, 0) : 0;
            const condition = bytes > size;
            return condition ? null : {
                maxContentSize: {
                    actualSize: size,
                    maxSize: bytes
                }
            };
        }
    }
}
