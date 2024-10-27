<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PretragaUslugaController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

//rute kojima svako moze da pristupi
Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/resetPassword', [AuthController::class,'forgotPassword']);

Route::get('/pretragaUslugaPoTezini',[PretragaUslugaController::class,'searchServices']);

Route::resource('/services', ServiceController::class);

//rute za koje mora korisnik da bude autentifikovan - da ima token
//da li je radnik ili klasican proveravamo u kontrolerima

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/users',[UserController::class,'index']);
    Route::get('/users/{id}',[UserController::class,'show']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/reservations', [ReservationController::class,'store']);

    Route::put('/reservations/{id}', [ReservationController::class,'update']);

    Route::patch('/reservations/{id}', [ReservationController::class,'updateStatus']);

    Route::delete('/reservations/{id}', [ReservationController::class,'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);  

});
