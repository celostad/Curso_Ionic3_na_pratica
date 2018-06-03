<?php

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Curso;
use Illuminate\Validation\Rule;

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
        'password' => 'required|string|min:6|confirmed',
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


      $validacao = Validator::make($data, [
          'name' => 'required|string|max:255',
          'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id)],
          'password' => 'required|string|min:6',
      ]);

      if($validacao->fails()){
        return $validacao->errors();
      }

      $data['password'] = bcrypt($data['password']);

    }elseif(isset($data['password']) && $data['password'] == ""){

      unset($data['password']);

      $validacao = Validator::make($data, [
          'name' => 'required|string|max:255',
          'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id)]
      ]);

      if($validacao->fails()){
        return $validacao->errors();
      }

    }else{
      $validacao = Validator::make($data, [
          'name' => 'required|string|max:255',
          'email' => ['required','string','email','max:255',Rule::unique('users')->ignore($user->id)]
      ]);

      if($validacao->fails()){
        return $validacao->errors();
      }
    }

    $user->update($data);
    $user->token = $user->createToken($user->email)->accessToken;
    return $user;
});

Route::get('/admin/criar/cursos', function (Request $request) {
  
  /* $curso = Curso::create(
    [
      "titulo"=> "Curso de Android",
      "descricao"=> "Aprenda Android na Prática",
      "autor"=>"Marcelo Souza",
      "valor"=> 55.90,
      "valor_texto"=> "55,90",
      "imagem"=> "https://www.portalgsti.com.br/media/uploads/course/13419/2017/06/20/curso-onine-android.png",
    ]
  );
  return $curso;
  */
});

Route::get('/cursos', function (Request $request) {
  $cursos = Curso::with('aulas')->get();
  return $cursos;
});


Route::get('/admin/criar/aulas', function (Request $request) {


  /*$aula = Curso::find(3)->aulas()->create(
    [
      "titulo" => "[Novo Curso - Android Studio] - Playlist - Todos os cursos",
      "ordem" => 6,
      "tempo" => "00:00",
      "video" => "https://www.youtube.com/embed/MnJEbS5p3kQ&list=PLVawTLaO8Js9vhVjFj4Q18ncLHBdchenb"
    ]

);
  return $aula;
  
*/


});