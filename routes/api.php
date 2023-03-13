<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UnitController;

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

//Route::get('/unitsInforamtion', [UnitController::class, 'index']);
//Route::post('/receive-data', [UnitController::class, 'store']);


Route::controller(UnitController::class)->group(function () {
    Route::get('/unitsInforamtion', 'index');
    Route::post('/receivedata', 'store');
    Route::get('/search', 'search');
    Route::delete('/unit/{id}', 'destroy');
    Route::put('/update/{unit_info_id}', 'update');
});