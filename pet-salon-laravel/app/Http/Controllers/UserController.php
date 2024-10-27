<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('is_worker', false)->get();
        return UserResource::collection($users);
    }


    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    #da admin brise korisnike
    public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'User deleted successfully'], 200);
}
}
