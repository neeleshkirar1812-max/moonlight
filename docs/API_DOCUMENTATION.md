# Lumière Studios — Full-Stack API Documentation

Comprehensive REST API reference for the Lumière Studios luxury wedding media platform.

---

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. Register Customer
- **Endpoint**: `POST /auth/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "name": "Aarav Singhania",
    "email": "aarav@gmail.com",
    "password": "Password@2026",
    "phone": "+919820012345",
    "partnerName": "Ananya Goenka",
    "weddingDate": "2026-11-20"
  }
  ```
- **Response**: `201 Created` with JWT access token and user object.

### 2. Login
- **Endpoint**: `POST /auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "admin@lumierestudios.com",
    "password": "Admin@2026"
  }
  ```
- **Response**: `200 OK` with access token, refresh token cookie, and role.

### 3. Get Current User Profile
- **Endpoint**: `GET /auth/me`
- **Access**: Private (`customer`, `employee`, `admin`, `superadmin`)
- **Headers**: `Authorization: Bearer <token>`

---

## Enquiry & Wedding Planner Endpoints

### 1. Submit 8-Step Interactive Planner Enquiry
- **Endpoint**: `POST /enquiries`
- **Access**: Public (with rate limiting)
- **Body**:
  ```json
  {
    "eventType": "Royal Palace Wedding",
    "eventDate": "2026-12-14",
    "location": { "city": "Udaipur", "venue": "The Oberoi Udaivilas" },
    "guestCount": 450,
    "requiredServices": ["Photography", "Cinematography", "Drone Cinematography", "Luxury Physical Albums"],
    "budgetRange": "₹15,00,000 – ₹25,00,000",
    "storyDetails": "Celebrating our 3-day royal palace wedding in Udaipur with sunset boat procession.",
    "customerDetails": {
      "fullName": "Aarav Singhania & Ananya Goenka",
      "email": "aarav.ananya@gmail.com",
      "phone": "+919820012345"
    }
  }
  ```
- **Response**: `201 Created` with unique ID e.g. `ENQ-2026-89421`.

### 2. Dispatch Formal Quotation
- **Endpoint**: `POST /enquiries/:id/quotation`
- **Access**: Admin, Super Admin
- **Body**:
  ```json
  {
    "totalAmount": 1850000,
    "advanceRequired": 462500,
    "notes": "Includes 2 Lead Directors, 4K Cinema Docu-film, Aerial Drone, and 2 Handcrafted Italian Leather Albums."
  }
  ```

### 3. Convert Enquiry to Confirmed Booking
- **Endpoint**: `POST /enquiries/:id/convert-to-booking`
- **Access**: Admin, Super Admin
- **Response**: `201 Created` with booking number e.g. `LUM-2026-10492`.

---

## Razorpay Payment Endpoints

### 1. Create Razorpay Order
- **Endpoint**: `POST /payments/create-order`
- **Access**: Private (Customer)
- **Body**:
  ```json
  {
    "bookingId": "65e01...",
    "amount": 462500,
    "paymentType": "ADVANCE"
  }
  ```

### 2. Verify Razorpay Signature
- **Endpoint**: `POST /payments/verify`
- **Access**: Private (Customer)
- **Body**:
  ```json
  {
    "razorpay_order_id": "order_NX...",
    "razorpay_payment_id": "pay_NY...",
    "razorpay_signature": "hmac_sha256_hash...",
    "paymentId": "65e02..."
  }
  ```

---

## Private Customer Galleries

### 1. Access Private Album (with PIN check)
- **Endpoint**: `GET /galleries/:id?pin=2026`
- **Access**: Private (Customer ownership enforced)
- **Security**: Verifies customer ID matches gallery owner. If PIN is required, checks `accessPin`.

### 2. Toggle Favorite Photo
- **Endpoint**: `POST /galleries/items/:itemId/favorite`
- **Access**: Private (Customer)

---

## Super Admin Endpoints

- `GET /super-admin/admins`: List admin accounts with permission flags.
- `POST /super-admin/admins`: Create new admin account with granular permissions.
- `GET /super-admin/audit-logs`: Query immutable security audit log trail.
- `GET /super-admin/system-config`: Inspect runtime environment and service diagnostics.
