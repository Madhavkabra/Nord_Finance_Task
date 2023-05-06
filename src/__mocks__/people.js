export const mappedMockPeople = {
  data: {
    results: [
      {
        id: 'https://swapi.dev/api/people/1/',
        data: [
          {
            id: 'name',
            label: 'Luke Skywalker',
          },
          {
            id: 'gender',
            label: 'male',
          },
          {
            id: 'birthYear',
            label: '19BBY',
          },
          {
            id: 'eyeColor',
            label: 'blue',
          },
          {
            id: 'hairColor',
            label: 'blond',
          },
          {
            id: 'skinColor',
            label: 'fair',
          },
          {
            id: 'height',
            label: '172',
          },
          {
            id: 'mass',
            label: '77',
          },
          {
            id: 'species',
            label: <i className='fa-solid fa-question fa-lg' />,
          },
          {
            id: 'films',
            label: 4,
          },
          {
            id: 'starships',
            label: 2,
          },
          {
            id: 'vehicles',
            label: 2,
          },
        ],
      },
      {
        id: 'https://swapi.dev/api/people/2/',
        data: [
          {
            id: 'name',
            label: 'C-3PO',
          },
          {
            id: 'gender',
            label: 'n/a',
          },
          {
            id: 'birthYear',
            label: '112BBY',
          },
          {
            id: 'eyeColor',
            label: 'yellow',
          },
          {
            id: 'hairColor',
            label: 'n/a',
          },
          {
            id: 'skinColor',
            label: 'gold',
          },
          {
            id: 'height',
            label: '167',
          },
          {
            id: 'mass',
            label: '75',
          },
          {
            id: 'species',
            label: <i className='fa-brands fa-android fa-lg' />,
          },
          {
            id: 'films',
            label: 6,
          },
          {
            id: 'starships',
            label: 0,
          },
          {
            id: 'vehicles',
            label: 0,
          },
        ],
      },
    ],
    next: '/api/people/?page=2',
    previous: '/api/people/?page=0',
  },
  isLoading: false,
  error: null,
};

export const apiMockRes = {
  results: [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      birth_year: '19BBY',
      eye_color: 'blue',
      hair_color: 'blond',
      skin_color: 'fair',
      height: '172',
      mass: '77',
      species: ['http://example.com/species/1'],
      films: [],
      starships: [],
      vehicles: [],
      url: 'http://example.com/people/1',
    },
    {
      name: 'Luke 01',
      gender: 'male',
      birth_year: '19BBY',
      eye_color: 'blue',
      hair_color: 'blond',
      skin_color: 'fair',
      height: '172',
      mass: '77',
      species: ['http://example.com/species/1'],
      films: [],
      starships: [],
      vehicles: [],
      url: 'http://example.com/people/2',
    },
  ],
};

export const expectedApiResMockData = {
  results: [
    {
      id: 'http://example.com/people/1',
      data: [
        { id: 'name', label: 'Luke Skywalker' },
        { id: 'gender', label: 'male' },
        { id: 'birthYear', label: '19BBY' },
        { id: 'eyeColor', label: 'blue' },
        { id: 'hairColor', label: 'blond' },
        { id: 'skinColor', label: 'fair' },
        { id: 'height', label: '172' },
        { id: 'mass', label: '77' },
        {
          id: 'species',
          label: <i className='fa-solid fa-question fa-lg' />,
        },
        { id: 'films', label: 0 },
        { id: 'starships', label: 0 },
        { id: 'vehicles', label: 0 },
      ],
    },
    {
      id: 'http://example.com/people/2',
      data: [
        { id: 'name', label: 'Luke 01' },
        { id: 'gender', label: 'male' },
        { id: 'birthYear', label: '19BBY' },
        { id: 'eyeColor', label: 'blue' },
        { id: 'hairColor', label: 'blond' },
        { id: 'skinColor', label: 'fair' },
        { id: 'height', label: '172' },
        { id: 'mass', label: '77' },
        {
          id: 'species',
          label: <i className='fa-solid fa-question fa-lg' />,
        },
        { id: 'films', label: 0 },
        { id: 'starships', label: 0 },
        { id: 'vehicles', label: 0 },
      ],
    },
  ],
  speciesWithCount: { undefined: 2 },
};
