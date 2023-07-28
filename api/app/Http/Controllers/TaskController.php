<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskResource::collection(Task::when(request('search'), function ($q) {
            $q->where('title', 'like', '%' . request('search') . '%')
                ->orWhere('description', 'like', '%' . request('search') . '%');
        })->when(request('isCompleted'), function ($q) {
            $q->where('isCompleted', request('isCompleted') === 'true' ? true : false);
        })->when(request('tag_id'), function ($q) {
            $q->where('tag_id', request('tag_id'));
        })->when(request('sort'), function ($q) {
            $q->orderBy('id', request('sort', 'asc'));
        })->where('user_id', auth()->id())
            ->with('tag')
            ->withCount('comments')
            ->paginate(10));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $task = Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'tag_id' => $request->tag_id,
                'isCompleted' => boolval($request->isCompleted),
                'user_id' => auth()->id(),
                'dueDate' => $request->dueDate
            ]);
            return response()->json(TaskResource::make($task), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task->load('comments', 'tag');
        return TaskResource::make($task);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'tag_id' => $request->tag_id,
                'isCompleted' => boolval($request->isCompleted),
                'dueDate' => $request->dueDate
            ]);
            return response()->json($task, Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        try {
            $task->delete();
            return response()->json(null, Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
