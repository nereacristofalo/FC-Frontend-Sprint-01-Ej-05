let initialData = [];

const getRandomInt = () => {
  return Math.floor(Math.random() * 6);
};

const generateData = () => {
  const data = [];

  const semilla = [
    {
      fullname: 'Peregrin Tuk',
      city: 'The Shire',
      country: 'Arnor',
      phone: '+34 123 45 67 89',
      email: 'pippin@lotr.com',
      skills: ['HTML&CSS', 'ANGULAR', 'REACT'],
    },
    {
      fullname: 'Meriadoc Brandigamo',
      city: 'The Shire',
      country: 'Arnor',
      phone: '+34 123 45 67 89',
      email: 'merry@lotr.com',
      skills: ['HTML&CSS', 'ANGULAR', 'REACT'],
    },
    {
      fullname: 'Frodo Baggins',
      city: 'The Shire',
      country: 'Arnor',
      phone: '+34 123 45 67 89',
      email: 'frodo@lotr.com',
      skills: ['NODEJS', 'VUE', 'HTML&CSS', 'REACT'],
    },
    {
      fullname: 'Samwise Gamgee',
      city: 'The Shire',
      country: 'Arnor',
      phone: '+34 123 45 67 89',
      email: 'sam@lotr.com',
      skills: ['JAVA', 'SPRING'],
    },
    {
      fullname: 'Legolas Greenleaf',
      city: 'Mirkwood',
      country: 'Wilderland',
      phone: '+34 123 45 67 89',
      email: 'legolas@lotr.com',
      skills: ['C#', '.NET', 'SQL'],
    },
    {
      fullname: 'Gandalf Mithrandir',
      city: 'Valinor',
      country: 'Middle Earth',
      phone: '+34 123 45 67 89',
      email: 'gandalf@lotr.com',
      skills: [
        'NODEJS',
        'VUE',
        'HTML&CSS',
        'REACT',
        'ANGULAR',
        'JAVASCRIPT',
        'TYPESCRIPT',
      ],
    },
  ];

  for (let i = 0; i < 100; i++) {
    const index = getRandomInt();
    data.push({ ...semilla[index] });
  }

  return data;
};

const fillTable = (data = initialData) => {
  const table = document.getElementById('tablebody');

  table.innerHTML = '';

  for (const item of data) {
    const tr = table.insertRow(-1);
    for (const prop in item) {
      const td = document.createElement('td');
      if (prop !== 'skills') {
        td.innerHTML = item[prop];
      } else {
        const div = document.createElement('div');
        div.classList.add('skill-container');
        for (let i = 0; i < 2; i++) {
          const p = document.createElement('p');
          p.classList.add('skill-tag');
          p.innerHTML = item[prop][i];
          div.appendChild(p);
        }
        if (item[prop].length > 2) {
          const p = document.createElement('p');
          p.classList.add('skill-tag');
          p.innerHTML = `+${item[prop].length - 2}`;
          div.appendChild(p);
        }
        td.appendChild(div);
      }

      tr.appendChild(td);
    }
  }
};

const orderAscending = (prop) => {
  const sortedList = [...initialData];
  sortedList.sort((a, b) => {
    let fa = a[prop].toLowerCase(),
      fb = b[prop].toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return sortedList;
};

const orderDescending = (prop) => {
  const sortedList = [...initialData];
  sortedList.sort((a, b) => {
    let fa = a[prop].toLowerCase(),
      fb = b[prop].toLowerCase();

    if (fa > fb) {
      return -1;
    }
    if (fa < fb) {
      return 1;
    }
    return 0;
  });
  return sortedList;
};

let sortOrder = {
  fullname: 'ASC',
  city: 'ASC',
  country: 'ASC',
  email: 'ASC',
  skills: 'ASC',
};

const onSortClicked = (prop) => {
  let sortedData = initialData;

  switch (sortOrder[prop]) {
    case 'ASC':
      sortedData = orderAscending(prop);
      sortOrder = {
        fullname: 'ASC',
        city: 'ASC',
        country: 'ASC',
        email: 'ASC',
        skills: 'ASC',
      };
      sortOrder[prop] = 'DESC';
      break;
    case 'DESC':
      sortedData = orderDescending(prop);
      sortOrder[prop] = 'none';
      break;
    default:
      sortOrder[prop] = 'ASC';
      break;
  }

  fillTable(sortedData);
};

// ORDENA POR CANTIDAD DE ETIQUETAS
const onSkillsClicked = () => {
  let sortedData = [...initialData];

  switch (sortOrder.skills) {
    case 'ASC':
      sortedData.sort((a, b) => {
        let fa = a.skills.length,
          fb = b.skills.length;

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      sortOrder = {
        fullname: 'ASC',
        city: 'ASC',
        country: 'ASC',
        email: 'ASC',
        skills: 'ASC',
      };
      sortOrder.skills = 'DESC';
      break;
    case 'DESC':
      sortedData.sort((a, b) => {
        let fa = a.skills.length,
          fb = b.skills.length;

        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      });
      sortOrder.skills = 'none';
      break;
    default:
      sortOrder.skills = 'ASC';
      break;
  }
  fillTable(sortedData);
};

let timeOut = null;

const onSearch = (evt) => {
  if (timeOut) clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    const value = evt.target.value;
    if (value) {
      const filteredData = initialData.filter(
        (item) =>
          item.fullname.toLowerCase().includes(value.toLowerCase()) ||
          item.city.toLowerCase().includes(value.toLowerCase()) ||
          item.country.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.skills.includes(value.toUpperCase())
      );
      fillTable(filteredData);
    } else {
      fillTable(initialData);
    }
  }, 500);
};

const onCreate = () => {
  initialData = generateData();
  fillTable();

  const thname = document.getElementById('thname');
  thname.addEventListener('click', () => onSortClicked('fullname'), false);

  const thcity = document.getElementById('thcity');
  thcity.addEventListener('click', () => onSortClicked('city'), false);

  const thcountry = document.getElementById('thcountry');
  thcountry.addEventListener('click', () => onSortClicked('country'), false);

  const themail = document.getElementById('themail');
  themail.addEventListener('click', () => onSortClicked('email'), false);

  const thskills = document.getElementById('thskills');
  thskills.addEventListener('click', onSkillsClicked, false);

  const searchinput = document.getElementById('searchinput');
  searchinput.addEventListener('input', onSearch, false);
};

onCreate();
