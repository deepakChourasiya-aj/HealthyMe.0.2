
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

#### User Endpoints

```http
  Signup

  POST /user/signup/
```
```http
  Login

  POST /user/login/
```
#### Get all products

```http
  GET /admin/all
```

#### Add products

```http
  POST /admin/add/
```
#### Delete products

```http
  DELETE /delete/:id
```
#### Update products

```http
  PATCH /delete/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product key` | `string` | **Required**. Your API key |


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Add items

```http
  POST /admin/add/
```

## API Endpoints
   #### Welcome
```javascript
GET  /api/
```
  #### Email Verification
```javascript
POST  /api/user/emailVerify
```
  #### User Signup
```javascript
POST  /api/user/signup
```
  #### User Signin
```javascript
POST  /api/user/signin
```
  #### User Logout
```javascript
POST  /api/user/logout
```
<!--   #### Doctor 
```javascript
GET /api/doctor/allDoctor
GET /api/doctor/search?
GET /api/doctor//allDoctor/:id
GET /api/doctor/docPending
DELETE /api/doctor/removeDoctor/:id
POST /api/doctor/addDoctor
PATCH /api/doctor/updateDoctorStatus/:id
PATCH /api/doctor//isAvailable/:doctorId
```
  #### Appointment Booking  
```javascript
GET /api/appointment/allApp/
GET /api/appointment/getApp/:appointmentId
GET /api/appointment/checkSlot/:doctorId
POST /api/appointment/create/:doctorId
POST /api/appointment//deleteSlot/:doctorId
DELETE /api/appointment/cancel/appointmentId
PATCH /api/appointment/reschedule/:appointmentId
```
  #### Appointment Admin CRUD Operations
 ```javascript
 GET /api/appointment/all/
 GET /api/appointment/allPending
 DELETE /api/appointment/reject/:appointmentId
 PATCH /api/appointment/approve/:appointmentId
 ``` -->

 ### 
`USERS DATA...`

    {"first_name":"harsh thakur",
    "last_name":"thakur",
    "email":"harsh@gmail.com",
    "mobile":"909999345",
    "password":"123456"  }

 ### 
`DOCTORS DATA...`

    {"doctorName":"Deepak chourasiya",
    "email":"deepak1812002@gmail.com",
    "qualifications":"MBBS from AIMS Delhi",
    "experience":"14 years of experience",
    "phoneNo":"7999764766",
    "city":"Mumbai",
    "departmentId":1,
    "status":true,
    "isAvailable":true;
    "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJO1Bmu2stkBmmOJXmyHN5G7UHmeA4xr5z0whR9JZF&s" }

 ### 
`APPOINTMENT DATA...`

    {"patientId":"64256f28b1fc4d36b5a12be7",
    "doctorId":"6425319914291e303a3cf2c4",
    "ageOfPatient":40,
    "gender":"male",
    "address":"Mumbai woribali",
    "problemDescription":"having some problem related to neourology ",
    "appointmentDate":"30-03-2023",
    "createdAt":,
    "updatedAt":,
    "paymentStatus":false} 
    
   
<div align = "center">  
  



## Screenshots
![image](https://github.com/deepakChourasiya-aj/HealthyMeeGithubOAuth/assets/109690823/4c4cfbdb-0e6e-4d50-ac06-2730fe2541de)
![image](https://user-images.githubusercontent.com/109690823/223182773-0b4fbf6a-be2e-4506-afe7-5aeec790eab6.png)




