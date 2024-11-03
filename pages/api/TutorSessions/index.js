// C:\Users\User\Downloads\The-Tutor-App\pages\api\TutorSessions\index.js

import { NextApiRequest, NextApiResponse } from 'next';

const dummyData = [
  {
    tutorName: 'John Doe',
    studentName: 'Jane Smith',
    course: 'Mathematics',
    module: 'Algebra',
    tutorDate: '2023-10-01',
    duration: '1 hour',
    status: 'Upcoming',
  },
  {
    tutorName: 'Alice Johnson',
    studentName: 'Bob Brown',
    course: 'Physics',
    module: 'Mechanics',
    tutorDate: '2023-10-02',
    duration: '2 hours',
    status: 'Ongoing',
  },
  {
    tutorName: 'Michael Green',
    studentName: 'Sara White',
    course: 'Chemistry',
    module: 'Organic Chemistry',
    tutorDate: '2023-09-30',
    duration: '1.5 hours',
    status: 'Cancelled',
  },
  {
    tutorName: 'David Black',
    studentName: 'Emily Davis',
    course: 'Biology',
    module: 'Cell Biology',
    tutorDate: '2023-10-03',
    duration: '3 hours',
    status: 'Cancelled',
  },

  {
    tutorName: 'Eric Clark',
    studentName: 'Frank Wilson',
    course: 'English',
    module: 'Literature',
    tutorDate: '2023-10-04',
    duration: '2 hours',
    status: 'Completed',
  },
  {
    tutorName: 'Sam Brown',
    studentName: 'Sarah Lee',
    course: 'History',
    module: 'World History',
    tutorDate: '2023-10-05',
    duration: '2 hours',
    status: 'Completed',
  },
];

export default function handler(req = NextApiRequest, res = NextApiResponse) {
  res.status(200).json(dummyData);
}