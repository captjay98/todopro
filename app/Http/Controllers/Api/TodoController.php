<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use App\Http\Resources\Todo as TodoResource;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class TodoController extends Controller
{


    public function index(Request $request)
    {
        $userId = auth()->id();

        $query = Todo::where('user_id', $userId);

        if ($request->has('filter')) {
            $filter = $request->input('filter');

            $request->validate(['filter' => ['in:true,false,newest,oldest,all']]);

            match ($filter) {
                'true' => $query->where('completed', true),
                'false' => $query->where('completed', false),
                'newest' => $query->orderBy('created_at', 'desc'),
                'oldest' => $query->orderBy('created_at', 'asc'),
                'all' => null,
            };
        }

        $todos = $query->paginate(6);

        return TodoResource::collection($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTodoRequest $request)
    {
        $id = auth()->id();
        $todo = Todo::create(
            [
                'user_id' => $id,
                'title' => $request->title,
                'description' => $request->description,
                'completed' => $request->completed
            ]
        );
        return response()->json(['todo' => $todo], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {

            abort(403, 'You are not allowed to perform this action.');
        }
        return new TodoResource(Todo::findorfail($todo->id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $validated_data = $request->validated();

        $todo->update($validated_data);
        // return new TodoResource($todo);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {

            abort(403, 'You are not authorized to Perform this action.');
        }
        try {
            $todo = Todo::findOrFail($todo->id);
            $todo->delete();
            return response()->json(['success' => ['message' => 'Todo Deleted']], 204);
        } catch (ModelNotFoundException $e) {

            return response()->json(['error' => ['message' => 'Todo not found']], 404);
        }
    }
}
