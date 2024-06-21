# Setup and Deploy with Ansible

## Dependencies

- Ansible
- Server with Debian Linux

## Secrets

vars/secrets.yaml
```yaml
nylas_client_id: ""
nylas_api_key: ""
nylas_api_uri: "https://api.us.nylas.com"

jwt_secret: ""
jwt_admin_secret: ""

openai_api_key: ""

sendgrid_api_key: ""

twilio_account_sid: ""
twilio_auth_token: ""
twilio_verify_sid: ""

open_weather_api_uri: "https://api.openweathermap.org/data/3.0"
open_weather_api_key: ""

google_maps_api_key: ""

email_from: ""
email_from_name: ""

postgres_password: ""
postgres_host: ""
```

## Setup Server

Must enter the SSH configuration in the .ssh/config file, example:

~/.ssh/config
```conf
Host aws-garzon
    Hostname <IP>
    Port <PORT>
    User admin
    IdentitiesOnly yes
    IdentityFile ~/.ssh/<PEM>.pem
```

### Server Config

The server config can be executed at any time.

```bash
ansible-playbook role-setup.yaml
```

### Local env

This role writes the .env file to the local backend folder. Therefore, whenever an environment variable is added to the backend, it must be updated via Ansible.

```bash
ansible-playbook role-local-env.yaml
```
