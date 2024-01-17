<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_update_profile(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson(
            '/api/profile',
            [
                'email' => 'example@email.com',
                'name' => 'New Name',
            ]
        );

        $response->assertOk();
    }

    public function test_users_can_update_just_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson(
            '/api/profile',
            [
                'name' => 'New Name',
            ]
        );

        $response->assertOk();
    }

    public function test_users_can_update_just_email(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson(
            '/api/profile',
            [
                'email' => 'example@email.com',
            ]
        );

        $response->assertOk();
    }

    public function test_user_cannot_update_profile_with_existing_email(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson(
            '/api/profile',
            [
                'email' => $user->email,
                'name' => 'New Name',
            ]
        );
        $response->assertJsonValidationErrors('email');
        $response->assertStatus(422);
    }

    public function test_user_cannot_update_profile_with_abother_users_emaill(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $response = $this->actingAs($user)->putJson(
            '/api/profile',
            [
                'email' => $user2->email,
                'name' => 'New Name',
            ]
        );

        $response->assertJsonValidationErrors('email');
        $response->assertStatus(422);
    }

    public function test_users_can_delete_account(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->deleteJson('/api/profile');

        $response->assertOk();
    }
}
