export const careersInfo = [
  {
    title: "Full Stack Software Developer Level 1",
    description:
      "Dev sfotware We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].",
    "job type": "Recent Graduate",
    "job field": "Software",
    education: "Bachelors in CS",
    skills: "Node, JS, REACT, HTML, API",
    location: "California",
    date: "1/20/2024",
  },
  {
    title: "Product Manager",
    description:
      "Manage our products We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].",
    "job type": "General",
    "job field": "Management",
    education: "Bachelors in CS",
    skills: "Node, JS, REACT, HTML, API",
    location: "California",
    date: "1/20/2024",
  },
  {
    title: "Full Stack Software Developer 3",
    description:
      "We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].",
    "job type": "Apprenticeship",
    "job field": "Design",
    education: "Bachelors in CS",
    skills: "Node, JS, REACT, HTML, API",
    location: "Remote",
    date: "1/20/2024",
  },
  {
    title: "Entry Level Marketing and PR",
    description:
      "We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].;l",
    "job type": "General",
    "job field": "Marketing",
    education: "Bachelors in Business",
    skills: "dvgfnfgbfdsvsdvds",
    location: "California",
    date: "1/20/2024",
  },
  {
    title: "Marketing Manager",
    description:
      "We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].",
    "job type": "General",
    "job field": "Marketing",
    education: "Bachelors in Business",
    skills: "sdvdgfnbdfvdgb",
    location: "California",
    date: "1/20/2024",
  },
  {
    title: "Electrical Engineer",
    description:
      "We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].",
    "job type": "General",
    "job field": "Engineering",
    education: "Bachelors in Engineering",
    skills: "dsfnhgfbvds",
    location: "California",
    date: "1/20/2024",
  },
  {
    title: "Financial Analyst",
    description:
      "We are seeking a highly motivated and talented [Job Title] to join our [department/team]. The ideal candidate will possess a passion for [relevant skills or industry] and a proven track record of success in [key responsibilities]. As a [Job Title] at [Company Name], you will play a crucial role in [specific tasks or projects].",
    "job type": "General",
    "job field": "Finance",
    education: "Bachelors in Business",
    skills: "EXCEL",
    location: "Remote",
    date: "1/20/2024",
  },
];

careersInfo.sort((a, b) => {
  const nameA = a.title.toUpperCase();
  const nameB = b.title.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export const locations = [];
export const types = [];
export const fields = [];

function populateArr(arr, val) {
  careersInfo.map((career) =>
    !arr.includes(career[val]) ? arr.push(career[val]) : null
  );
}

populateArr(locations, "location");
populateArr(types, "job type");
populateArr(fields, "job field");
