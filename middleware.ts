import { updateSession } from '@/services/session';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Exclude /sign-in, /reset-password, /payment-successful and /invite
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images|signin|signup|verify-email|reset-password|forgot-password-request|forgot-password-code|signup-success|password-success|onboarding|$).*)',
    ],
};
