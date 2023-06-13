
# HealthyMe.com 
Ecommerce website for health and fitness products , it is a clone of HealthKart.com , It serves as a virtual storefront where customers can browse, select, and purchase items conveniently from their computers or mobile devices.


## Tech Stack

**Client:** HTML,CSS, Javascript

**Server:** Node, Express , MongoDB


## Frontend Part
- Razorpay payment gateway
- Home page
- Login/Signup
- Product page
- OAuth

## Backend Part
- Authentication using JWT
- Hashing the password using Bcrypt
- Mongoose - connecting the database
### Database - 
    - MongoDB

## API Reference


## API Reference

#### Register route

```http
  POST /api/register
```

#### Login route


```http
  POST /api/login
```

#### Add to Cart

```http
  POST /api/cart/:id/
```
```http
  DELETE /api/cart/:id/
```
```http
  PATCH /api/cart/:id/
```
```http
  GET /api/cart/:id/
```


#### Product route for admin

```http
  GET /api/product/:id/
```
```http
  DELETE /api/product/:id/
```
```http
  PATCH /api/product/:id/
```

#### For Pagination 

```http
  GET /api/product/paginate?page=3&limit=10
```
#### For Serach 

```http
  GET /api/product/?serach="protein"
```

 ### 
`USERS DATA...`

    {"name":"harsh thakur",
    "email":"harsh@gmail.com",
    "password":"123456"  }




## Screenshots
![image](https://github.com/deepakChourasiya-aj/HealthyMeeGithubOAuth/assets/109690823/4c4cfbdb-0e6e-4d50-ac06-2730fe2541de)
![image](https://user-images.githubusercontent.com/109690823/223182773-0b4fbf6a-be2e-4506-afe7-5aeec790eab6.png)




