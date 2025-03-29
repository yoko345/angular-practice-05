import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root', // グローバルに提供
})
export class InputStore {
    // 状態の初期値を設定
    private errorCountSubject = new BehaviorSubject<number>(0);

    // 状態をObservableとして公開
    errorCount$ = this.errorCountSubject.asObservable();

    // 状態を更新するメソッド
    setErrorCount(count: number): void {
        this.errorCountSubject.next(count);
    }
}
