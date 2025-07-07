<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'phone' => 'required|digits:10',
            'password' => 'required|digits:4'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $validator->errors()
            ], 422);
        }

        
        $user = User::where([
            'phone' => $request->phone,
            'password' => $request->password
        ])->first();

        if (!$user) {
            return response()->json([
                'error' => 'Authentication failed',
                'message' => 'Invalid phone number or password'
            ], 401);
        }

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60
        ]);
    }

    public function user()
    {
        return response()->json(auth()->user());
    }
}
