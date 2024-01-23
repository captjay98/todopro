<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use App\Http\Resources\Todo as TodoResource;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Retrieves a paginated collection of todos
     * based on the Authenticated user's ID and optional filter.
     *
     * @param  Request The request object containing the filter parameter.
     * @throws ValidationException If the filter parameter fails validation.
     * @return TodoResource A collection of todos.
     */
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
                'all' => $query->orderBy('updated_at', 'desc'),
            };
        }

        $todos = $query->paginate(6);

        return TodoResource::collection($todos);
    }

    /**
     * Store a newly created Todo in storage.
     *
     * @param  CreateTodoRequest The request object containing the todo data.
     * @return TodoResource The Todo Resource.
     */
    public function store(CreateTodoRequest $request)
    {
        $userId = auth()->id();

        $todo = Todo::create(
            [
                'user_id' => $userId,
                'title' => $request->title,
                'description' => $request->description,
                'completed' => $request->completed
            ]
        );

        return new TodoResource($todo);
    }



    /**
     * Display the specified Todo if user is Authorized.
     *
     * @param  Todo  The Todo to display
     * @return TodoResource  The Todo resource
     * @throws AuthorizationException  If the user is not authorized
     * @throws ModelNotFoundException  If the Todo is not found
     */
    public function show(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            abort(403, 'You are not allowed to perform this action.');
        }

        return new TodoResource(Todo::findOrFail($todo->id));
    }



    /**
     * Update the specified Todo
     *
     * @param  UpdateTodoRequest Request object containing updated Todo data
     * @param  Todo The Todo to Update
     * @return TodoResource  The Todo resource
     */
    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $validated_data = $request->validated();
        $todo->update($validated_data);
        return new TodoResource($todo);
    }



    /**
     * Deletes a todo if the authenticated user is Authorized.
     *
     * @param  Todo The Todo to be deleted.
     * @throws ModelNotFoundException If the todo is not found.
     * @return JsonResponse The JSON response indicating the success or error message.
     */
    public function destroy(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            abort(403, 'You are not authorized to Perform this action.');
        }
        try {
            $todo = Todo::findOrFail($todo->id);
            $todo->delete();
            return response()->json(['message' => 'Todo Deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error'  => 'Todo not found'], 404);
        }
    }
}
