<?php

namespace Tests\Feature;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;






class TodoTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_a_get_list_of_todos()
    {
        $user = User::factory()->create();
        $todos = Todo::factory()->count(3)->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->getJson(route('todos.index'));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'description', 'completed']
            ]
        ]);
        $response->assertJsonCount(3, 'data');
    }


    public function test_todos_result_is_paginated()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        Todo::factory()->count(60)->create(['user_id' => $user->id]);
        Todo::factory()->count(10)->create();
        $response = $this->getJson(route('todos.index'));
        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => []
            ],
            'links',
            'meta',
        ]);
        $this->assertCount(6, $response->json('data'));

        foreach ($response->json('data') as $todo) {

            $this->assertEquals($user->id, $todo['user_id']);
        }
    }


    public function test_cannot_get_list_of_other_users_todos()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $todos = Todo::factory()->count(3)->create(['user_id' => $user->id]);
        $todos2 = Todo::factory()->count(3)->create(['user_id' => $user2->id]);
        $response = $this->actingAs($user2)->getJson(route('todos.index'));

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                '*' => ['id', 'title', 'description', 'completed']
            ]
        ]);
        $response->assertJsonCount(3, 'data');
    }


    public function test_cannot_create_todo_if_user_is_not_authenticated()
    {
        $this->withExceptionHandling();

        $response = $this->postJson(route('todos.store'), [
            'title' => 'Sample Todo',
            'description' => 'This is a sample todo item.',
            'completed' => false
        ]);

        $response->assertStatus(401);
        $this->assertDatabaseMissing('todos', ['title' => 'Sample Todo']);
    }

    public function test_can_create_a_todo()
    {
        $user = User::factory()->create();

        $todoData = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'completed' => false,
        ];

        $response = $this->actingAs($user)->postJson(route('todos.store'), $todoData);

        $response->assertCreated();

        $response->assertJsonFragment([

            'user_id' => $user->id,
            'title' => $todoData['title'],
            'description' => $todoData['description'],
            'completed' => $todoData['completed'],
        ]);

        $this->assertDatabaseHas('todos', $todoData);
    }


    public function test_cannot_create_a_todo_without_title()
    {
        $this->withExceptionHandling();
        $user = User::factory()->create();

        $todoData = [
            'description' => $this->faker->paragraph,
            'completed' => false,
        ];

        $response = $this->actingAs($user)->postJson(route('todos.store'), $todoData);

        $response->assertStatus(422);

        $response->assertJsonMissing([

            'user_id' => $user->id,
            'description' => $todoData['description'],
            'completed' => $todoData['completed'],
        ]);

        $this->assertDatabaseMissing('todos', $todoData);
    }

    public function test_cannot_create_a_todo_without_description()
    {
        $this->withExceptionHandling();
        $user = User::factory()->create();

        $todoData = [
            'completed' => false,
        ];

        $response = $this->actingAs($user)->postJson(route('todos.store'), $todoData);

        $response->assertStatus(422);

        $response->assertJsonMissing([

            'user_id' => $user->id,
            'completed' => $todoData['completed'],
        ]);
        $this->assertDatabaseMissing('todos', $todoData);
    }

    public function test_cannot_create_a_todo_without_completed()
    {
        $this->withExceptionHandling();
        $user = User::factory()->create();

        $todoData = [
            'description' => $this->faker->paragraph,
        ];

        $response = $this->actingAs($user)->postJson(route('todos.store'), $todoData);

        $response->assertStatus(422);

        $response->assertJsonMissing([

            'user_id' => $user->id,
            'description' => $todoData['description'],
        ]);
        $this->assertDatabaseMissing('todos', $todoData);
    }


    public function test_can_show_a_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->getJson(route('todos.show', $todo->id));


        $response->assertOk();
        $response->assertJsonFragment([
            'id' => $todo->id,
            'title' => $todo->title,
            'description' => $todo->description,
            'completed' => $todo->completed,
        ]);
    }

    public function test_cannot_show_another_users_todo()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user2)->getJson(route('todos.show', $todo->id));
        $response->assertForbidden();
    }

    public function test_can_update_a_todo()
    {
        $user = User::factory()->create();

        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'completed' => true,
        ];
        $response = $this->actingAs($user)->putJson(route('todos.update', $todo->id), $updateData);
        $response->assertOk();
        $this->assertDatabaseHas('todos', $updateData);
    }

    public function test_can_update_just_title_of_a_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $updateData = [
            'completed' => true,
        ];
        $response = $this->actingAs($user)->putJson(route('todos.update', $todo->id), $updateData);
        $response->assertOk();
        $this->assertDatabaseHas('todos', $updateData);
    }

    public function test_can_update_just_description_of_a_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $updateData = [
            'description' => 'Updated Description',
        ];
        $response = $this->actingAs($user)->putJson(route('todos.update', $todo->id), $updateData);
        $response->assertOk();
        $this->assertDatabaseHas('todos', $updateData);
    }

    public function test_can_update_just_completed_of_a_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $updateData = [
            'completed' => true,
        ];
        $response = $this->actingAs($user)->putJson(route('todos.update', $todo->id), $updateData);
        $response->assertOk();
        $this->assertDatabaseHas('todos', $updateData);
    }

    public function test_cannot_update_another_users_todo()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $updateData = [
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'completed' => true,
        ];
        $response = $this->actingAs($user2)->putJson(route('todos.update', $todo->id), $updateData);
        $response->assertForbidden();
        $this->assertDatabaseMissing('todos', $updateData);
    }

    public function test_can_delete_a_todo()
    {
        $user = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user)->deleteJson(route('todos.destroy', $todo->id));
        $response->assertStatus(204);
        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }

    public function test_cannot_delete_another_users_todo()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $todo = Todo::factory()->create(['user_id' => $user->id]);
        $response = $this->actingAs($user2)->deleteJson(route('todos.destroy', $todo->id));
        $response->assertForbidden();
        $this->assertDatabaseHas('todos', ['id' => $todo->id]);
    }



    public function test_can_filter_todo_with_completed_true()
    {
        $user = User::factory()->create();
        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => true,
        ]);
        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/todos?filter=true');

        $response->assertStatus(200);
        $response->assertJsonFragment(['completed' => true]);
    }

    public function test_can_filter_todo_with_completed_false()
    {
        $user = User::factory()->create();
        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => true,
        ]);
        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/todos?filter=false');

        $response->assertStatus(200);
        $response->assertJsonFragment(['completed' => false]);
    }

    public function test_can_filter_todo_with_newest()
    {
        $user = User::factory()->create();

        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => true,
        ]);

        $latestTodo = Todo::factory()->create([
            'user_id' => $user->id,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/todos?filter=newest');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $latestTodo->id,
                'completed' => false
            ]);
    }

    public function test_can_filter_todo_with_oldest()
    {
        $user = User::factory()->create();

        $firstTodo = Todo::factory()->create([
            'user_id' => $user->id,
            'completed' => true,
        ]);

        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/todos?filter=oldest');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $firstTodo->id,
                'completed' => true
            ]);
    }

    public function test_can_filter_todo_with_all()
    {
        $user = User::factory()->create();
        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => true,
        ]);
        Todo::factory()->count(3)->create([
            'user_id' => $user->id,
            'completed' => false,
        ]);

        $response = $this->actingAs($user)->getJson('/api/todos?filter=all');

        $response->assertStatus(200);
    }
}
