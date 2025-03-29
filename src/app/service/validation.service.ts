import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    /**
     * チェックボックス
     * @param value
     */
    validateCheck(value: string[]) {
        if (!value.length) {
            return '何かしらチェックすることは必須です';
        }
        return '';
    }

    /**
     * 電話番号（000-0000-0000形式）
     * @param tel1 市外局番
     * @param tel2 市内局番
     * @param tel3 加入者番号
     */
    validateTel(tel1: string | null, tel2: string | null, tel3: string | null) {
        if (!tel1 || !tel2 || !tel3) {
            return '電話番号は必須です';
        }
        return '';
    }
}
