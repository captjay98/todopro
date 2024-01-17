<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        $response = $this->postJson('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertOk();
    }

    public function test_new_users_cannot_register_without_name(): void
    {
        $response = $this->postJson('/register', [
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('name');
    }

    public function test_new_users_cannot_register_without_email(): void
    {
        $response = $this->postJson('/register', [
            'name' => 'Test User',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);


        $response->assertStatus(422);
        $response->assertJsonValidationErrors('email');
    }

    public function test_new_users_cannot_register_without_password(): void
    {
        $response = $this->postJson('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password_confirmation' => 'password',
        ]);


        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function test_new_users_cannot_register_without_confirmation_password(): void
    {
        $response = $this->postJson('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }

    public function test_new_users_cannot_register_without_password_confirmation(): void
    {
        $response = $this->postJson('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password1',
            'password_confirmation' => 'password2',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('password');
    }
}
