import { API_BASE_URL } from '../../config';

const mapSpeciesIcon = {
  Droid: <i className='fa-brands fa-android fa-lg'></i>,
  Human: <i className='fa-regular fa-circle-user fa-lg'></i>,
};

const maniputatePeopleApiRes = (people) =>
  people.map((person) => ({
    id: person.url,
    data: [
      {
        id: 'name',
        label: person.name,
      },
      {
        id: 'gender',
        label: person.gender,
      },
      {
        id: 'birthYear',
        label: person.birth_year,
      },
      {
        id: 'eyeColor',
        label: person.eye_color,
      },
      {
        id: 'hairColor',
        label: person.hair_color,
      },
      {
        id: 'skinColor',
        label: person.skin_color,
      },
      {
        id: 'height',
        label: person.height,
      },
      {
        id: 'mass',
        label: person.mass,
      },
      {
        id: 'species',
        label: mapSpeciesIcon[person.species[0]?.name] || (
          <i className='fa-solid fa-question fa-lg'></i>
        ),
      },
      {
        id: 'films',
        label: person.films.length,
      },
      {
        id: 'starships',
        label: person.starships.length,
      },
      {
        id: 'vehicles',
        label: person.vehicles.length,
      },
    ],
  }));

export const peopleFetcher = async (apiEndpoint) => {
  const res = await fetch(`${API_BASE_URL}${apiEndpoint}`);
  const data = await res.json();

  let dataWithSpecies = {};

  for (let i = 0; i < data?.results?.length; i++) {
    const species = data.results[i].species;
    const speciesAttributes = [];

    for (let speciesIndex = 0; speciesIndex < species.length; speciesIndex++) {
      const speciesRes = await fetch(species[speciesIndex]);
      const parsedSpecies = await speciesRes.json();

      speciesAttributes.push(parsedSpecies);
    }

    dataWithSpecies = {
      ...dataWithSpecies,
      results: [
        ...(dataWithSpecies?.results || []),
        { ...data.results[i], species: speciesAttributes },
      ],
    };
  }

  return {
    ...data,
    results: maniputatePeopleApiRes(dataWithSpecies.results),
  };
};
