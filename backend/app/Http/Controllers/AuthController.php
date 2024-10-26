<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function Login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password,  $user->password)) {
            return response()->json(['message' => 'your email or password is wrong', 'status' => 201]);
        }

        $token = $user->createToken($user->username)->plainTextToken;
        return response()->json(['message' => 'You are logged in successfully', 'token' => $token, 'status' => 200]);
    }

    public function Register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'username' => ['required', 'max:50', 'min:3'],
            'email' => ['required', 'email', 'max:50', 'unique:users,email'],
            'password' => ['required', 'min:8', 'max:60'],
            'phone_num' => ['required', 'max:15'],
            'city' => ['required', 'max:30'],
        ]);
        if ($validate->fails()) {
            return response()->json(['error' => $validate->errors(), 'status' => 401]);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'phone_num' => $request->phone_num,
            'city' => $request->city,
        ]);
        $token = $user->createToken($request->username)->plainTextToken;
        return response()->json(['message' => 'You are signed up successfully', 'token' => $token, 'user' => $user, 'status' => 200]);
    }
    public function Logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully', 'status' => 200]);
    }
}
