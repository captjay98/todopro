<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User as UserResource;
use App\Models\User;
use App\Models\Todo;
use App\Http\Requests\ProfileRequest;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    /**
     * Update User Profile with the validated request data.
     *
     * @param ProfileRequest Request object containing updated user data.
     * @return JsonResponse
     */
    public function update(ProfileRequest $request)
    {
        $id = auth()->id();
        $user = User::where('id', $id)->update($request->validated());

        return new UserResource(User::findOrFail($id));
    }

    /**
     * Delete Account, Todos and associated data.
     *
     * @param Request
     * @return JsonResponse returns success or faulure message
     */
    public function destroy(Request $request)
    {
        try {
            $id = auth()->id();
            Todo::where('user_id', $id)->delete();
            User::where('id', $id)->delete();
            auth()->guard('web')->logout();
            return response()->json(["success" => "Account Deleted"], 200);
        } catch (\Exception $e) {
            dd($e);
            return response()->json(["error" => "An error occurred while deleting the account"], 500);
        }
    }
}
