<?php

use App\Http\Resources\User as UserResource;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return new UserResource($request->user());
});

Route::apiResource('todos', TodoController::class)->middleware(['auth:sanctum']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::put('profile', [ProfileController::class, 'update']);
    Route::delete('profile', [ProfileController::class, 'destroy']);
});
