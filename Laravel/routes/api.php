<?php

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

// Login Route
Route::post('/login', [AuthController::class, 'login']);

// Secure Token Validation Route
// Route::middleware(['jwt.auth'])->get('/validate-token', function (Request $request) {
//     try {
//         $user = JWTAuth::parseToken()->authenticate();
//         return response()->json(['valid' => true, 'user' => $user]);
//     } catch (JWTException $e) {
//         return response()->json(['valid' => false, 'message' => 'Invalid or expired token'], 401);

//     }
// });

// Protected Product Routes
Route::middleware(['jwt.auth'])->group(function () {
    Route::post('/product/create', [ProductController::class, 'create']);
    Route::get('/products', [ProductController::class, 'list']);
    Route::delete('/products/{id}', [ProductController::class, 'delete']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
});
