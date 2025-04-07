import { Component } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { ValidationService } from '../service/validation.service';
import { CommonModule } from '@angular/common';
import { InputStore } from './input.store';
import { first, map, merge } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent {
    checkList = [
        { value: 'テスト1', content: 'テスト1' },
        { value: 'テスト2', content: 'テスト2' },
        { value: 'テスト3', content: 'テスト3' },
    ];

    myForm: FormGroup;
    checkFormBuilder = this.formBuilder.array(
        [],
        [
            () => ({
                error: this.validationService.validateCheck([]),
            }),
        ]
    );
    tel1Control = new FormControl('', [
        ({ value }) => ({
            error: this.validationService.validateTel(value, '', ''),
        }),
    ]);
    tel2Control = new FormControl('', [
        ({ value }) => ({
            error: this.validationService.validateTel('', value, ''),
        }),
    ]);
    tel3Control = new FormControl('', [
        ({ value }) => ({
            error: this.validationService.validateTel('', '', value),
        }),
    ]);

    errorCount$ = this.store.errorCount$;

    constructor(
        private validationService: ValidationService,
        private store: InputStore,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.myForm = new FormGroup({
            check: this.checkFormBuilder,
            tel1: this.tel1Control,
            tel2: this.tel2Control,
            tel3: this.tel3Control,
        });

        this.store.errorCount$
            .pipe(
                first(),
                map((count) => count)
            )
            .subscribe((count) => {
                if (this.checkFormBuilder.getError('error')) count++;
                if (
                    this.tel1Control.getError('error') ||
                    this.tel2Control.getError('error') ||
                    this.tel3Control.getError('error')
                )
                    count++;

                this.store.setErrorCount(count);
            });

        merge(
            this.checkFormBuilder.statusChanges,
            this.tel1Control.statusChanges,
            this.tel2Control.statusChanges,
            this.tel3Control.statusChanges
        ).subscribe(() => {
            let count = 0;
            if (this.checkFormBuilder.getError('error')) count++;
            if (
                this.tel1Control.getError('error') ||
                this.tel2Control.getError('error') ||
                this.tel3Control.getError('error')
            )
                count++;

            this.store.setErrorCount(count);
        });
    }

    /**
     * チェックボックスの変更
     * @param checkvalue
     * @param isChecked
     */
    changeCheck(checkvalue: string, event: Event) {
        const checkControl = this.myForm.get('check') as FormArray;
        const isChecked = (event.target as HTMLInputElement).checked;

        if (isChecked) {
            checkControl.push(new FormControl(checkvalue));
        } else {
            const index = checkControl.controls.findIndex(
                (x) => x.value === checkvalue
            );
            checkControl.removeAt(index);
        }

        this.checkFormBuilder.setErrors({
            error: this.validationService.validateCheck(
                this.myForm.controls['check'].value
            ),
        });
    }

    /**
     * 電話番号の入力チェック
     * @param tel1 市外局番
     * @param tel2 市内局番
     * @param tel3 加入者番号
     */
    checkTel(tel1: string | null, tel2: string | null, tel3: string | null) {
        this.tel1Control.setErrors({
            error: this.validationService.validateTel(tel1, tel2, tel3),
        });
        this.tel2Control.setErrors({
            error: this.validationService.validateTel(tel1, tel2, tel3),
        });
        this.tel3Control.setErrors({
            error: this.validationService.validateTel(tel1, tel2, tel3),
        });
        this.tel1Control.markAsDirty();
        this.tel1Control.markAsTouched();
        this.tel2Control.markAsDirty();
        this.tel2Control.markAsTouched();
        this.tel3Control.markAsDirty();
        this.tel3Control.markAsTouched();
    }

    /**
     * 送信ボタン
     */
    onSubmit(): void {
        const formData = this.myForm.getRawValue();
        this.router.navigate(['/check'], { queryParams: formData });
    }
}
