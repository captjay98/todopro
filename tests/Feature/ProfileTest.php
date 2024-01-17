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
                'password' => 'password',
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
                'password' => 'password',
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
                'password' => 'password',
            ]
        );

        $response->assertJsonValidationErrors('email');
        $response->assertStatus(422);
    }
}
