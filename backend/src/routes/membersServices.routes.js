const { Router } = require('express');
const { getAllMembersServices, getMemberService, createMemberService, updateMemberService, deleteMemberService } = require('../controllers/membersServices.controller');

const router = Router();

router.get('/membersServices', getAllMembersServices)

router.get('/membersServices/:id', getMemberService)

router.post('/membersServices', createMemberService)

router.delete('/membersServices/:id', deleteMemberService)

router.put('/membersServices/:id', updateMemberService)

module.exports = router