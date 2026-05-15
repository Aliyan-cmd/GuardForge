import httpx
import json

def test_signup_and_login():
    base_url = "http://localhost:8000"
    
    # Try signup
    signup_data = {
        "email": "test@example.com",
        "password": "password123",
        "full_name": "Test User",
        "role": "viewer"
    }
    
    print(f"Testing signup at {base_url}/auth/signup...")
    try:
        r = httpx.post(f"{base_url}/auth/signup", json=signup_data)
        print(f"Signup status: {r.status_code}")
        print(f"Signup response: {r.text}")
    except Exception as e:
        print(f"Signup failed: {e}")
        return

    # Try login
    login_data = {
        "email": "test@example.com",
        "password": "password123"
    }
    
    print(f"\nTesting login at {base_url}/auth/login...")
    try:
        r = httpx.post(f"{base_url}/auth/login", json=login_data)
        print(f"Login status: {r.status_code}")
        print(f"Login response: {r.text}")
    except Exception as e:
        print(f"Login failed: {e}")

if __name__ == "__main__":
    test_signup_and_login()
