<?php

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

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



Route::post('/cadastro', function (Request $request) {
    $data = $request->all();

    $validacao = Validator::make($data, [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        //'password' => 'required|string|min:6|confirmed',
        'password' => 'required|string|min:6'
    ]);

    if($validacao->fails()){
      return $validacao->errors();
    }

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password']),
    ]);

    $user->token = $user->createToken($user->email)->accessToken;

    return $user;
});

Route::post('/login', function (Request $request) {

    $validacao = Validator::make($request->all(), [
        'email' => 'required|string|email|max:255',
        'password' => 'required|string',
    ]);

    if($validacao->fails()){
      return $validacao->errors();
    }

    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        // Authentication passed...
        $user = Auth()->user();
        $user->token = $user->createToken($user->email)->accessToken;
        return $user;
    }else{
      return false;
    }
});

Route::middleware('auth:api')->get('/usuarios', function (Request $request) {
    return User::all();
});

Route::middleware('auth:api')->get('/usuario', function (Request $request) {
    $user = $request->user();
    $user->token = $user->createToken($user->email)->accessToken;
    return $user;
});

Route::middleware('auth:api')->put('/usuario', function (Request $request) {
    $user = $request->user();
    $data = $request->all();
    if(isset($data['password']) && $data['password'] != ""){
        $data['password'] = bcrypt($data['password']);
    }elseif(isset($data['password']) && $data['password'] == ""){
        unset($data['password']);

    }
    $user->update($data);
    $user->token = $user->createToken($user->email)->accessToken;
    return $user;
});
