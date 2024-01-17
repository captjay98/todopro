<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PasswordUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->putJson('/change-password', [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertOk();

        $this->assertTrue(Hash::check('new-password', $user->refresh()->password));
    }

    public function test_correct_password_must_be_provided_to_update_password(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->putJson('/change-password', [
                'current_password' => 'wrong-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response
            ->assertStatus(422);
        $response->assertJsonValidationErrors('current_password');
    }

    public function test_new_password_and_confirmation_must_match_to_update_password(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->putJson('/change-password', [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'newssword',
            ]);

        $response
            ->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function test_new_password_must_be_atleast_8_characters_long_to_update_password(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->putJson('/change-password', [
                'current_password' => 'password',
                'password' => 'new',
                'password_confirmation' => 'new',
            ]);

        $response
            ->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }
}
