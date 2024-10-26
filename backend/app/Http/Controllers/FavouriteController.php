<?php

namespace App\Http\Controllers;

use App\Models\Announce;
use App\Models\Favourite;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FavouriteController extends Controller
{


    public function index()
    {
        $user = Auth::guard('sanctum')->user();

        $announces = $user->favourites()->with('announce.images')->get();

        return response()->json(['favourites' => $announces, 'status' => 200]);        

    }

    public function store(Request $request)
    {
        $user = Auth::guard('sanctum')->user();


        $favourite = Favourite::create([
            'user_id' => $user->user_id,
            'announce_id' => intval($request->announce_id)
        ]);

        return response()->json(['favourite' => $favourite, 'status' => 201]);
    }

    public function show($id)
    {
        $user = Auth::guard('sanctum')->user();

        $announce = Announce::with('images')->with('user')->findOrFail($id);

        $isFavourite = Favourite::where('user_id', $user->user_id )
            ->where('announce_id', $id)
            ->exists();
        
        return response()->json(['announce' => $announce, 'isFavourite' => $isFavourite, 'status' => 200]);

    }

    public function destroy($id)
    {

        $user = Auth::guard('sanctum')->user();

        $favourite = Favourite::where('announce_id', $id)->where('user_id', $user->user_id);

        if (!$favourite) {
            return response()->json(['error' => 'Favourite not found'], 404);
        }

        $favourite->delete();

        return response()->json(['announce_id' => $id, 'status' => 200]);
    }
}
