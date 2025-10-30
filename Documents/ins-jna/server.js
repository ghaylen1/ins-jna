const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Student database - Complete list from SQL
const students = [
  { full_name: 'Badri mariem', phone_number: '21693195501', university: 'FMDM', position: 'ASSISTANT PARTENARIAT', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Amira ben hassine', phone_number: '21629808227', university: 'ISLN', position: 'ASSISTANT EVENT', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Israa laatiri', phone_number: '21652346597', university: 'FLSH', position: 'ASSISTANT RH', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Yossr baccar', phone_number: '21652081419', university: 'FLSH', position: 'Vice president(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Rima inoubli', phone_number: '21693278695', university: 'FMSO', position: 'Responsable RH', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Laabidi wejden', phone_number: '21629804912', university: 'ISTLS', position: 'Président(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Wala dhibi', phone_number: '21653019083', university: 'BEAUX ARTS', position: 'Responsable RH', member: 'Département Event', participates_in_jna: 'OUI' },
  { full_name: 'ranim gharbi', phone_number: '21650781417', university: 'IHE', position: 'Responsable Partenariat', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Jeday douaa', phone_number: '21658009725', university: 'ISTLS', position: 'ASSISTANT COMMUNICATION', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Assila sayah', phone_number: '21623881934', university: 'IHECSO', position: 'Responsable RH', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Benfraj zayneb', phone_number: '21694354659', university: 'EPI', position: 'ASSISTANT PARTENARIAT', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Douaa bouzrara', phone_number: '21650952243', university: 'BEAUX ARTS', position: 'Vice president(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Chahed Bouzrara', phone_number: '21653083156', university: 'IHE', position: 'Président(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Hajer sabbagh', phone_number: '21629245234', university: 'IHECSO', position: 'Secrétaire général(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Boutouta yosr', phone_number: '21620689451', university: 'FMSO', position: '', member: 'Département Event', participates_in_jna: 'NON' },
  { full_name: 'Boutouta Yosr', phone_number: '21620689451', university: 'FMSO', position: '', member: 'Département Event', participates_in_jna: 'OUI' },
  { full_name: 'Azzouz Maha', phone_number: '21628616003', university: 'ISLN', position: 'Responsable Event', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Hamrouni Wala', phone_number: '21626029377', university: 'FDSPSO', position: 'Secrétaire général(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Ons jlassi', phone_number: '21656041637', university: 'FDSPSO', position: 'ASSISTANT EVENT', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Rached Said', phone_number: '21628439119', university: 'BEAUX ARTS', position: 'Président(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Aya taghouti', phone_number: '21652455255', university: 'ISETSO', position: '', member: 'Département Communication', participates_in_jna: 'OUI' },
  { full_name: 'Ferchiou Nour', phone_number: '21656011289', university: 'ISIMM', position: 'Président(e)', member: '', participates_in_jna: 'NON' },
  { full_name: 'Roeya ben abdelhafidh', phone_number: '21653137011', university: 'FDSPSO', position: 'Vice president(e)', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Ghazela Mohamed Amine', phone_number: '21648046466', university: 'ISIMM', position: 'ASSISTANT COMMUNICATION', member: '', participates_in_jna: 'OUI' },
  { full_name: 'Roua hibar', phone_number: '21658204600', university: 'ISIMM', position: '', member: 'Département Partenariat', participates_in_jna: 'OUI' },
];

// Search endpoint
app.get('/api/search', (req, res) => {
  const phoneNumber = req.query.phone;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // Search for student by phone number
  const student = students.find(s => s.phone_number === phoneNumber);

  if (student) {
    return res.json({
      success: true,
      data: {
        full_name: student.full_name,
        university: student.university,
        position: student.position,
        member: student.member,
        participates_in_jna: student.participates_in_jna
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Student not found'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
