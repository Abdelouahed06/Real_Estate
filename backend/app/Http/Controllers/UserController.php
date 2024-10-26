<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function update(Request $request, string $id)
    {
        $validate = Validator::make($request->all(), [
            'username' => ['required', 'max:50'],
            'phone_num' => ['required'],
            'city' => ['required', 'max:30'],
        ]);
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors(), 'status' => 401]);
        }

        User::where('user_id', $id)->update([
            'username' => $request->username,
            'phone_num' => $request->phone_num,
            'city' => $request->city,
        ]);
        return response()->json(['message' => 'Profile updated successfully', 'status' => 200]);
    }
    public function changePassword(Request $request, $id)
    {
        $user = User::where('user_id', $id)->first();

        if (!$user || !Hash::check($request->currentPassword,  $user->password)) {
            return response()->json(['message' => 'your current password is wrong', 'status' => 201]);
        }

        $validate = Validator::make($request->all(), [
            'newPassword' => ['required', 'min:8'],
        ]);
        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors(), 'status' => 401]);
        }

        $user->password = $request->newPassword;
        $user->save();
        return response()->json(['message' => 'password updated successfully', 'status' => 200]);
    }
}
