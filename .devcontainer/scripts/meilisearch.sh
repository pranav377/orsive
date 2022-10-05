apk add curl

curl -X POST --header "Accept: application/json" --header "Content-Type: application/json" --header "Authorization: Bearer 1234" http://meilisearch:7700/indexes  -d '{ "uid": "all", "primaryKey": "id" }'

curl -X PATCH --header "Accept: application/json" --header "Content-Type: application/json" --header "Authorization: Bearer 1234" http://meilisearch:7700/indexes/all/settings -d '{ "displayedAttributes": ["id", "username", "name", "joined", "type", "avatar", "_count", "image", "title", "slug", "post", "content", "truncated", "width", "height" ] }'

curl -X POST --header "Accept: application/json" --header "Content-Type: application/json" --header "Authorization: Bearer 1234" http://meilisearch:7700/keys -d '{ "description": "Search key", "actions": ["search", "indexes.get", "version"], "indexes": ["all"], "expiresAt": null, "uid": "e50180b9-5062-4cbc-8d6f-8ac2b49048dd" }'