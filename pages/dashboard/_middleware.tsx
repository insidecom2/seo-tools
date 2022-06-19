import Cookies from 'js-cookie';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token: string = req.cookies.token;
    if (typeof token !== 'undefined') {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/', req.url))

}