<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Todo;
use App\Http\Requests\ProfileRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    /**
     * Update User Profile..
     */
    public function update(ProfileRequest $request)
    {
        $id = auth()->id();
        $user = User::where('id', $id)->update($request->validated());
        return response()->json([$data = $user, $status = 200]);
    }

    /**
     * Delete Account and associated data.
     */
    public function destroy(Request $request)
    {
        $id = auth()->id();
        Todo::where('user_id', $id)->delete();
        User::where('id', $id)->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(["success" => "Account Deleted"], $status = 203);
    }
}
