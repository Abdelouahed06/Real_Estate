<?php

use App\Http\Controllers\AnnounceController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::put('/user/{id}', [UserController::class, 'update'])->middleware('auth:sanctum');
Route::put('/user/new-password/{id}', [UserController::class, 'changePassword'])->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'Login']);
Route::post('/logout', [AuthController::class, 'Logout'])->middleware('auth:sanctum');


Route::prefix('announce')->group(function () {
    Route::get('/', [AnnounceController::class, 'index']);
    Route::post('/add', [AnnounceController::class, 'store']);
    Route::post('/my-announces', [AnnounceController::class, 'myAnnounces']);
    Route::get('/show', [AnnounceController::class, 'show']);
    Route::put('/edit/{id}', [AnnounceController::class, 'update']);
    Route::delete('/delete/{id}', [AnnounceController::class, 'destroy']);
})->middleware('auth:sanctum');


Route::prefix('favourite')->group(function () {
    Route::get('/', [FavouriteController::class, 'index']);
    Route::post('/add', [FavouriteController::class, 'store']);
    Route::get('/{id}', [FavouriteController::class, 'show']);
    Route::delete('/{id}', [FavouriteController::class, 'destroy']);
})->middleware('auth:sanctum');
