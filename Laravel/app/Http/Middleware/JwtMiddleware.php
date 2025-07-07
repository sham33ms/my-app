<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Session;
use Log;

class JwtMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            LOG::warning(json_encode($user));

            if (!$user) {
                return response()->json(['message' => 'Unauthorized user'], 401);
            }
            Session::put('user', $user->id);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        return $next($request);
    }
}
