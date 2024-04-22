
# Temp Mail

A disposable email address used for temporary communication or to avoid spam in personal or professional settings.


## API Reference

#### Get all mails

```http
GET mailapi.imnitish.dev/v1/mail/<userName>?page=1&limit=5
```
Parameter | Type | Description
--- | --- | ---
`userName` | string | Required. Your name.
`page` | number | The page number of results.
`limit` | number | The maximum number of items per page.

Returns all tha mails received on that email
