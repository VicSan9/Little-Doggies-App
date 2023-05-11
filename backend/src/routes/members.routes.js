const { Router } = require('express');
const { getAllMembers, getMember, createMember, deleteMember, updateMember } = require('../controllers/members.controller')

const router = Router();

router.get('/members', getAllMembers)

router.get('/members/10', getMember)

router.post('/members', createMember)

router.delete('/members', deleteMember)

router.put('/members', updateMember)

module.exports = router