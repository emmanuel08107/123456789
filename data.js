// De-Rock International School - Core Data & Mock Database (Academic Session 2026/2027)

const DEROCK_DATA = {
  schoolInfo: {
    name: "De-Rock International School",
    motto: "Nurturing Excellence, Inspiring Leadership",
    address: "Plot 11, Falade Street, State Housing Estate, Ado-Ekiti, Ekiti State, Nigeria",
    phone: "+234 813 882 1997",
    email: "info@drockschools.com",
    session: "2026/2027",
    copyright: "© 2026 De-Rock International School. All Rights Reserved."
  },

  // Frequently Asked Questions from official prompt
  faqs: [
    {
      q: "Where is De-Rock International School located?",
      a: "De-Rock International School is located at Plot 11, Falade Street, State Housing Estate, Ado-Ekiti, Ekiti State, Nigeria."
    },
    {
      q: "How can I contact the school?",
      a: "You can contact the school through +234 813 882 1997 or info@drockschools.com."
    },
    {
      q: "How can I apply for admission?",
      a: "Parents and guardians can contact the school directly for information about admission requirements and application procedures, or complete the online admission application form right here on our website."
    },
    {
      q: "Does the school provide computer education?",
      a: "The school's website references an ICT laboratory and computer-based examinations (CBT). De-Rock provides comprehensive digital skills, computer coding, and ICT training for students of all levels."
    },
    {
      q: "How can I access the student portal?",
      a: "Students can use the Student Login link on the website, subject to having valid login credentials (Student ID and Password) provided by the school administration."
    },
    {
      q: "How can staff access their accounts?",
      a: "Authorized staff members can access the staff portal through the Staff Login section using their staff identification number and secure access code."
    },
    {
      q: "What academic curriculum does De-Rock International School follow?",
      a: "We integrate the enriched Nigerian National Curriculum with relevant international best practices, preparing students for BECE, WAEC (WASSCE), NECO, JAMB/UTME, and international certifications."
    },
    {
      q: "Does De-Rock operate school bus transit routes in Ado-Ekiti?",
      a: "Yes, our fleet of safe, monitored school buses services major residential zones and estates across Ado-Ekiti and surrounding vicinities."
    }
  ],

  // Sample verified student for the instant result checker
  demoStudentResults: {
    "DRS/2026/0142": {
      id: "DRS/2026/0142",
      pin: "2026",
      name: "Oluwaseun Emmanuel Adeleke",
      class: "Junior Secondary School 2 (JSS 2 Gold)",
      term: "3rd Term Cumulative Examination",
      session: "2025/2026",
      position: "2nd out of 38",
      attendance: "98% (64 of 65 days)",
      conduct: "Exemplary, disciplined and highly focused.",
      teacherComment: "Emmanuel demonstrates outstanding curiosity, exceptional mathematics skills, and exemplary character.",
      proprietressComment: "An outstanding scholar! Maintain this brilliance on the solid rock of excellence.",
      scores: [
        { subject: "Mathematics", ca: 38, exam: 58, total: 96, grade: "A+", remark: "Distinction" },
        { subject: "English Language", ca: 35, exam: 54, total: 89, grade: "A", remark: "Excellent" },
        { subject: "Basic Science & Tech", ca: 37, exam: 57, total: 94, grade: "A+", remark: "Distinction" },
        { subject: "Computer Studies (ICT)", ca: 40, exam: 59, total: 99, grade: "A+", remark: "Distinction" },
        { subject: "Agricultural Science", ca: 33, exam: 52, total: 85, grade: "A", remark: "Excellent" },
        { subject: "Social Studies & Civic", ca: 36, exam: 51, total: 87, grade: "A", remark: "Excellent" },
        { subject: "Business Studies", ca: 34, exam: 53, total: 87, grade: "A", remark: "Excellent" },
        { subject: "French Language", ca: 32, exam: 48, total: 80, grade: "B+", remark: "Very Good" }
      ],
      average: "89.6%",
      overallGrade: "Distinction (Grade A)"
    }
  },

  // News items
  news: [
    {
      id: 1,
      title: "De-Rock Clinches 1st Position at Ekiti State Mathematics Olympiad",
      date: "October 18, 2026",
      category: "Academic Excellence",
      summary: "Our JSS and SSS student representatives swept top honors at the state-wide STEM challenge, demonstrating mathematical precision and problem-solving prowess."
    },
    {
      id: 2,
      title: "Commissioning of our New AI-Equipped ICT & CBT Center",
      date: "September 28, 2026",
      category: "Innovation",
      summary: "Equipped with 60 high-speed networked terminals, interactive smartboards, and coding software, our ICT laboratory ensures every learner is future-ready."
    },
    {
      id: 3,
      title: "Commencement of 2026/2027 Academic Session Admissions",
      date: "September 15, 2026",
      category: "Admissions",
      summary: "Admissions are officially open for Creche, Primary, JSS, and SSS classes. Entrance assessment dates and scholarship screening details announced."
    }
  ],

  // Upcoming Events
  events: [
    {
      day: "04",
      month: "NOV",
      title: "2026/2027 Academic Session Resumption",
      time: "7:45 AM - 2:30 PM",
      location: "Main Assembly Hall"
    },
    {
      day: "18",
      month: "NOV",
      title: "1st Term Continuous Assessment & CBT Test",
      time: "8:30 AM - 1:30 PM",
      location: "Ultra-Modern ICT Lab"
    },
    {
      day: "05",
      month: "DEC",
      title: "Annual STEM & Creative Arts Exhibition",
      time: "10:00 AM - 3:00 PM",
      location: "School Auditorium"
    },
    {
      day: "12",
      month: "DEC",
      title: "Annual Carol of Nine Lessons & End-of-Year Fiesta",
      time: "2:00 PM - 5:30 PM",
      location: "School Grounds"
    }
  ],

  // Search items across the website
  searchIndex: [
    { title: "Admission Requirements & Form", section: "#admissions", type: "Admissions" },
    { title: "Student Portal Login & Results", section: "#portals", type: "Portal" },
    { title: "Staff Login & Account Access", section: "#portals", type: "Portal" },
    { title: "ICT Laboratory & Computer Education", section: "#facilities", type: "Academics" },
    { title: "School Location in Ado-Ekiti", section: "#contact", type: "Location" },
    { title: "Phone Number & Email Address", section: "#contact", type: "Contact" },
    { title: "Early Years & Creche Education", section: "#academics", type: "Academics" },
    { title: "Primary & Basic Education", section: "#academics", type: "Academics" },
    { title: "Junior & Senior Secondary (JSS / SSS)", section: "#academics", type: "Academics" },
    { title: "Science Laboratories & STEM", section: "#facilities", type: "Facilities" },
    { title: "Message from the Proprietress", section: "#proprietress", type: "About" },
    { title: "Frequently Asked Questions (FAQs)", section: "#faqs", type: "Support" },
    { title: "Latest School News & Olympiad", section: "#news", type: "News" },
    { title: "School Events Calendar 2026/2027", section: "#events", type: "Events" }
  ]
};
