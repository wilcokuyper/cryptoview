#!/bin/sh
set -e

# Write OAuth keys from environment variables
if [ -n "$OAUTH_PUBLIC_KEY" ]; then
    echo "$OAUTH_PUBLIC_KEY" > /var/www/html/storage/oauth-public.key
    chmod 600 /var/www/html/storage/oauth-public.key
fi

if [ -n "$OAUTH_PRIVATE_KEY" ]; then
    echo "$OAUTH_PRIVATE_KEY" > /var/www/html/storage/oauth-private.key
    chmod 600 /var/www/html/storage/oauth-private.key
fi

# Execute the passed command (defaults to CMD in Dockerfile)
exec "$@"
