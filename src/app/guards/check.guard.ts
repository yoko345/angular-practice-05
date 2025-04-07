import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const queryParams = route.queryParams;

    // 入力内容を検証
    const checkList = queryParams['check'];
    const tel1 = queryParams['tel1'];
    const tel2 = queryParams['tel2'];
    const tel3 = queryParams['tel3'];

    if (!checkList.length || !tel1 || !tel2 || !tel3) {
        // 入力内容に不備がある場合はリダイレクト
        alert('入力内容に不備があります。フォームに戻ります。');
        router.navigate(['/input']);
        return false;
    }

    // 入力内容が正しい場合は遷移を許可
    return true;
};
