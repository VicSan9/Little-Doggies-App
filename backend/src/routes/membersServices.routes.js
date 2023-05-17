const { Router } = require('express');
const { getAllMembersServices, getMemberService, createMemberService, updateMemberService } = require('../controllers/membersServices.controller');

const router = Router();

router.get('/membersServices', getAllMembersServices)

router.get('/membersServices/:id', getMemberService)

router.post('/membersServices', createMemberService)

router.put('/membersServices/:id', updateMemberService)

module.exports = router