<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title, 
            'description' => $this->description,
            'tag_id' => $this->tag_id,
            'isCompleted' => boolval($this->isCompleted),
            'dueDate' => Carbon::parse($this->dueDate)->format('Y-m-d'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'tag' => $this->whenLoaded('tag'),
            'comments' => $this->whenLoaded('comments'),
        ];
    }
    


    public static $wrap = '';
}
