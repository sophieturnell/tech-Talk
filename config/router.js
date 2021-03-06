const router = require('express').Router()
const events = require('../controllers/events')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoot')

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/events/:id')
  .get(events.show)
  .put(secureRoute, events.update)
  .delete(secureRoute, events.delete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)
  .post(secureRoute, users.updateProfile)

router.route('/events/:id/comments')
  .post(secureRoute, events.commentCreate)
  .put(secureRoute, events.commentUpdate)

router.route('/events/:id/comments/:commentId')
  .delete(secureRoute, events.commentDelete)

router.route('/events/:id/attend')
  .post(secureRoute, events.attendEvent)
  
router.route('/events/:id/unattend')
  .post(secureRoute, events.unAttendEvent)

module.exports = router




