<?php

namespace App\Http\Controllers;

use App\Models\unit_information;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;



class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$units = unit_information::all();
        $units = unit_information::oldest()->paginate();
        return $units;
        //return $units;
        //$users = DB::table('users')->select('id','name','email')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { 
        // $imageData = $request->input('base64data');
        // $imageData = str_replace('data:image/png;base64,', '', $imageData); // remove data URI scheme header
    
        // $imageBinary = base64_decode($imageData);
        // $filename = uniqid() . '.png';
        // $path = '/opt/lampp/htdocs/rnrbackend/storage/app/images/' . $filename;
        // file_put_contents($path, $imageBinary);
            $validatedData = $request->validate([
                'unitNumber' => 'required',
                'receiveDate' => 'required|date',
                'initialFault' => 'required',
                'deliverDate' => 'required|date',
                'moreFaults' => 'nullable',
                'imageUrl' => 'nullable',
                ]);
            $data = new unit_information();
            $data->unitNumber = $validatedData['unitNumber'];
            $data->receiveDate = $validatedData['receiveDate'];
            $data->initialFault = $validatedData['initialFault'];
            $data->deliverDate = $validatedData['deliverDate'];
            $data->moreFaults = $validatedData['moreFaults'];
            $data->imageUrl = $validatedData['imageUrl'];
            $data->save();
            return response()->json(['message' => 'Data saved successfully']);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $unit_info_id)
{
    $unitInfo = unit_information::find($unit_info_id);

    if (!$unitInfo) {
        return response()->json(['message' => 'UnitInfo not found'], 404);
    }

    $unitInfo->deliverDate = $request->deliverDate;
    $unitInfo->imageUrl = $request->imageUrl;
    $unitInfo->initialFault = $request->initialFault;
    $unitInfo->moreFaults = $request->moreFaults;
    $unitInfo->receiveDate = $request->receiveDate;
    $unitInfo->unitNumber = $request->unitNumber;
    $unitInfo->updated_at = $request->updated_at;

    $unitInfo->save();

    return response()->json(['message' => 'UnitInfo updated successfully'], 200);
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('unit_informations')->where('unit_info_id', '=', $id)->delete();

        return response()->json(['message' => 'Unit Deleted'], 200);
    }
    public function search(Request $request)
    {
        $query = $request->input('query');
        $results = unit_information::where('unitNumber', 'LIKE', "%$query%")
            ->orWhere('initialFault', 'LIKE', "%$query%")
            ->orWhere('moreFaults', 'LIKE', "%$query%")
            ->get();

        return response()->json($results);
    }
}