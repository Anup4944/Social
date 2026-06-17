---
name: MERN social app key decisions
description: Stack, build pipeline, and patterns established during the senior dev review session
---

## Build pipeline
Vite 4 frontend builds to `frontend/build/`; backend Express (`backend/app.js`) serves static from `../frontend/build`. Always run `cd frontend && npm run build` after frontend changes, then restart the "Start application" workflow.

## Redux pattern
All reducers converted to RTK builder-callback pattern (not object-map). Never revert to object-map — RTK 2.0 drops it.

## Error handling in actions
All action creators use `getErrMsg(err)` helper: `err?.response?.data?.message ?? err?.message ?? "Something went wrong"`. This guards against network errors where `err.response` is undefined.

## Cookie security
`cookieOptions` constant in `backend/controllers/user.js` sets `secure: process.env.NODE_ENV === "production"` and `sameSite: "strict"`. Reuse for any new auth endpoints.

**Why:** Cookies were missing these flags; dev works without `secure` but production needs it.

## N+1 query fix
`getMyPosts` and `getUserPosts` use `Post.find({ _id: { $in: user.posts } })` — never use a for-loop of `findById` calls.

## ObjectId comparison
Always use `.toString()` when comparing Mongoose ObjectIds in JavaScript (`id.toString() === other.toString()`). Direct `===` always returns false.

## resetPassword save order
`await user.save()` must come BEFORE `res.status(200).json(...)` — response was being sent before the DB write, silently losing the new password.
