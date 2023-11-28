# API Documentation

## Introduction

This is an API document for Frontend understand more about
Endpoint - Request - Response - Error Handling…

## Notes:

datetime format: yyyy-MM-dd hh:mm

<details>
  <summary> Create a campaign </summary>

<b>- Endpoint:</b> /api/campaigns
<br>
<b>- Method:</b> [POST]
<br>
<b>- Request:</b>
<br>
<i>+ Token:</i> Bearer
<br>
<i>+ Body:</i>
<br>

```python
{
  "campaign_name": str,
  "status": boolean,
  "start_date": datetime,
  "end_date" : datetime,
  "budget": int,
  "bid_amount": int,
  "creative": {
    "title" : str,
    "description": str,
    "creative_review": str,
    "url": str,
  }
}
```

  <br>
  <b>- Response:</b>
  <br>
  <i>+ Status code: 200</i>
  <br>

```python
{
  "msg" : "Campaign is created"
}
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 400</i>

```python
{
  "detail" : "Campaign isn't created"
}
```

</details>

<details>
  <summary> Get a campaign </summary>

<b>- Endpoint:</b> /api/campaigns/[campaign_id]
<br>
<b>- Method:</b> [GET]
<br>
<b>- Request:</b>
<br>
<i>+ Token:</i> Bearer
<br>
<b>- Response:</b>
<br>
<i>+ Status code: 200</i>
<br>

```python
{
  "campaign_id" : str,
  "campaign_name" : str,
  "status": bool,
  "used_amount" : int,
  "usage_rate" : float,
  "budget": int,
  "bid_amount": int,
  "start_date" : datetime,
  "end_date": datetime,
  "creative": [{
    "title" : str,
    "description": str,
    "creative_review": str,
    "url": str,
  }
  ...
  ]
}
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 404</i>

```python
{
  "detail" : "Not Found Campaign"
}
```

</details>

<details>
  <summary> Get the number of campaign pages </summary>

<b>- Endpoint:</b> /api/campaigns/pages
<br>
<b>- Method:</b> [GET]
<br>
<b>- Request:</b>
<br>
<i>+ Token:</i> Bearer
<br>
<b>- Response:</b>
<br>
<i>+ Status code: 200</i>
<br>

```python
{
  "the_number_of_pages" : int
}
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 404</i>

```python
{
  "detail" : "Not Found any pages"
}
```

</details>

<details>
  <summary> Get a page of campaigns </summary>

<b>- Endpoint:</b> /api/campaigns/
<br>
<b>- Method:</b> [GET]
<br>
<b>- Request:</b>
<br>
<i>+ Token:</i> Bearer
<br>
<i>+ Parameters:</i>
<br>

```python
"page" : int
```

  <br>
  <b>- Response:</b>
  <br>
  <i>+ Status code: 200</i>
  <br>

```python
{
  "campaigns" : [
  {
    "campaign_id" : str,
    "campaign_name" : str,
    "status": bool,
    "used_amount" : int,
    "usage_rate" : float,
    "budget": int,
    "bid_amount": int,
    "start_date" : datetime,
    "end_date": datetime,
    "creative": [{
      "title" : str,
      "description": str,
      "creative_review": str,
      "url": str,
  }
  ...
  ]
},
  ...
  ]
}
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 404</i>

```python
{
  "detail" : "Not Found any Campaigns"
}
```

</details>

<details>
  <summary> Update a campaign </summary>

<b>- Endpoint:</b> /api/campaigns
<br>
<b>- Method:</b> [PUT]
<br>
<b>- Request:</b>
<br>
<i>+ Token:</i> Bearer
<br>
<i>+ Body:</i>
<br>

```python
{
  "campaign_id" : str,
  "campaign_name": str,
  "status": boolean,
  "budget": int,
  "bid_amount": int,
  "start_date": datetime,
  "end_date": datetime,
  "update_at": datetime,
  "creative": {
    "title" : str,
    "description": str,
    "creative_review": str,
    "url": str,
  }
}
```

  <br>
  <b>- Response:</b>
  <br>
  <i>+ Status code: 200</i>
  <br>

```python
{
  "msg" : "Campaign is updated"
}
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 400</i>

```python
{
  "detail" : "Campaign isn't updated"
}
```

<i>+ Status code: 404</i>

```python
{
  "detail" : "Not found campaign"
}
```

</details>

<details>
  <summary> Delete campaigns </summary>

<b>- Endpoint:</b> /api/campaigns/
<br>
<b>- Method:</b> [PATCH]
<br>
<b>- Request:</b>
<br>
<i>+ Token:</i> Bearer
<br>
<i>+ Body:</i>
<br>

```python
{
  "campaign_ids" : [
    {
      "campaign_id" :str
    },
    {
      "campaign_id" :str
    },
    ...
  ]

}
```

  <br>
  <b>- Response:</b>
  <br>
  <i>+ Status code: 200</i>
  <br>

```python
{
  "msg" : "Delete successful"
}
```

<i>+ Status code: 401</i>

```python
{
  "detail" : "Unauthorized user"
}
```

<i>+ Status code: 400</i>

```python
{
  "detail" : "Delete failed"
}
```

</details>
