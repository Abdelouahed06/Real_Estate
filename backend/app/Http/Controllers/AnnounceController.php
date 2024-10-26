<?php

namespace App\Http\Controllers;

use App\Models\Announce;
use App\Models\AnnounceImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AnnounceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $announces = Announce::with('images')->get();
        return response()->json(['announces' => $announces, 'status' => 200]);
    }


    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validate = Validator::make($request->all(), [
                'user_id' => ['required'],
                'title' => ['required', 'max:255'],
                'address' => ['required'],
                'num_rooms' => ['required'],
                'num_bathrooms' => ['required'],
                'space' => ['required'],
                'price' => ['required'],
                'type' => ['required', Rule::in(['house', 'apartment', 'villa'])],
                'city' => ['required', 'max:30'],
                'description' => ['required'],
                'pictures.*' => 'required|image|mimes:jpeg,png,jpg,gif',
                'pictures' => 'required|array|min:4|max:8',
            ]);

            if ($validate->fails()) {
                return response()->json(['errors' => $validate->errors(), 'status' => 401]);
            }

            $announce = Announce::create([
                'user_id' => $request->user_id,
                'title' => $request->title,
                'address' => $request->address,
                'num_rooms' => $request->num_rooms,
                'num_bathrooms' => $request->num_bathrooms,
                'space' => $request->space,
                'price' => $request->price,
                'type' => $request->type,
                'city' => $request->city,
                'description' => $request->description,
            ]);

            if ($request->has('pictures')) {
                foreach ($request->pictures as $picture) {
                    $imageName = uniqid() . '.' . $picture->extension();
                    $picture->move(public_path('images'), $imageName);
                    AnnounceImage::create([
                        'announce_id' => $announce->announce_id,
                        'image' => $imageName
                    ]);
                }
            }

            DB::commit();

            return response()->json(['message' => 'The announce was created successfully', 'status' => 201]);
        } catch (\Exception $e) {

            DB::rollback();
            return response()->json(['error' => 'Failed to create the announce.', 'details' => $e->getMessage(), 'status' => 500]);
        }
    }


    public function myAnnounces(Request $request)
    {
        $announces = Announce::where('user_id', $request->userId)->with('images')->get();
        if (!$announces) {
            return response()->json(['message' => 'announces does not found', 'status' => 404]);
        }
        return response()->json(['myAnnounces' => $announces, 'status' => 200]);
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        // $announce = Announce::where('announce_id', $request->id)->with('images')->first();
        // if (!$announce) {
        //     return response()->json(['message' => 'announce does not found', 'status' => 404]);
        // }
        return response()->json(['announce' => $request->all(), 'status' => 200]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $announce = Announce::where('announce_id', $id)->first();
        if (!$announce) {
            return response()->json(['message' => 'announce does not found', 'status' => 404]);
        }
        DB::beginTransaction();

        try {
            $validate = Validator::make($request->all(), [
                'user_id' => ['required'],
                'title' => ['required', 'max:255'],
                'address' => ['required'],
                'num_rooms' => ['required'],
                'num_bathrooms' => ['required'],
                'space' => ['required'],
                'price' => ['required'],
                'type' => ['required', Rule::in(['house', 'apartment', 'villa'])],
                'city' => ['required', 'max:30'],
                'description' => ['required'],
                'pictures.*' => 'image|mimes:jpeg,png,jpg,gif',
                'pictures' => 'array|min:4|max:8',
            ]);

            if ($validate->fails()) {
                return response()->json(['errors' => $validate->errors(), 'status' => 401]);
            }

            $announce->user_id = $request->user_id;
            $announce->title = $request->title;
            $announce->address = $request->address;
            $announce->num_rooms = $request->num_rooms;
            $announce->num_bathrooms = $request->num_bathrooms;
            $announce->space = $request->space;
            $announce->price = $request->price;
            $announce->type = $request->type;
            $announce->city = $request->city;
            $announce->description = $request->description;
            $announce->save();
            if ($request->has('pictures')) {
                AnnounceImage::where('announce_id', $id)->delete();
                foreach ($request->pictures as $picture) {
                    $imageName = uniqid() . '.' . $picture->extension();
                    $picture->move(public_path('images'), $imageName);
                    AnnounceImage::create([
                        'announce_id' => $announce->announce_id,
                        'image' => $imageName
                    ]);
                }
            }

            DB::commit();

            return response()->json(['message' => 'The announce was updated successfully', 'status' => 200]);
        } catch (\Exception $e) {

            DB::rollback();
            return response()->json(['error' => 'Failed to update the announce.', 'details' => $e->getMessage(), 'status' => 500]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $announce = Announce::where('announce_id', $id)->first();
        // dd($announce);
        if (!$announce) {
            return response()->json(['message' => 'announce does not found', 'status' => 404]);
        }

        $announce->delete();
        return response()->json(['announce_id' => $id, 'status' => 200]);
    }
}
