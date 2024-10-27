<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    //fja za registraciju
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        $token=$user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'Poruka' => 'Uspesno ste se registrovali',
            'user'=>$user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    //fja za logovanje na app
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['Greska:', $validator->errors()]);
        }

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['Poruka'=>'Nisu dobri parametri za login.'], 401);
        }

        $user = User::where('email', $request['email']) -> firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'Poruka' => 'Zdravo,' . $user->name . ' dobrodosli na aplikaciju Salon za pse',
            'access_token' => $token,
            'token_type' => 'Bearer',
            #da znamo da li je radnik ili ne
            'is_worker' => $user->is_worker,
            'user_email' => $user->email,
        ]);
    }

    //fja za resetovanje lozinke ako je zaboravljena
    public function forgotPassword(Request $request)
    {   
        $request->validate([
            'email' => 'required',
            'new_password' => 'required|string'
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if ($user) {
            $user->password = Hash::make($request->new_password);
            $user->save();
            
            return response()->json(['Poruka' => 'Uspesno resetovana lozinka']);
        }
    
        return response()->json(['Poruka' => 'Nije pronadjen korisnik'], 404);
    }

    //fja za logout
    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['Poruka'=> 'Uspesan logout']);
    }
}
