<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use app\Http\Resources\User as UserResource;

class Todo extends JsonResource
{
    /**
     * Transform the Todo resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'completed' => $this->completed,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
        ];
    }
}
