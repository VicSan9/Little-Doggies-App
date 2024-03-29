const { Router } = require('express');
const { getAllMembers, getMember, createMember, deleteMember, updateMember, getAllMembers2 } = require('../controllers/members.controller')

const router = Router();

router.get('/members', getAllMembers)

router.get('/members2', getAllMembers2)

router.get('/members/:id', getMember)

router.post('/members', createMember)

router.delete('/members/:id', deleteMember)

router.put('/members/:id', updateMember)

module.exports = router